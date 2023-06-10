import React, { useEffect } from 'react';
import Head from 'next/head';

const InternalPage = () => {
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
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div id="content-container" />
    </>
  );
};

export default InternalPage;
