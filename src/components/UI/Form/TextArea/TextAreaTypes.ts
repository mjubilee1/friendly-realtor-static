import React from 'react';
import { BaseInputProps } from '../FormTypes';

export type FormTextAreaProps = {
  type?: string;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
};

export type TextAreaProps = BaseInputProps &
  FormTextAreaProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;
