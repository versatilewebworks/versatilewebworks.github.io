import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAqrPpDQagx3nea1kJeQdz4qp_VaXWllqU",
  authDomain: "authentication-2a697.firebaseapp.com",
  projectId: "authentication-2a697",
  storageBucket: "authentication-2a697.appspot.com",
  messagingSenderId: "672346373984",
  appId: "1:672346373984:web:a918528e84683c89d56805",
  measurementId: "G-17EZ2GBP9E",
};

const hasFirebaseConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

const getFirebaseApp = () => {
  if (typeof window === 'undefined' || !hasFirebaseConfig) {
    return null;
  }

  return getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
};

const getFirebaseAuth = () => {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
};

const getGoogleProvider = () => {
  if (!hasFirebaseConfig) {
    return null;
  }
  return new GoogleAuthProvider();
};

export { getFirebaseAuth, getGoogleProvider, hasFirebaseConfig };
