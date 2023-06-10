import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { homeBuyers } from '../assets';

export type HeroProps = {
  src?: StaticImageData;
  title: string;
  subTitle: string;
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
      <div className="absolute inset-0 flex flex-col justify-center text-white z-10 ml-4 w-96">
        <h1 className="text-4xl font-bold mb-4 text-black">{title}</h1>
        <p className="text-lg text-black">{subTitle}</p>
      </div>
    </div>
  );
};

export default DefaultHero;
