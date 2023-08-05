import React from 'react';
import { components, GroupBase, ValueContainerProps } from 'react-select';

import { OptionType } from '..';

export const ValueContainer: React.ComponentType<
  ValueContainerProps<OptionType, true, GroupBase<OptionType>>
> = (props) => {
  const { children, getValue, selectProps, options } = props;
  const { name } = selectProps;
  const [ValueComponents, InputComponent] = children as [React.ReactNode[], React.ReactNode];

  const values = getValue();
  const selectAllString = `${name || 'items'}: All`;
  const countString = `${values.length} ${name || 'items'} selected`;
  const defaultString = values.reduce(
    (prev, next, index) => (index > 0 ? `${prev}, ${next.label}` : next.label),
    '',
  );

  const valuesString =
    values.length === options.length && options.length > 1
      ? selectAllString
      : values.length > 3
      ? countString
      : defaultString;

  return (
    <components.ValueContainer {...props}>
      {values.length > 0 ? <span>{valuesString}</span> : ValueComponents}
      {InputComponent}
    </components.ValueContainer>
  );
};
