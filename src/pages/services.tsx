import styles from '../styles/styles';
import { Hero, Business } from '../components';
import Head from 'next/head';
import { useEffect } from 'react';

const ServicesPage = () => {
  return (
    <div>
			 <Head>
        <meta name="description" content="" />
      </Head>
      <div id="content-container" />
      <div className={`bg-secondary w-full overflow-hidden`}>
        <div className={`bg-secondary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>
        <div className={`bg-secondary ${styles.paddingX} ${styles.flexCenter}`}>
          <Business />
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;