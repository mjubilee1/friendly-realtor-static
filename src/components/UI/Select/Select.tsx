import React from 'react';
import ReactSelect, { GroupBase, SelectInstance } from 'react-select';
import { SelectComponents } from 'react-select/dist/declarations/src/components';

import { IsSingleSelect, OptionType } from '.';
import { SingleSelectProps } from './SelectTypes';
import { Option, SingleValue } from './SingleSelectComponents';

export const Select = React.forwardRef<
  SelectInstance<OptionType, IsSingleSelect>,
  SingleSelectProps
>((props: SingleSelectProps, ref) => {
  const { components, styles, onChange, value, ...restProps } = props;
  const combinedComponents: Partial<SelectComponents<OptionType, false, GroupBase<OptionType>>> = {
    // This library's custom components go here,
    Option,
    SingleValue,
    ...components,
  };

  return (
    <ReactSelect
      {...restProps}
      components={combinedComponents}
      isClearable={false}
      maxMenuHeight={200}
      menuPlacement="auto"
      menuShouldScrollIntoView
      minMenuHeight={32}
      onChange={onChange}
      value={value}
      ref={ref}
      styles={styles}
    />
  );
});
