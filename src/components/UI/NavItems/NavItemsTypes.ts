import { ReactNode } from 'react';

export type Item = {
  label: string;
  children?: ReactNode;
  href?: string;
};

export type NavItemsProps = {
  items: Item[];
  containerClassNames?: string;
  classNames?: string;
};
