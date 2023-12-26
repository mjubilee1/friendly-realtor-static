import styles from '../../styles/styles';
import { Hero, Business } from '../../components';
import { Container } from '../../components/UI';

const ServicesPage = () => {
  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Realtor Services',
        description:
          'Tailored exclusively for agents, our toolkit provides resources to elevate your real estate expertise. Join our Event Center to discover opportunities and unlock benefits for your real estate success.',
      }}
    >
      <div className={`w-full overflow-hidden`}>
        <Business />
        <Hero />
      </div>
    </Container>
  );
};

export default ServicesPage;
