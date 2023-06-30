import styles from '../styles/styles';
import { DefaultHero } from '../components';
import { Checklist, Header, Container } from '../components/UI';
import Head from 'next/head';

const HomePage = () => {

  return (
    <>
      <Head>
        <meta name="description" content="" />
      </Head>
      <DefaultHero />
      <Container className="max-w-full my-20 !mx-0 flex flex-col gap-6">
        <Header as="h2" className="text-primary">
          Helping Buyers Find Their Dream Home
        </Header>
        <p>
          Discover your dream home with our platform! We specialize in assisting first-time buyers,
          providing expert guidance and making the home buying process seamless. Find your perfect
          match while gaining a comprehensive understanding of the journey.
        </p>
        <Header as="h3" className="text-primary">
          Why Choose Us?
        </Header>
        <p>
          <strong className="text-2xl mr-4">Empowering Buyers -</strong> We provide tools and
          knowledge to help you understand the home buying process. View your credit score, receive
          suggestions to improve it, and track your finances to achieve your purchasing power goals.
        </p>
        <p>
          <strong className="text-2xl mr-4">Personalized Guidance -</strong> We listen to your
          specific needs and preferences, tailoring our search to find the perfect home. Our
          experienced agents will guide you through every step, ensuring you make informed
          decisions.
        </p>
        <p>
          <strong className="text-2xl mr-4">Comprehensive Listings -</strong> Access an extensive
          database of quality listings in your desired area. We handpick properties that meet our
          criteria, providing detailed information, photos, virtual tours, and property features.
        </p>
        <p>
          <strong className="text-2xl mr-4">Financial Expertise -</strong> Understand your financing
          options with our assistance. We connect you with trusted mortgage lenders and offer
          transparent information, making the process seamless.
        </p>
        <div className="text-center m-auto">
          <div className="max-w-3xl">
            <Header as="h2" className="text-primary mt-6 mb-4">
              Discover Your Dream Home
            </Header>
            <p>
              Don't settle for anything less than your dream home. Partner with our real estate firm
              as we help first-time buyers navigate the home buying process. Our dedicated team is
              committed to finding a property that meets your needs and brings you joy for years to
              come. Begin your home buying journey with us today!
            </p>
          </div>
        </div>
      </Container>
      <Checklist />
      <div id="content-container" />
    </>
  );
};

export default HomePage;
