import Head from 'next/head';
import Script from 'next/script';

const IdxPage = () => {
  return (
    <>
      <Head>
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              <script>
                document.currentScript.replaceWith(ihfKestrel.render());
              </script>
            `,
          }}
        />
      </Head>
      <div>IDX Page</div>
    </>
  );
};

export default IdxPage;