import React from 'react';
import { NumberFormatValues, SourceInfo } from 'react-number-format';
import { BaseInputProps } from '../FormTypes';

export type FormNumberProps = BaseInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'types'> & {
    type?: 'text' | 'tel' | 'password';
    thousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | undefined;
    placeholder?: string | undefined;
    prefix?: string | undefined;
    decimalSeparator?: string | undefined;
    displayType?: 'input' | 'text' | undefined;
    thousandSeparator?: boolean | undefined;
    decimalScale?: number | undefined;
    fixedDecimalScale?: boolean | undefined;
    allowEmptyFormatting?: boolean | undefined;
    onValueChange?: ((values: NumberFormatValues, sourceInfo: SourceInfo) => void) | undefined;
    value?: string | number | null | undefined;
    defaultValue?: string | number | undefined;
    isAllowed?: ((values: NumberFormatValues) => boolean) | undefined;
    format?: string | undefined;
    allowNegative?: boolean | undefined;
    mask?: string | string[] | undefined;
  };
