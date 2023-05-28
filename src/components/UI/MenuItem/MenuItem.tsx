/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MenuItemProps, ItemProps } from './MenuItemTypes';
import { Icon } from '../../UI';

export const MenuItem = ({ icon, disabled, items, className }: MenuItemProps) => {
  if (!items || !items.length) {
    return null;
  }

  return (
    <ul className={`flex flex-col gap-y-4 max-w-sm ${className}`}>
      {items.map(({ label, className: itemClassName, onClick }: ItemProps) => {
        const disabledClass = disabled ? 'opacity-50' : 'cursor-pointer';
        const onClickProp = disabled ? () => null : onClick;
        return (
          <li
            className={`flex justify-between py-2 px-4 cursor-pointer text-sm ${itemClassName} ${disabledClass}`}
            key={uuidv4()}
            onClick={onClickProp}
          >
            <span>{label}</span>
            {icon && <Icon name={icon.name} color={icon.color} size={icon.size} />}
          </li>
        );
      })}
    </ul>
  );
};
