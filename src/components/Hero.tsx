import React from 'react';
import styles from '../styles/styles';
import { iphoneScreen, apple } from '../assets';
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
            Designed specifically for realtors, this comprehensive realtor toolkit is a valuable
            resource that offers a wide range of resources and information to assist you in making
            informed decisions throughout your clients' home buying journey.
          </h1>
          <h6 className="font-ubuntu text-sm leading-relaxed">
            Our mission at Friendly Realtor is to achieve three vital economic objectives -
            increased revenue, expanded market share, and improved profitability - within 24 months
            through the provision of innovative real estate agent solutions. As a company, we are
            committed to helping new real estate agents save time and grow their businesses, which
            is why we aim to achieve these objectives. We recognize the challenges that new real
            estate agents face, and our goal is to simplify the real estate process, provide
            valuable resources, and foster long-term relationships with our clients. We believe that
            our products and services will enable new real estate agents to achieve their full
            potential in the industry. Through our innovative solutions, we are dedicated to
            empowering new real estate agents, providing them with the tools and resources necessary
            to build successful businesses. We are committed to creating a supportive and
            collaborative environment that encourages growth and development. Ultimately, our
            mission is to make a positive impact on the real estate industry by helping new real
            estate agents succeed, fostering long-term partnerships, and delivering exceptional
            value to our clients.
          </h6>
          <div className="flex flex-col md:flex-row items-center mt-8">
            <AddLink onClick={handleClick}>
              <Image
                src={apple}
                alt="friendly_realtor_app"
                className="w-44 h-44 object-contain mb-4 md:mb-0 cursor-pointer"
              />
            </AddLink>
            <Button
              color=""
              className="px-4 py-4 bg-primary rounded-md text-base hover:bg-black md:text-lg"
              onClick={handleNavigateStipe}
            >
              Advertise With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
