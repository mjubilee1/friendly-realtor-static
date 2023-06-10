import Head from 'next/head';
import React, { useEffect } from 'react';

const MarketReportPage = () => {
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

  const marketDescription = '{marketDescription}';

  return (
    <>
      <Head>
        <meta name="description" content={marketDescription} />
      </Head>
      <div id="content-container" />
    </>
  );
};

export default MarketReportPage;
