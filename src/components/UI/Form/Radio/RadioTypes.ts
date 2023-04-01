import React from 'react';
import { BaseInputProps } from '../FormTypes';

export type RadioProps = BaseInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    options: {
      name: string;
      value: string | number | readonly string[] | undefined;
      checked?: boolean;
    }[];
  };
