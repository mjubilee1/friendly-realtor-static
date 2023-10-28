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
        className="object-cover opacity-20"
      />
      <div className="flex flex-row">
        <div className="flex flex-col w-full justify-center text-white z-10 ml-4 px-8">
          <Header as="h3" className="font-bold leading-tight mt-4">
            {title}
          </Header>
          <p className="text-lg leading-tight max-w-sm pt-2 py-6">{subTitle}</p>
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
        <div className="w-full text-white z-10">
          <Header as="h3" className="font-bold leading-tight mt-4 text-blue-500">
            Assisting Buyers in Discovering Their Dream Home
          </Header>
          <p className="text-lg leading-tight max-w-sm pt-2 py-6">
            Our platform simplifies the path to homeownership for first-time buyers with expert
            guidance, comprehensive listings, and transparent financial assistance.
          </p>
          <Header as="h3" className="font-bold leading-tight mt-4 text-blue-500">
            Connecting Home Buyers with Top-Producing Agents in Your Area
          </Header>
          <p className="text-lg leading-tight max-w-sm pt-2 py-6">
            Our platform streamlines the process of matching home buyers with top-producing agents,
            ensuring you find the best fit for your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DefaultHero;
