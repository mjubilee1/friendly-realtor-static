import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import SEO from '../../next-seo.config';
import { DefaultSeo } from 'next-seo';
import React, { useEffect } from 'react';
import { Navbar, Footer } from '../components';
import styles from '../styles/styles';
import { Ubuntu } from 'next/font/google';
import Head from 'next/head';
import { FB_PIXEL_ID, GA_TRACKING_ID } from '../utils/analyticsUtil';
import { AuthContextProvider } from '@/context';
import { useAppStore } from '../stores';
import { parse } from 'querystring';
import { useRouter } from 'next/router';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: '300',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { openLoginModal, openRegisterModal } = useAppStore();

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

  useEffect(() => {
    const queryParams = parse(router.asPath.split('?')[1]);
    if (queryParams.registration) {
      openRegisterModal();
    }
    if (queryParams.login) {
      openLoginModal();
    }
  }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />{' '}
        <meta name="apple-itunes-app" content="app-id=6446328944" />
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
        {/* Google tag (gtag.js) - Google Ads */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS}');
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
							new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
							j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
							'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
							})(window,document,'script','dataLayer','GTM-PMF4B27');
			`,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var $zoho = $zoho || {};
              $zoho.salesiq = $zoho.salesiq || {widgetcode: "siqcebe308ba1a99390c9157e70f9e7ae67e09a8e0d7d0daab14f9c1be4761dc488", values: {}, ready: function() {}};
              var d = document;
              var s = d.createElement("script");
              s.type = "text/javascript";
              s.id = "zsiqscript";
              s.defer = true;
              s.src = "https://salesiq.zohopublic.com/widget";
              var t = d.getElementsByTagName("script")[0];
              t.parentNode.insertBefore(s, t);
            `,
          }}
        />
      </Head>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PMF4B27"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <AuthContextProvider>
        <div className={`flex flex-col items-center justify-between p-12 ${ubuntu.className}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
          <div className="w-full min-h-screen">
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </AuthContextProvider>
    </div>
  );
}
