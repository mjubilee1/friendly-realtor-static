import { ChangeEventHandler } from 'react';
import { BaseInputProps } from '../FormTypes';

export type FileInputProps = BaseInputProps & {
  accept?: string;
  className?: string;
  id?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  width?: 'medium' | 'large' | 'responsive';
  hidePreviewImage?: boolean;
  text?: string;
};
