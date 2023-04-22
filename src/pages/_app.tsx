import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SEO from '../../next-seo.config';
import { DefaultSeo } from 'next-seo';
import React from 'react';
import {  Navbar } from "../components";
import styles from "../styles/styles";

export default function App({ Component, pageProps }: AppProps) {
  return (
			<React.Fragment>
				<div className={`${styles.paddingX} ${styles.flexCenter}`}>
						<div className={`${styles.boxWidth}`}>
							<Navbar />
						</div>
					</div>
			<DefaultSeo {...SEO} />
			<Component {...pageProps} />
	</React.Fragment>
	)
}
