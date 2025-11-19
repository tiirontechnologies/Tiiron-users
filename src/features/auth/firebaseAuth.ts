import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "./Firebase";

// Initialize OAuth providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const microsoftProvider = new OAuthProvider("microsoft.com");

// Configure providers with email scopes
// Google: email scope is included by default, but we'll be explicit
googleProvider.addScope("email");
googleProvider.addScope("profile");
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Facebook: explicitly request email scope
facebookProvider.addScope("email");
facebookProvider.setCustomParameters({
  display: "popup",
});

// Microsoft: request email and user profile scopes
microsoftProvider.addScope("email");
microsoftProvider.addScope("User.Read");
microsoftProvider.setCustomParameters({
  prompt: "select_account",
  tenant: "common", // or your specific tenant ID
});

// Helper function to get email from user object (checks multiple sources)
const getUserEmail = (user: User): string | null => {
  // First check user.email (primary source)
  if (user.email) {
    return user.email;
  }

  // Fallback: check providerData for email
  if (user.providerData && user.providerData.length > 0) {
    for (const providerData of user.providerData) {
      if (providerData.email) {
        return providerData.email;
      }
    }
  }

  return null;
};

// OAuth sign-in functions with email validation
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Get email from user (checking multiple sources)
    const userEmail = getUserEmail(user);

    // If email is still not found, reload user data and check again
    if (!userEmail) {
      // Reload user to ensure all data is fetched
      await user.reload();
      const reloadedEmail = getUserEmail(user);

      if (!reloadedEmail) {
        // Sign out the user if email is still missing after reload
        await auth.signOut();
        throw new Error(
          "Email is required to sign in. Please ensure your Google account has an email address and try again."
        );
      }
    }

    return user;
  } catch (error: any) {
    console.error("Google sign-in error:", error);
    // Re-throw if it's our custom email error
    if (error.message && error.message.includes("Email is required")) {
      throw error;
    }
    throw new Error(error.message || "Failed to sign in with Google");
  }
};

export const signInWithFacebook = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    // Get email from user (checking multiple sources)
    const userEmail = getUserEmail(user);

    // If email is still not found, reload user data and check again
    if (!userEmail) {
      // Reload user to ensure all data is fetched
      await user.reload();
      const reloadedEmail = getUserEmail(user);

      if (!reloadedEmail) {
        // Sign out the user if email is still missing after reload
        await auth.signOut();
        throw new Error(
          "Email is required to sign in. Please grant email permission when prompted, or check your Facebook account settings to ensure your email is visible."
        );
      }
    }

    return user;
  } catch (error: any) {
    console.error("Facebook sign-in error:", error);
    // Re-throw if it's our custom email error
    if (error.message && error.message.includes("Email is required")) {
      throw error;
    }
    // Handle Facebook-specific errors
    if (error.code === "auth/account-exists-with-different-credential") {
      throw new Error(
        "An account already exists with this email. Please sign in using the original method."
      );
    }
    throw new Error(error.message || "Failed to sign in with Facebook");
  }
};

export const signInWithMicrosoft = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    const user = result.user;

    // Get email from user (checking multiple sources)
    const userEmail = getUserEmail(user);

    // If email is still not found, reload user data and check again
    if (!userEmail) {
      // Reload user to ensure all data is fetched
      await user.reload();
      const reloadedEmail = getUserEmail(user);

      if (!reloadedEmail) {
        // Sign out the user if email is still missing after reload
        await auth.signOut();
        throw new Error(
          "Email is required to sign in. Please ensure your Microsoft account has an email address and grant the necessary permissions."
        );
      }
    }

    return user;
  } catch (error: any) {
    console.error("Microsoft sign-in error:", error);
    // Re-throw if it's our custom email error
    if (error.message && error.message.includes("Email is required")) {
      throw error;
    }
    throw new Error(error.message || "Failed to sign in with Microsoft");
  }
};

// Helper to get provider name from user
export const getProviderName = (user: User): string => {
  if (user.providerData && user.providerData.length > 0) {
    const providerId = user.providerData[0].providerId;
    if (providerId === "google.com") return "google";
    if (providerId === "facebook.com") return "facebook";
    if (providerId === "microsoft.com") return "microsoft";
  }
  return "unknown";
};

