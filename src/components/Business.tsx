import { features } from '../constants';
import styles, { layout } from '../styles/styles';
import { apple } from '../assets';
import Image from 'next/image';
import { Header } from './UI';

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-col p-4 md:p-6 rounded-lg ${
      index !== features.length - 1 ? 'mb-6' : 'mb-0'
    } feature-card`}
  >
    <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full ${styles.flexCenter} bg-dimGreen mb-4`}>
      <Image src={icon} alt="" className="w-1/2 h-1/2 object-contain" />
    </div>
    <Header as="h3" className="text-xl md:text-2xl font-medium mb-2 whitespace-nowrap">
      {title}
    </Header>
    <p className="font-ubuntu font-light text-gray-300 text-sm md:text-base leading-6 md:leading-7">
      {content}
    </p>
  </div>
);

const Business = () => (
  <div className="flex flex-col md:flex-row">
    {features.map((feature, index) => (
      <FeatureCard key={feature.id} {...feature} index={index} />
    ))}
  </div>
);

export default Business;
