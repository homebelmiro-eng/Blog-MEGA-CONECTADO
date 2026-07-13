import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirebaseAuth, getDb, handleFirestoreError, OperationType } from './firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'admin' | 'editor' | 'author' | 'reader';
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isEditor: boolean;
  isAuthor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = getFirebaseAuth();
  const db = getDb();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const path = `users/${user.uid}`;
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfile;
            // Force admin role for the specific user email if they are currently a reader
            if (user.email === 'homebelmiro@gmail.com' && data.role === 'reader') {
              const updatedProfile = { ...data, role: 'admin' as const };
              await setDoc(docRef, updatedProfile);
              setProfile(updatedProfile);
            } else {
              setProfile(data);
            }
          } else {
            // Grant admin role to the specific user email
            const isAdminEmail = user.email === 'homebelmiro@gmail.com';
            
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              role: isAdminEmail ? 'admin' : 'reader'
            };
            await setDoc(docRef, newProfile);
            setProfile(newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, path);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ 
        prompt: 'select_account',
        // This can sometimes help with the API key error in certain environments
        auth_type: 'reauthenticate'
      });
      
      // Try popup first
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Auth Error Details:', error);
      
      // Specific error handling for the API Key issue often seen in this environment
      if (error.message?.includes('api-keys-are-not-supported-by-this-api')) {
        console.error('CRITICAL: Identity Toolkit API is likely disabled or restricted for this API key.');
        alert('Erro Crítico de Configuração: O Identity Toolkit API (Firebase Auth) parece estar desativado ou restrito no seu projeto Google Cloud. \n\nPor favor, clique em "Share" ou "Settings" e certifique-se de que o Firebase está configurado corretamente. Se o erro persistir, tente atualizar a página (F5).');
      } else if (error.code === 'auth/popup-blocked') {
        alert('O popup de login foi bloqueado pelo navegador. Por favor, permita popups para este site.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // User closed the popup
      } else {
        alert(`Erro de autenticação (${error.code || 'unknown'}): ${error.message}`);
      }
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    profile,
    loading,
    signInWithGoogle,
    logout,
    isAdmin: profile?.role === 'admin',
    isEditor: profile?.role === 'editor',
    isAuthor: profile?.role === 'author',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
