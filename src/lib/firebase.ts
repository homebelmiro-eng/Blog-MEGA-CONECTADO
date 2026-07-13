import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Check if Firebase is configured
export const isFirebaseConfigured = !!firebaseConfig.apiKey;

if (isFirebaseConfigured && process.env.NODE_ENV !== 'production') {
  console.log('Firebase initialized with Project ID:', firebaseConfig.projectId);
}

// Lazy initialization
export function getFirebaseApp() {
  if (getApps().length > 0) return getApp();
  
  try {
    return initializeApp(firebaseConfig);
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
}

export function getDb() {
  const app = getFirebaseApp();
  const dbId = (firebaseConfig as any).firestoreDatabaseId;
  
  try {
    // Attempt standard connection
    return getFirestore(app, dbId);
  } catch (e) {
    // Fallback to long polling for restricted environments
    return initializeFirestore(app, {
      experimentalForceLongPolling: true
    }, dbId);
  }
}

export function getFirebaseAuth() {
  const auth = getAuth(getFirebaseApp());
  // Set persistence to local to help with state across refreshes
  return auth;
}

export function getFirebaseStorage() {
  return getStorage(getFirebaseApp());
}
