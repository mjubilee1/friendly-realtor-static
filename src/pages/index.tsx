import styles from '../styles/styles';
import { DefaultHero } from '../components';
import { Checklist } from '../components/UI';
import Head from 'next/head';
import { useEffect } from 'react';

const HomePage = () => {
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

  return (
    <>
      <Head>
        <meta name="description" content="" />
      </Head>
      <DefaultHero
        title="Discover. Explore. Possess."
        subTitle="Uncover hidden gems, embrace new horizons, and claim your dreams."
      />
      <Checklist />
      <div id="content-container" />
    </>
  );
};

export default HomePage;
