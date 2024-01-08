import React from 'react';
import { StaticImageData } from 'next/image';
import { Header, AddLink, Button } from './UI';
import { RegisterModal } from './RegisterModal';
import { useAuthContext } from '../context';
import { useRouter } from 'next/router';
import { fbEvent, gtagEvent } from '../utils/analyticsUtil';

export type HeroProps = {
  src?: StaticImageData;
  title?: string;
  subTitle?: string;
  showRegister?: boolean;
};

const DefaultHero = (props: HeroProps) => {
  const { title, subTitle, src, showRegister } = props;
  const { user } = useAuthContext();
  const router = useRouter();

  return (
    <div
      className="relative w-full p-8"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${
          src ||
          'https://images.ctfassets.net/v3wxyl8kvdve/2EYGoz57XC6NwjTKGc0vly/2c7f80b8e6528154099618978ed059d3/happy-buyers01.jpg'
        })`,
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col justify-center text-white z-10 mx-4 my-8 md:ml-8 md:mr-4">
            <Header as="h3" className="font-bold leading-tight mt-4 text-black">
              {title}
            </Header>
            <p className="text-lg leading-tight text-black max-w-sm mb-2 pt-2 pb-4 md:max-w-none md:pb-0 md:pl-4 md:pr-8">
              {subTitle}
            </p>
            {showRegister && user ? (
              <AddLink
                to="/profile"
                className="w-fit rounded-full leading-5 tracking-tight border-sm text-center bg-blue-500 py-1 px-4 gap-2 text-sm true hover:bg-blue-400 cursor-pointer focus:outline-none bg-center items-center shadow-xs"
              >
                Get Free Credit Report
              </AddLink>
            ) : (
              <div className="flex flex-col gap-2 md:flex-row">
                <RegisterModal />
                <Button
                  color="primary"
                  className="!text-black md:ml-2"
                  onClick={() => {
                    fbEvent('home_hero_cta', {
                      content_name: 'talk to realtor',
                      content_category: 'user_interaction',
                      value: 1,
                    });

                    gtagEvent({
                      action: 'home_hero_cta',
                      category: 'user_interaction',
                      label: 'talk to realtor',
                      value: 1,
                    });
                    router.push({ pathname: `${router.pathname}/find-a-realtor` });
                  }}
                >
                  Talk To Live Realtor
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 text-white z-10 mx-4 my-8">
          <Header as="h3" className="font-bold leading-tight mt-4 text-blue-500">
            Assisting Buyers in Discovering Their Dream Home
          </Header>
          <p className="text-lg text-black leading-tight max-w-sm pt-2 pb-4 md:max-w-none md:pb-0">
            Our platform simplifies the path to homeownership for first-time buyers with expert
            guidance, comprehensive listings, and transparent financial assistance.
          </p>
          <Header as="h3" className="font-bold leading-tight mt-4 text-blue-500">
            Connecting Home Buyers with Top-Producing Agents in Your Area
          </Header>
          <p className="text-lg text-black leading-tight max-w-sm pt-2 md:max-w-none">
            Our platform streamlines the process of matching home buyers with top-producing agents,
            ensuring you find the best fit for your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DefaultHero;
