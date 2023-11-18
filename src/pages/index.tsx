import { DefaultHero } from '../components';
import { AddLink, Header, Container } from '../components/UI';
import Image from 'next/image';

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
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Home',
        description:
          'FriendlyRealtor platform streamlines the process of matching home buyers with top-producing agents, ensuring you find the best fit for your needs.',
      }}
    >
      <DefaultHero
        title="Starting your home buying journey?"
        subTitle="Be sure to check your credit shore to see what you can qualify for."
        showRegister
      />
      <div className="mt-6">
        <Header as="h2" className="text-white">
          Featured Markets
        </Header>
        <QuickSearch />
      </div>
      <AddLink
        className="my-8 transition-transform transform hover:-translate-y-2"
        to="/grants/maryland-smartbuy-program"
      >
        <Header as="h3" className="my-8">
          Maryland SmartBuy Program
        </Header>
        <Image
          width={500}
          height={500}
          src="https://images.ctfassets.net/v3wxyl8kvdve/3e4nrqrsn1ZinOk95n6dA9/2d72c227fd013b90d03babd869d83e41/Banner.png"
          alt="Maryland SmartBuy Program"
        />
      </AddLink>
      {/*<Checklist />*/}
    </Container>
  );
};

export default HomePage;
