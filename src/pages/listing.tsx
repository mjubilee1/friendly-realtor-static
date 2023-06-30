import Head from 'next/head';
import React, { useEffect } from 'react';

const ListingPage = () => {
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

  return (
    <>
      <div id="content-container" />
    </>
  );
};

export default ListingPage;
