import Head from 'next/head';
import { useEffect } from 'react';

const ListingsPage = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      document.currentScript.replaceWith(ihfKestrel.render());
    `;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="" />
      </Head>
      <div>
        Listing Page Content
      </div>
    </>
  );
};

export default ListingsPage;
