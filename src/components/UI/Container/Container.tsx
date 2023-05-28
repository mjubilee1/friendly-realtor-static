import React from 'react';
import { ContainerProps } from './ContainerTypes';

export const Container = ({ children }: ContainerProps) => {
  return <div className="container mx-auto px-4">{children}</div>;
};
