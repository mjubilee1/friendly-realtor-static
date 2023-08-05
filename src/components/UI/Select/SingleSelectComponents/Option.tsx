import React from 'react';
import { components, GroupBase, OptionProps } from 'react-select';
import { OptionType } from '../SelectTypes';
import Icon from '../../Icon';

export const Option: React.ComponentType<OptionProps<OptionType, false, GroupBase<OptionType>>> = (
  props,
) => {
  const { data, children } = props;

  const IconComponent = (
    <>
      {data.icon && <Icon name={data.icon.name} color="black" size="small" />}
      <span>{data?.label}</span>
    </>
  );

  return <components.Option {...props}>{data?.icon ? IconComponent : children}</components.Option>;
};
