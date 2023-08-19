import { ChangeEventHandler } from 'react';
import { BaseInputProps } from '../FormTypes';

export type DateProps = BaseInputProps & {
  accept?: string;
  className?: string;
  id?: string;
  name?: string;
  selected?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  width?: 'medium' | 'large' | 'responsive';
  hidePreviewImage?: boolean;
  text?: string;
};
