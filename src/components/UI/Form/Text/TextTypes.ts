import React from 'react';
import { BaseInputProps } from '../FormTypes';

export type FormTextProps = BaseInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    type?:
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'hidden'
      | 'month'
      | 'number'
      | 'password'
      | 'search'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week';
  };
