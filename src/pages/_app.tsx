import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SEO from '../../next-seo.config';
import { DefaultSeo } from 'next-seo';
// import { FirebaseProvider } from '../context';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
	<React.Fragment>
			<DefaultSeo {...SEO} />
			<Component {...pageProps} />
	</React.Fragment>
	)
}
