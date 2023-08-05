import React from 'react';
import { components, GroupBase, OptionProps } from 'react-select';

import Checkbox from '../../Checkbox';
import { OptionType } from '../SelectTypes';

export const Option: React.ComponentType<OptionProps<OptionType, true, GroupBase<OptionType>>> = (
  props,
) => {
  const { children, isSelected } = props;

  return (
    <components.Option {...props}>
      <Checkbox checked={isSelected} readOnly />
      <span>{children}</span>
    </components.Option>
  );
};
