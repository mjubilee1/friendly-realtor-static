import React from 'react';
import { HeaderProps } from './HeaderTypes';

/**
 *  Header component
 * @param {*} as, alias HTag and default h1
 */

function getHeaderSize(size) {
  switch (size) {
    case 'h1':
      return 'text-[48px] leading-[58px]';
    case 'h2':
      return 'text-[40px] leading-[48px]';
    case 'h3':
      return 'text-[32px] leading-[38px]';
    case 'h4':
      return 'text-[24px] leading-[28px]';
    case 'h5':
      return 'text-[18px] leading-[21px]';
    case 'h6':
      return 'text-[16px] leading-[20px]';
    default:
      return 'text-base';
  }
}

function getHeaderFontWeight(weight) {
  switch (weight) {
    case 'bold':
      return 'font-medium';
    case 'thin':
      return 'font-light';
    default:
      return 'font-normal';
  }
}

export const Header = ({ as: HTag = 'h1', className, children, weight }: HeaderProps) => {
  return (
    <HTag className={`${className} ${getHeaderSize(HTag)} ${getHeaderFontWeight(weight)}`}>
      {children}
    </HTag>
  );
};
