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
      <div>Above all content</div>
      <div id="content-container" />
      <div>Below all content</div>
    </>
  );
};

export default ListingsPage;
