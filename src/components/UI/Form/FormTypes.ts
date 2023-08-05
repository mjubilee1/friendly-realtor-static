import React from 'react';

type FormStyleProps = {
  minWidth?: string | number;
  noLayout?: boolean;
  align?: 'left' | 'center' | 'right';
};

export type FormProps = FormStyleProps & JSX.IntrinsicElements['form'];

export type BaseInputProps = {
  helperText?: string;
  hideLabel?: boolean;
  labelClassName?: string;
  helperClassName?: string;
  validationClassName?: string;
  indent?: boolean;
  label?: string | React.ReactNode;
  labelIcon?: React.ReactNode;
  responsiveLabel?: boolean;
  validationText?: string;
  minWidth?: string | number;
  width?: 'small' | 'medium' | 'large' | 'responsive';
};

export const controlWidth = {
  large: 544,
  medium: 224,
  small: 72,
};
