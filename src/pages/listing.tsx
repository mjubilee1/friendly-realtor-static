import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../context';

const ListingPage = () => {
  const router = useRouter();
  const { id } = router.query; // Access the query parameter "id"

  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      document.currentScript.replaceWith(ihfKestrel.render());
    `;

    const contentContainer = document.querySelector('#content-container');
    if (contentContainer) {
      contentContainer.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const addIdToPropertyCollection = async () => {
      if (id) {
        try {
          const propertyDocRef = doc(firestore, 'properties', 'properties');
          await updateDoc(propertyDocRef, {
            ids: arrayUnion(id),
          });
        } catch (error) {
          console.error('Error adding ID to the properties document:', error);
        }
      }
    };

    addIdToPropertyCollection();
  }, [id]);

  return (
    <>
      <div id="content-container" />
    </>
  );
};

export default ListingPage;
