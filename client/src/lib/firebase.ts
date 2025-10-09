// Client-side Firebase initialization
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

// Prefer environment variables for client config to avoid hardcoding secrets
// Create a .env file with VITE_FIREBASE_* keys for local development
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
} as const;

function configIsValid(cfg: typeof firebaseConfig) {
  return (
    !!cfg.apiKey &&
    !!cfg.authDomain &&
    !!cfg.projectId &&
    !!cfg.storageBucket &&
    !!cfg.messagingSenderId &&
    !!cfg.appId
  );
}

export const app: FirebaseApp | undefined = (() => {
  if (getApps().length) return getApp();
  if (configIsValid(firebaseConfig)) {
    return initializeApp(firebaseConfig);
  }
  console.warn(
    "Firebase client config is missing. Set VITE_FIREBASE_* vars in your .env to enable client-side Firebase."
  );
  return undefined;
})();