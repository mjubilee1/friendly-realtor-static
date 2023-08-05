/* eslint-disable import/no-extraneous-dependencies */
import { Props } from 'react-select';
import * as CSS from 'csstype';
import { IconProp } from '../Icon/IconTypes';

export type OptionType = {
  value: string | number;
  label: string;
  icon?: IconProp;
};

export const isOption = (option: any): option is OptionType =>
  Object.prototype.hasOwnProperty.call(option, 'label') &&
  Object.prototype.hasOwnProperty.call(option, 'value');

export type SelectStyleProps = {
  width?: 'xsmall' | 'small' | 'medium' | 'large' | 'responsive';
  optionColor?: CSS.Property.Color;
  boldInput?: boolean;
};

export type IsSingleSelect = false;
export type IsMultiSelect = true;

export type SingleSelectProps = Props<OptionType, IsSingleSelect> & SelectStyleProps;

export type MultiSelectProps = Props<OptionType, IsMultiSelect> & SelectStyleProps;
export type OnSelectedChangedType = (selectedValues: (string | number)[]) => void;
export type SelectedValues = (string | number)[];
