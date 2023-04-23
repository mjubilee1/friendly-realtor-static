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
          your Real estate business?
        </h1>
        <h6 className="font-ubuntu">
          Our mission is to develop an IOS app product that will assist new realtors in their
          journey to success by minimizing mistakes and building a community of realtors helping
          realtors. Through our innovative technology, we aim to bridge the gap in the real estate
          industry by reducing the fail rate of realtors within three years. Our goal is to create a
          collaborative and supportive environment within our app, where new realtors can thrive,
          achieve their goals, and contribute to a stronger and more successful real estate
          industry.
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
