import { ReactNode } from 'react';

export type AddLinkProps = {
  to?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
};
