import React from 'react';
import { InfoProps } from './InfoTypes';
import Icon from '../../Icon';

export function Info(props: InfoProps) {
  const { children, icon, className } = props;

  return (
    <div className={`${className} flex flex-row items-center content-center gap-x-2 justify-start`}>
      {icon && <Icon name={icon.name} size={icon.size} color={icon.color} />}
      <span className="font-semibold text-left">{children}</span>
    </div>
  );
}
