import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut as firebaseSignOut
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth providers
const googleProvider = new GoogleAuthProvider();
const linkedinProvider = new OAuthProvider('oidc.linkedin');

// Configure providers to use current origin for redirect
const currentOrigin = window.location.origin;
googleProvider.setCustomParameters({
  prompt: 'select_account',
  redirect_uri: currentOrigin
});

linkedinProvider.setCustomParameters({
  prompt: 'consent',
  redirect_uri: currentOrigin
});

// Auth functions
export const signInWithGoogle = () => signInWithRedirect(auth, googleProvider);
export const signInWithLinkedIn = () => signInWithRedirect(auth, linkedinProvider);
export const getAuthRedirectResult = () => getRedirectResult(auth);

// Email/Password auth
export const signUpWithEmail = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential;
};

export const signInWithEmail = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const signOut = () => firebaseSignOut(auth);

export { auth };
export default app;
