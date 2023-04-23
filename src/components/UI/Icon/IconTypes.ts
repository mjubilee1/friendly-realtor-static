import React from 'react';
import { ColorOptions, SizeOptions, PositionOptions } from '../../../models';

export type IconMapProps = {
  [key: string]: JSX.Element;
};

export type IconProp = {
  name: string;
  color: ColorOptions;
  size: SizeOptions;
  solid?: boolean;
  className?: string;
  position?: PositionOptions;
  rotate?: boolean;
};
