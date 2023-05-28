import { IconProp } from '../../UI copy/Icon/IconTypes';

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
