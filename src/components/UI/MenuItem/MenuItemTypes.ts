import { IconProp } from '../Icon/IconTypes';

export type ItemProps = {
  label?: string;
  className?: string;
  onClick?: () => void;
};

export type MenuItemProps = {
  icon?: IconProp;
  disabled?: boolean;
  items?: ItemProps[];
  className?: string;
};
