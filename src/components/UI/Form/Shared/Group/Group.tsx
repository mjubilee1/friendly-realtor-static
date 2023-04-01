import React from 'react';
import { GroupProps } from './GroupTypes';

export function Group(props: GroupProps) {
  const { children, className = '' } = props;

  return <div className={`${className}`}>{children}</div>;
}
