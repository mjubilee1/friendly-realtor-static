import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import SEO from '../../next-seo.config';
import { DefaultSeo } from 'next-seo';
import React from 'react';
import { Navbar, Footer } from '../components';
import styles from '../styles/styles';
import { Ubuntu } from 'next/font/google';
import Head from 'next/head';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: '300',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
		<div>
			<Head>
				<title>Friendly Realtor</title>
        <link rel='shortcut icon' href='/favicon.ico' />
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
