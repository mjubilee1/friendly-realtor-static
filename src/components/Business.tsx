import { features } from '../constants';
import styles, { layout } from '../styles/styles';
import { apple } from '../assets';
import Image from 'next/image';

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? 'mb-6' : 'mb-0'
    } feature-card`}
  >
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimGreen`}>
      <Image src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-ubuntu font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-ubuntu font-normal text-dimWhite text-[16px] leading-[24px]">{content}</p>
    </div>
  </div>
);

const Business = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>Real Esate software that works for you.</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Whether you're a real estate agent, broker, or investor, this software can help you stay
        organized, save time, and close more deals than ever before
      </p>
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;
