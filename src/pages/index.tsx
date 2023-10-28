import { DefaultHero } from '../components';
import { Checklist, Header, Container } from '../components/UI';
import Head from 'next/head';

const QuickSearch = () => {
  const script = `
	document.currentScript.replaceWith(ihfKestrel.render({
		"component": "gallerySliderWidget",
		"rows": 1,
		"navigation": true,
		"nav": "top",
		"auto": true,
		"maxResults": 25,
		"status": "active",
		"featured": true,
		"effect": "slide"
	}));
  `;

  return <div dangerouslySetInnerHTML={{ __html: `<script>${script}</script>` }} />;
};
const HomePage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="" />
      </Head>
      <DefaultHero
        title="Starting your home buying journey?"
        subTitle="Be sure to check your credit shore to see what you can qualify for."
        showRegister
      />
      {/*<div className="mt-6">
        <Header as="h2" className="text-white">
          Featured Markets
        </Header>
        <QuickSearch />
	</div>*/}
      {/*<Checklist />*/}
      <div id="content-container" className="mt-8" />
    </>
  );
};

export default HomePage;
