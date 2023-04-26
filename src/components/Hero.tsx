import React from 'react';
import styles from '../styles/styles';
import { iphoneScreen, apple } from '../assets';
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 flex justify-start items-start flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-ubuntu font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
            A powerful tool to <br className="sm:block hidden" />{' '}
            <span className="text-primary">Streamline</span>{' '}
          </h1>
        </div>
        <h1 className="font-ubuntu font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px] w-full">
          your Real estate business.
        </h1>
        <h6 className="font-ubuntu">
          Our mission at Friendly Realtor is to achieve three vital economic objectives - increased
          revenue, expanded market share, and improved profitability - within 24 months through the
          provision of innovative real estate agent solutions. As a company, we are committed to
          helping new real estate agents save time and grow their businesses, which is why we aim to
          achieve these objectives. We recognize the challenges that new real estate agents face,
          and our goal is to simplify the real estate process, provide valuable resources, and
          foster long-term relationships with our clients. We believe that our products and services
          will enable new real estate agents to achieve their full potential in the industry.
          Through our innovative solutions, we are dedicated to empowering new real estate agents,
          providing them with the tools and resources necessary to build successful businesses. We
          are committed to creating a supportive and collaborative environment that encourages
          growth and development. Ultimately, our mission is to make a positive impact on the real
          estate industry by helping new real estate agents succeed, fostering long-term
          partnerships, and delivering exceptional value to our clients.
        </h6>
        <a href="https://testflight.apple.com/join/88VYYxs4">
          <Image
            src={apple}
            alt="friendly_realtor_app"
            className="w-44 mt-8 object-contain mr-5 cursor-pointer"
          />
        </a>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:mr-0  my-10 relative`}>
        <Image src={iphoneScreen} className="w-[100%] h-[100%] relative z-[5]" alt="" srcSet="" />
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      </div>
    </section>
  );
};

export default Hero;
