import React, { useState } from 'react';
import { close, logo, menu } from '../assets';
import { navLinks } from '../constants';
import Image from 'next/image';
import { AddLink, DropdownMenu } from './UI';
import { RegisterModal } from './RegisterModal';
import { fbEvent, gtagEvent } from '../utils/analyticsUtil';
import { useRouter } from 'next/router';
import { LoginModal } from './LoginModal';

const NavBar = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);

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

    router.push(to);
  };

  return (
    <nav>
      <div className="gap-10 mb-10 lg:flex hidden items-center justify-between">
        <Image src={logo} alt="friendlyRealtor" className="w-[100px]" />
        <ul className="flex list-none justify-end items-center flxe-1">
          {navLinks.map((el, index) => {
            return (
              <li
                key={el.id}
                className={`font-ubuntu font-normal cursor-pointer text-[16px] ${
                  router.pathname === el.id ? 'text-blue-500' : 'text-white'
                } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
              >
                {el.dropdown ? (
                  <DropdownMenu dropdownItems={el.dropdown} title={el.title} />
                ) : el.to ? (
                  <AddLink
                    onClick={() => handleClick(el.to)}
                    size="none"
                    className="text-[16px] font-normal tracking-normal"
                  >
                    {el.title}
                  </AddLink>
                ) : (
                  <a href={el.id}>{el.title}</a>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex gap-6">
          <LoginModal />
          <RegisterModal />
        </div>
      </div>
      <div className="lg:hidden flex flex-1 justify-between items-center mb-8">
        <Image src={logo} alt="friendlyRealtor" className="w-[100px]" />
        <Image
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${
            toggle ? 'flex' : 'hidden'
          } p-6 bg-black-gradient absolute top-20  right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none bg-gray-400 z-[1000] rounded-md py-4 px-4 flex flex-col justify-end items-center flex-1">
            <li>
              <LoginModal mobile />
            </li>
            <li>
              <RegisterModal mobile />
            </li>
            {navLinks.map((el, index) => {
              return (
                <li
                  key={el.id}
                  className={`font-ubuntu font-normal cursor-pointer text-[16px] ${
                    router.pathname === el.id ? 'text-blue-500' : 'text-white'
                  } ${index === navLinks.length - 1 ? 'mr-0' : 'mb-4'}`}
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
