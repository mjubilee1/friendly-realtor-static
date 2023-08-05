import React from 'react';
import { components, GroupBase, SingleValueProps } from 'react-select';
import Icon from '../../Icon';
import { OptionType } from '..';

export const SingleValue: React.ComponentType<
  SingleValueProps<OptionType, false, GroupBase<OptionType>>
> = (props) => {
  const { data, children } = props;

  const IconComponent = (
    <>
      {data.icon && <Icon name={data.icon.name} color="black" size="small" />}
      <span>{data?.label}</span>
    </>
  );

  return (
    <components.SingleValue {...props}>
      {data?.icon ? IconComponent : children}
    </components.SingleValue>
  );
};
