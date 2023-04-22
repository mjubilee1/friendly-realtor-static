import { ReactNode } from 'react';

export type HeaderProps = {
  as: keyof JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
  weight?: 'bold' | 'thin';
};
