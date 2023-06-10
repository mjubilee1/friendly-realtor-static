import Head from 'next/head';
import { useEffect } from 'react';

const ListingsPage = () => {
	useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
		if (document.querySelector("#content-container")) {
			document.querySelector("#content-container").innerHTML = ihfKestrel.render();
		}
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
			<div>Above all content</div>
      <div id="content-container" />      
			<div>Below all content</div>
    </>
  );
};

export default ListingsPage;
