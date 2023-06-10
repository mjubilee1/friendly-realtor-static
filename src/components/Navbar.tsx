import React, { useState } from 'react';
import { close, logo, menu } from '../assets';
import { navLinks } from '../constants';
import Image from 'next/image';
import { AddLink } from './UI';
import { fbEvent, gtagEvent } from '../utils/analyticsUtil';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  const handleClick = (to: string) => {
    fbEvent('take_survey_click', {
      content_name: 'take_survey_btn',
      content_category: 'user_interaction',
      value: 1,
    });

    gtagEvent({
      action: 'take_survey_click',
      category: 'user_interaction',
      label: 'take_survey_btn',
      value: 1,
    });

    router.push(
      'https://docs.google.com/forms/d/e/1FAIpQLSf2nr-xa4BDh6stpU9ySdPIyH_PSLN6H6HWcWwcw3Jp89NvKg/viewform?usp=sf_link',
    );
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Image src={logo} alt="friendlyRealtor" className="w-[100px]" />
      <ul className="list-none sm:flex hidden justify-end items-center flxe-1">
        {navLinks.map((el, index) => {
          return (
            <li
              key={el.id}
              className={`font-ubuntu font-normal cursor-pointer text-[16px] ${
                index === navLinks.length - 1 ? 'mr-0' : 'mr-10'
              } text-white`}
            >
              {el.to ? (
                <AddLink
                  onClick={() => handleClick(el.to)}
                  size="none"
                  className="text-[16px] font-normal tracking-normal"
                >
                  {el.title}
                </AddLink>
              ) : (
                <a href={`${el.id}`}>{el.title}</a>
              )}
            </li>
          );
        })}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <Image
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${
            toggle ? 'flex' : 'hidden'
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((el, index) => {
              return (
                <li
                  key={el.id}
                  className={`font-ubuntu font-normal cursor-pointer text-[16px] ${
                    index === navLinks.length - 1 ? 'mr-0' : 'mb-4'
                  } text-white`}
                >
                  {el.to ? (
                    <AddLink onClick={() => handleClick(el.to)}>{el.title}</AddLink>
                  ) : (
                    <a href={`${el.id}`}>{el.title}</a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
