import { ReactNode } from 'react';

export type PopoverProps = {
  className?: string;
  children: ReactNode;
  element?: ReactNode;
  position?: 'top' | 'left' | 'right' | 'bottom';
};
