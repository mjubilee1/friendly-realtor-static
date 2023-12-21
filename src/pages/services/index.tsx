import styles from '../../styles/styles';
import { Hero, Business } from '../../components';
import { Container } from '../../components/UI';

const ServicesPage = () => {
  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Realtor Services',
        description:
          'Tailored exclusively for agents, our extensive toolkit is designed to be a valuable asset, providing a diverse range of resources to support you in elevating your real estate expertise. Join our Event Center today and discover opportunities to increase cash flow while generating high-quality leads. Unlock a host of benefits tailored just for you as you embark on a journey to enhance your real estate success.',
      }}
    >
      <div className={`w-full overflow-hidden`}>
        <div className={`${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <Business />
        </div>
      </div>
    </Container>
  );
};

export default ServicesPage;
