import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setUser, setBackendUser, setIdToken, setLoading, clearAuth } from "../slices/firebaseAuth.slice";
import { auth } from "../features/auth/Firebase";
import { getProviderName } from "../features/auth/firebaseAuth";
import { useVerifyFirebaseTokenMutation } from "../features/auth/api/authApi";

export const useFirebaseAuthListener = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [verifyToken] = useVerifyFirebaseTokenMutation();

  useEffect(() => {
    // Check if auth is available
    if (!auth) {
      console.warn("Firebase auth not initialized");
      dispatch(setLoading(false));
      return;
    }

    let isMounted = true;

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: User | null) => {
        if (!isMounted) return;

        try {
          if (firebaseUser) {
            // Get email from user (checking multiple sources)
            let userEmail = firebaseUser.email || firebaseUser.providerData?.[0]?.email;

            // If email is still not found, reload user data and check again
            if (!userEmail) {
              try {
                await firebaseUser.reload();
                userEmail = firebaseUser.email || firebaseUser.providerData?.[0]?.email;
                if (!userEmail) {
                  console.error("Firebase user missing email after reload. Signing out...");
                  await auth.signOut();
                  dispatch(clearAuth());
                  dispatch(setLoading(false));
                  return;
                }
              } catch (reloadError) {
                console.error("Failed to reload user:", reloadError);
                // If reload fails, still check if we have email from providerData
                userEmail = firebaseUser.providerData?.[0]?.email;
                if (!userEmail) {
                  await auth.signOut();
                  dispatch(clearAuth());
                  dispatch(setLoading(false));
                  return;
                }
              }
            }

            // At this point, userEmail should be validated and non-null
            // If it's still null/undefined, something is wrong - sign out
            if (!userEmail) {
              console.error("Firebase user email validation failed. Signing out...");
              await auth.signOut();
              dispatch(clearAuth());
              dispatch(setLoading(false));
              return;
            }

            // Get ID token
            const idToken = await firebaseUser.getIdToken();

            // Extract user info - use validated email
            const user = {
              uid: firebaseUser.uid,
              email: userEmail,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              provider: getProviderName(firebaseUser),
            };

            // Update Redux state
            dispatch(setUser(user));
            dispatch(setIdToken(idToken));
            dispatch(setLoading(false));

            // Send token to backend for verification and user upsert
            try {
              const response = await verifyToken({ idToken }).unwrap();
              if (response.ok && response.user) {
                // Store backend user data in Redux
                dispatch(setBackendUser(response.user));
              }
            } catch (error: any) {
              console.error("Failed to verify token with backend:", error);
              // If backend rejects due to missing email, sign out
              if (error?.data?.message?.includes("Email is required")) {
                await auth.signOut();
                dispatch(clearAuth());
              }
              // Don't clear auth state for other backend errors
              // User is still authenticated with Firebase
            }
          } else {
            // User signed out or not logged in
            dispatch(clearAuth());
            dispatch(setLoading(false));
          }
        } catch (error) {
          console.error("Firebase auth state change error:", error);
          if (isMounted) {
            dispatch(setLoading(false));
          }
        }
      },
      (error) => {
        console.error("Firebase auth state change listener error:", error);
        if (isMounted) {
          dispatch(setLoading(false));
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [dispatch, verifyToken]);

  // Refresh token periodically (every 50 minutes, tokens expire in 1 hour)
  useEffect(() => {
    const interval = setInterval(async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const newToken = await currentUser.getIdToken(true); // Force refresh
          dispatch(setIdToken(newToken));

          // Send refreshed token to backend
          const response = await verifyToken({ idToken: newToken }).unwrap();
          if (response.ok && response.user) {
            dispatch(setBackendUser(response.user));
          }
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }
    }, 50 * 60 * 1000); // 50 minutes

    return () => clearInterval(interval);
  }, [dispatch, verifyToken]);
};

