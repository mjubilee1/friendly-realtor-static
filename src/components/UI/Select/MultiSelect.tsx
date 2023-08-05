import React from 'react';
import ReactSelect, { GroupBase, SelectInstance } from 'react-select';
import { SelectComponents } from 'react-select/dist/declarations/src/components';
import { OptionType } from '.';
import { MenuList, Option, ValueContainer } from './MultiSelectComponents';
import { IsMultiSelect, MultiSelectProps } from './SelectTypes';

export const MultiSelect = React.forwardRef<
  SelectInstance<OptionType, IsMultiSelect>,
  MultiSelectProps
>((props: MultiSelectProps, ref) => {
  const { components, styles, name, ...restProps } = props;

  const combinedComponents: Partial<SelectComponents<OptionType, true, GroupBase<OptionType>>> = {
    // This library's custom components go here,
    Option,
    MenuList,
    ValueContainer,
    ...components,
  };

  return (
    <ReactSelect
      {...restProps}
      backspaceRemovesValue={false}
      closeMenuOnSelect={false}
      components={combinedComponents}
      hideSelectedOptions={false}
      isClearable={false}
      isMulti
      isSearchable={false}
      maxMenuHeight={200}
      menuPlacement="auto"
      menuShouldScrollIntoView
      minMenuHeight={32}
      ref={ref}
      styles={styles}
      name={name}
    />
  );
});
