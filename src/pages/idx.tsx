import React, { useEffect } from 'react';
import Head from 'next/head';

const InternalPage = () => {
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
