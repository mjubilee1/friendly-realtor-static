import React from 'react';
import { ContainerProps } from './ContainerTypes';

export const Container = ({ children, className }: ContainerProps) => {
  return <div className={`container mx-auto px-4 ${className}`}>{children}</div>;
};
