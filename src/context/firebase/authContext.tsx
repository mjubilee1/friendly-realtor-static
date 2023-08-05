import React, { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { collection, getDoc, doc } from 'firebase/firestore';

export const AuthContext = createContext<any>({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid } = currentUser;
        const buyersCollectionRef = collection(firestore, 'buyers');
        const buyerDocRef = doc(buyersCollectionRef, uid);
        getDoc(buyerDocRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setUser({
              id: uid,
              ...docSnapshot.data(),
            });
          }
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logoutUser = () => {
    signOut(auth);
  };

  return <AuthContext.Provider value={{ user, logoutUser }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
