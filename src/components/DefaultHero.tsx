import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { homeBuyers } from '../assets';
import { Header } from './UI';

export type HeroProps = {
  src?: StaticImageData;
  title?: string;
  subTitle?: string;
};

const DefaultHero = (props: HeroProps) => {
  const { title, subTitle, src } = props;

  return (
    <div className="relative w-full h-[32rem]">
      <Image
        src={src || homeBuyers}
        alt="Friendly Realtor Home Buyers"
        fill
        className="z-0 object-cover"
      />
      <div className="absolute w-full inset-0 flex flex-col justify-center text-white z-10 ml-4">
        <Header as="h3" className="font-bold mt-4 text-black">
          {title}
        </Header>
        <p className="text-lg text-black">{subTitle}</p>
      </div>
    </div>
  );
};

export default DefaultHero;
