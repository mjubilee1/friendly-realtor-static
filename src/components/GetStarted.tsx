import React from 'react';
import styles from '../styles/styles';
import { arrowUp } from '../assets';
import Image from 'next/image';

const GetStarted = () => (
  <a
    href="https://testflight.apple.com/join/88VYYxs4"
    className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-primary p-[2px] cursor-pointer`}
  >
    <div className={`${styles.flexCenter} flex-col bg-secondary w-[100%] h-[100%] rounded-full`}>
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-ubuntu font-medium text-[18px] leading-[23px] mr-2">
          <span className="text-primary">Get</span>
        </p>
        <Image src={arrowUp} className="w-[23px] h-[23px] object-contain" alt="" />
      </div>
      <p className="font-ubuntu font-medium text-[18px] leading-[23px]">
        <span className="text-primary">Started</span>
      </p>
    </div>
  </a>
);

export default GetStarted;
