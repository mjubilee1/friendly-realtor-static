import { features } from '../constants';
import styles, { layout } from '../styles/styles';
import { apple } from '../assets';
import Image from 'next/image';
import { Header } from './UI';

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-col items-center md:flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? 'mb-6' : 'mb-0'
    } feature-card`}
  >
    <div className="flex-1 flex flex-col">
      <div
        className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimGreen mb-4 md:mb-0 md:mr-4`}
      >
        <Image src={icon} alt="" className="w-[50%] h-[50%] object-contain" />
      </div>
      <Header as="h3" className="text-2xl font-medium mb-2 whitespace-nowrap">
        {title}
      </Header>
      <p className="font-ubuntu font-light text-gray-300 text-[16px] leading-[24px]">{content}</p>
    </div>
  </div>
);

const Business = () => (
  <div className="flex flex-row items-start">
    {features.map((feature, index) => (
      <FeatureCard key={feature.id} {...feature} index={index} />
    ))}
  </div>
);

export default Business;
