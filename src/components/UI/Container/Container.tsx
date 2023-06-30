import React from 'react';
import { ContainerProps } from './ContainerTypes';
import { NextSeo } from 'next-seo';

export const Container = ({ children, className, seoProps }: ContainerProps) => {
  return (
    <>
      {seoProps && <NextSeo {...seoProps} />}
      <div className={`container mx-auto px-4 ${className}`}>{children}</div>
    </>
  );
};
