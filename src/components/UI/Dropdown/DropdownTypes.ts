import { ReactNode } from 'react';
import { ButtonProps } from '../Button/ButtonTypes';
import { IconProp } from '../Icon/IconTypes';

export type TriggerProps = {
  button?: ButtonProps;
  icon?: IconProp;
  trigger: ReactNode;
  disabled?: boolean;
  selected?: string;
};

export type BasicDropdownProps = {
  // will return null without id
  id: string;
  children: ReactNode;
  dropBackgroundColor?: string;
  className?: string;
  dropClassName?: string;
  hideIcon?: boolean;
  button?: ButtonProps;
  icon?: IconProp;
  trigger: ReactNode;
  ariaLabel: string;
};

export type DropdownProps = BasicDropdownProps & TriggerProps;
