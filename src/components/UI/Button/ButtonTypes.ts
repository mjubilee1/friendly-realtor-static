import { ReactNode } from 'react';
import { ColorOptions, SizeOptions } from '../../../models';
import { IconProp } from '../Icon/IconTypes';

export type ButtonType = 'button' | 'submit';

export type ButtonProps = {
  // button type is import for accessibility
  id?: string;
  type?: ButtonType;
  color: ColorOptions;
  text?: string;
  children?: ReactNode;
  icon?: IconProp;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  iconOnly?: boolean;
  href?: string;
  target?: string;
  disabled?: boolean;
  size?: SizeOptions;
};
