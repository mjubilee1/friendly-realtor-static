import { ReactNode } from 'react';
import { NextSeoProps } from 'next-seo';

export type ContainerProps = {
  children: ReactNode;
  className?: string;
  seoProps?: NextSeoProps;
};
