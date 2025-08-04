import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';

const AuthContext = createContext();

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
  const [userProfile, setUserProfile] = useState(null);

  // Sign up with email and password
  const signUp = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore
      const userDoc = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: displayName,
        photoURL: result.user.photoURL || null,
        createdAt: new Date().toISOString(),
        simulationsCount: 0,
        favoriteSimulations: []
      };
      
      await setDoc(doc(db, 'users', result.user.uid), userDoc);
      setUserProfile(userDoc);
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if user profile exists, if not create one
      const userDocRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        const newUserProfile = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          createdAt: new Date().toISOString(),
          simulationsCount: 0,
          favoriteSimulations: []
        };
        
        await setDoc(userDocRef, newUserProfile);
        setUserProfile(newUserProfile);
      } else {
        setUserProfile(userDoc.data());
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      throw error;
    }
  };

  // Load user profile from Firestore
  const loadUserProfile = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    if (!user) return;
    
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, updates, { merge: true });
      setUserProfile(prev => ({ ...prev, ...updates }));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        await loadUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 