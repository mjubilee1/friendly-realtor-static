import styles from '../../styles/styles';
import { Hero, Business } from '../../components';
import { Container } from '../../components/UI';

const ServicesPage = () => {
  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Realtor Services',
        description:
          "Designed specifically for realtors, this comprehensive realtor toolkit is a valuable resource that offers a wide range of resources and information to assist you in making informed decisions throughout your clients' home buying journey.",
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
