import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

export type FirebaseProps = {
  fireStore: Firestore;
  firebaseStorage: FirebaseStorage;
};

export const FirebaseContext = createContext<any>({});

export function FirebaseProvider({ children }) {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>();
  const [fireStore, setFireStore] = useState<any>();
  const [analytics, setAnalytics] = useState<any>();
  const [firebaseStorage, setFirebaseStorage] = useState<any>();

  useEffect(() => {
    const app = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE__FIREBASE_MEASUREMENT_ID
    });
    setFirebaseApp(app);
  }, []);

  useEffect(() => {
		if (firebaseApp) {
			setFireStore(getFirestore(firebaseApp));
			setFirebaseStorage(getStorage(firebaseApp));
			setAnalytics(getAnalytics(firebaseApp));
		}
  }, [firebaseApp]);

  return <FirebaseContext.Provider value={{ fireStore, firebaseStorage, analytics }}>{children}</FirebaseContext.Provider>;
}

export const useFirebaseContext = () => useContext(FirebaseContext);
