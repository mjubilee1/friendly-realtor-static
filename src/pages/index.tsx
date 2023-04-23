import styles from '../styles/styles';
import { Hero, Business } from '../components';

export default function Home() {
  return (
    <div>
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
