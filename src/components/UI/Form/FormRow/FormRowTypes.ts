import React from 'react';
import { BaseInputProps } from '../FormTypes';

type RowLabelStyleProps = {
  labelColor?: 'danger' | 'content';
};

export type FormRowProps = React.PropsWithChildren<BaseInputProps> & RowLabelStyleProps;
