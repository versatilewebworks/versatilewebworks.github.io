import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAQrPpDQagx3nea1kJeQdz4qp_VaXWllqU',
  authDomain: 'authentication-2a697.firebaseapp.com',
  projectId: 'authentication-2a697',
  storageBucket: 'authentication-2a697.firebasestorage.app',
  messagingSenderId: '672346373984',
  appId: '1:672346373984:web:a918528e84683c89d56805',
  measurementId: 'G-17EZ2GBP9E',
};

const hasFirebaseConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

const firebaseApp = typeof window !== 'undefined' && hasFirebaseConfig
  ? (getApps().length ? getApps()[0] : initializeApp(firebaseConfig))
  : null;

const auth = firebaseApp ? getAuth(firebaseApp) : null;
const googleProvider = hasFirebaseConfig ? new GoogleAuthProvider() : null;

export { auth, googleProvider, hasFirebaseConfig };
