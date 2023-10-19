import React, { useState } from 'react';
import { close, logo, menu } from '../assets';
import { navLinks } from '../constants';
import Image from 'next/image';
import { AddLink, DropdownMenu } from './UI';
import { RegisterModal } from './RegisterModal';
import { fbEvent, gtagEvent } from '../utils/analyticsUtil';
import { useRouter } from 'next/router';
import { LoginModal } from './LoginModal';
import { useAuthContext } from '../context';

const NavBar = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);
  const { user, logoutUser } = useAuthContext();

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

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <div className="gap-10 mb-10 lg:flex hidden items-center justify-between">
        <Image
          src={logo}
          alt="friendlyRealtor"
          className="w-[100px] cursor-pointer"
          onClick={() => router.push('/')}
        />
        <ul className="flex list-none justify-end items-center">
          {navLinks.map((el, index) => {
            return (
              <li
                key={el.id}
                className={`font-ubuntu font-normal cursor-pointer text-[16px] ${
                  router.pathname === el.id ? 'text-blue-500' : 'text-white'
                } ${
                  index === navLinks.length - 1 ? 'mr-0' : 'mr-10'
                } hover:bg-blue-500 text-white hover:p-2`}
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
          {user && (
            <li
              onClick={() => (window.location.href = '/profile')}
              className={`font-ubuntu font-normal cursor-pointer text-[16px] ml-10 hover:bg-blue-500 text-white hover:p-2`}
            >
              Profile
            </li>
          )}
        </ul>
        <div className="flex gap-6">
          {!user ? (
            <>
              <LoginModal />
              <RegisterModal />
            </>
          ) : (
            <div onClick={handleLogout} className="cursor-pointer">
              Sign Out
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden flex flex-1 justify-between items-center mb-8">
        <Image
          src={logo}
          alt="friendlyRealtor"
          className="w-[100px] cursor-pointer"
          onClick={() => router.push('/')}
        />
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
            {!user ? (
              <>
                <li>
                  <LoginModal mobile />
                </li>
                <li>
                  <RegisterModal mobile />
                </li>
              </>
            ) : (
              <div onClick={handleLogout} className="cursor-pointer">
                Sign Out
              </div>
            )}
            {navLinks.map((el, index) => {
              return (
                <li
                  key={el.id}
                  className={`font-ubuntu font-normal cursor-pointer text-[16px] ${
                    router.pathname === el.id ? 'text-blue-500' : 'text-white'
                  } ${index === navLinks.length - 1 ? 'mr-0' : 'mb-4'}`}
                >
                  {el.dropdown ? (
                    <DropdownMenu dropdownItems={el.dropdown} title={el.title} />
                  ) : el.to ? (
                    <AddLink onClick={() => handleClick(el.to)}>{el.title}</AddLink>
                  ) : (
                    <a href={`${el.id}`}>{el.title}</a>
                  )}
                </li>
              );
            })}
            {user && (
              <li
                onClick={() => (window.location.href = '/profile')}
                className={`font-ubuntu font-normal cursor-pointer text-[16px] mt-4`}
              >
                Profile
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
