import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const getEnvVar = (key: string) => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key];
  }
  return process.env[key];
};

const envConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID'),
  firestoreDatabaseId: getEnvVar('VITE_FIREBASE_DATABASE_ID') || '(default)'
};

// @ts-ignore
const localConfig = typeof __FIREBASE_CONFIG__ !== 'undefined' ? __FIREBASE_CONFIG__ : {};
const firebaseConfig = localConfig.apiKey ? localConfig : envConfig;

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

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const auth = getFirebaseAuth();
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errInfo: FirestoreErrorInfo = {
    error: errorMessage,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };

  const isOffline = errorMessage.toLowerCase().includes('offline');
  if (isOffline) {
    console.warn('Firestore Offline Notice (Non-fatal fallback):', JSON.stringify(errInfo));
  } else {
    console.error('Firestore Error: ', JSON.stringify(errInfo));
  }
  throw new Error(JSON.stringify(errInfo));
}
