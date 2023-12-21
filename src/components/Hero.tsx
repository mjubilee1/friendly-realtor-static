import React from 'react';
import styles from '../styles/styles';
import { apple } from '../assets';
import { AddLink, Button } from './UI';
import Image from 'next/image';
import { fbEvent, gtagEvent } from '../utils/analyticsUtil';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();

  const handleClick = () => {
    fbEvent('download_btn_click', {
      content_name: 'download_now_btn',
      content_category: 'user_interaction',
      value: 1,
    });

    gtagEvent({
      action: 'download_btn_click',
      category: 'user_interaction',
      label: 'download_now_btn',
      value: 1,
    });

    router.push('https://apps.apple.com/us/app/friendlyrealtor/id6446328944');
  };

  const handleNavigateStipe = () => {
    router.push('https://buy.stripe.com/fZeeY11WK13a5rOaEF');
  };

  return (
    <section id="home" className={`flex flex-col ${styles.paddingY}`}>
      <div className={`flex-1 flex justify-center items-center md:px-12 px-6`}>
        <div className="text-center md:text-left">
          <h1 className="mb-8 font-ubuntu font-semibold text-[32px] text-white">
            Tailored exclusively for agents, our extensive toolkit is designed to be a valuable
            asset, providing a diverse range of resources to support you in elevating your real
            estate expertise. Join our Event Center today and discover opportunities to increase
            cash flow while generating high-quality leads. Unlock a host of benefits tailored just
            for you as you embark on a journey to enhance your real estate success.
          </h1>
          <div className="flex flex-col md:flex-row items-center mt-8">
            <AddLink onClick={handleClick}>
              <Image
                src={apple}
                alt="friendly_realtor_app"
                className="w-44 h-44 object-contain mb-4 md:mb-0 cursor-pointer"
              />
            </AddLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
