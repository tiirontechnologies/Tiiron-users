// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAWujo2gpGPcr16KP_TcXjUu7udqsCnMC0",
  authDomain: "tiiron-lms.firebaseapp.com",
  projectId: "tiiron-lms",
  storageBucket: "tiiron-lms.firebasestorage.app",
  messagingSenderId: "758798386738",
  appId: "1:758798386738:web:4f6a552f0d905e7b2c1e2b",
  measurementId: "G-LHP8XWGB2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if in browser (optional, won't break if it fails)
if (typeof window !== "undefined") {
  try {
    // Dynamically import analytics to avoid blocking
    import("firebase/analytics").then(({ getAnalytics }) => {
      try {
        getAnalytics(app);
      } catch (error) {
        // Analytics initialization failed, but that's okay
        console.warn("Firebase Analytics not available:", error.message);
      }
    }).catch(() => {
      // Analytics module not available, that's fine
    });
  } catch (error) {
    // Ignore analytics errors
  }
}

// Initialize Firebase Auth
export const auth = getAuth(app);

// Export app instance if needed
export default app;