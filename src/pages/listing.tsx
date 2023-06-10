import Head from 'next/head';
import React, { useEffect } from 'react';

const ListingPage = () => {
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

  const listingPhotoUrl = '{listingPhotoUrl}';
  const listingPhotoWidth = '{listingPhotoWidth}';
  const listingPhotoHeight = '{listingPhotoHeight}';
  const listingAddress = '{listingAddress}';
  const listingCity = '{listingCity}';

  return (
    <>
      <Head>
        <meta property="og:image" content={listingPhotoUrl} />
        <meta property="og:image:width" content={listingPhotoWidth} />
        <meta property="og:image:height" content={listingPhotoHeight} />
        <meta
          name="description"
          content={`Photos and Property Details for ${listingAddress}. Get complete property information, maps, street view, schools, walk score and more. Request additional information, schedule a showing, save to your property organizer.`}
        />
        <meta
          name="keywords"
          content={`${listingAddress}, ${listingCity} Real Estate, ${listingCity} Property for Sale`}
        />
      </Head>
      <div>Listing Page</div>
    </>
  );
};

export default ListingPage;
