import { initializeApp, getApps, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// All values come from Vite env vars — never hardcode real keys here.
// Firebase web config is not a secret (it's safe to ship in the client
// bundle), but we still keep it in .env so each environment (dev/prod)
// can point at a different Firebase project.
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseApp =
  getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

// getAuth()/getFirestore() validate the config lazily on first real network
// call, but in some SDK versions getAuth() can throw synchronously on an
// obviously malformed config (e.g. a missing/placeholder API key). That
// throw happens at module-import time — before React ever renders — so it
// would otherwise take down the entire app to a blank white/black screen
// with no error shown. Swallow it here; downstream Firestore calls already
// surface a per-section error via the hooks' AsyncState, which is a much
// better failure mode than a blank page. See apps/*/src/components/common
// ErrorBoundary for the render-time safety net.
export const db = getFirestore(firebaseApp);

let authInstance: ReturnType<typeof getAuth> | null = null;
try {
  authInstance = getAuth(firebaseApp);
} catch (err) {
  console.error("Firebase Auth failed to initialize — check your .env Firebase config.", err);
}
export const auth = authInstance as ReturnType<typeof getAuth>;
