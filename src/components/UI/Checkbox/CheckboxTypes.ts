import React from 'react';
import { IconProp } from '../../UI copy/Icon/IconTypes';

export type CheckboxStyleProps = {
  labelIcon?: IconProp;
  labelPos?: 'left' | 'right' | 'top' | 'bottom';
  labelText?: string;
};

export type CheckboxProps = CheckboxStyleProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;
