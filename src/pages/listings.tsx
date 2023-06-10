import Head from 'next/head';
import { useEffect } from 'react';

const ListingsPage = () => {
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
        <meta name="description" content="" />
      </Head>
      <div id="content-container" />
    </>
  );
};

export default ListingsPage;
