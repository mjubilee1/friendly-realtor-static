import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import SEO from '../../next-seo.config';
import { DefaultSeo } from 'next-seo';
import React from 'react';
import { Navbar, Footer } from '../components';
import styles from '../styles/styles';
import { Ubuntu } from 'next/font/google';
import Head from 'next/head';
import { FB_PIXEL_ID, GA_TRACKING_ID } from '../util';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: '300',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Friendly Realtor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />{' '}
        <meta
          name="description"
          content="Looking for a powerful tool to streamline your real estate business? Look no further than FriendlyRealtor, the IOS app designed to help real estate agents make the most of their time and produce better results in the field. With user-friendly features and cutting-edge technology, FriendlyRealtor is the ultimate solution for busy real estate professionals. Download it now and see the difference for yourself!"
        />
        <link rel="icon" href="/logo.png" />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${GA_TRACKING_ID}', {
								page_path: window.location.pathname,
							});
						`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', ${FB_PIXEL_ID});
        fbq('track', 'PageView');
      `,
          }}
        />
      </Head>
      <div
        className={`flex min-h-screen flex-col items-center justify-between p-12 ${ubuntu.className}`}
      >
        <div className="w-full">
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        <Footer />
      </div>
    </div>
  );
}
