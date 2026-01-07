import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  auth, 
  signInWithGoogle, 
  signInWithLinkedIn, 
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
  getAuthRedirectResult,
  signOut 
} from '../config/firebase';
import { userService } from '../services/userService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    // Check for redirect result on mount
    const checkRedirectResult = async () => {
      try {
        const result = await getAuthRedirectResult();
        if (result?.user && isSubscribed) {
          // User signed in via redirect
          await userService.syncUser({
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            provider: result.user.providerData[0]?.providerId
          });
        }
      } catch (err) {
        console.error('Error handling redirect result:', err);
        if (isSubscribed) {
          setError(err.message);
        }
      } finally {
        if (isSubscribed) {
          setInitializing(false);
        }
      }
    };

    checkRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser && isSubscribed) {
          // Sync user to Supabase
          await userService.syncUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            provider: firebaseUser.providerData[0]?.providerId
          });
          
          setUser(firebaseUser);
        } else if (isSubscribed) {
          setUser(null);
        }
      } catch (err) {
        console.error('Error syncing user:', err);
        if (isSubscribed) {
          setError(err.message);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    });

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    try {
      setError(null);
      // signInWithGoogle now uses redirect, so it won't return a result
      await signInWithGoogle();
      // User will be redirected and result handled in useEffect
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const loginWithLinkedIn = async () => {
    try {
      setError(null);
      // signInWithLinkedIn now uses redirect, so it won't return a result
      await signInWithLinkedIn();
      // User will be redirected and result handled in useEffect
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      setError(null);
      
      // Demo credentials bypass
      if (email === 'demo@example.com' && password === 'demo123') {
        const demoUser = {
          uid: 'demo-user-123',
          email: 'demo@example.com',
          displayName: 'Demo User',
          photoURL: null,
          providerData: [{ providerId: 'demo' }]
        };
        setUser(demoUser);
        return demoUser;
      }
      
      const result = await signInWithEmail(email, password);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signupWithEmail = async (email, password, displayName) => {
    try {
      setError(null);
      const result = await signUpWithEmail(email, password, displayName);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      await resetPassword(email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading: loading || initializing,
    error,
    loginWithGoogle,
    loginWithLinkedIn,
    loginWithEmail,
    signupWithEmail,
    forgotPassword,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
