import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { homeBuyers } from '../assets';
import { Header, AddLink } from './UI';
import { RegisterModal } from './RegisterModal';
import { useAuthContext } from '../context';

export type HeroProps = {
  src?: StaticImageData;
  title?: string;
  subTitle?: string;
  showRegister?: boolean;
};

const DefaultHero = (props: HeroProps) => {
  const { title, subTitle, src, showRegister } = props;
  const { user } = useAuthContext();

  return (
    <div className="relative w-full h-[32rem]">
      <Image
        src={src || homeBuyers}
        alt="Friendly Realtor Home Buyers"
        fill
        className="z-0 object-cover"
      />
      <div className="absolute w-full inset-0 flex flex-col justify-center text-white z-10 ml-4">
        <Header as="h3" className="font-bol leading-tight mt-4 text-black">
          {title}
        </Header>
        <p className="text-lg text-black leading-tight max-w-sm pt-2 py-6">{subTitle}</p>
        {showRegister && user ? (
          <AddLink
            to="/profile"
            className="w-fit rounded-full leading-5 tracking-tight border-sm text-center  bg-blue-500 py-1 px-4 gap-2 text-sm true hover:bg-blue-400 cursor-pointer focus:outline-none bg-center items-center shadow-xs"
          >
            Get Free Credit Report
          </AddLink>
        ) : (
          <RegisterModal />
        )}
      </div>
    </div>
  );
};

export default DefaultHero;
