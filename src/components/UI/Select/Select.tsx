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
  const { components, styles, onChange, error, value, ...restProps } = props;
  const combinedComponents: Partial<SelectComponents<OptionType, false, GroupBase<OptionType>>> = {
    // This library's custom components go here,
    Option,
    SingleValue,
    ...components,
  };

  // Custom styles to make it look better
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      border: '1px solid #ccc',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3182CE' : 'white',
      color: 'black',
      padding: '8px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    // Add more styles as needed
  };

  return (
    <>
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
        styles={{ ...styles, ...customStyles }}
      />
      {error && <span className="text-red-500">{error.message || 'This is Required'}</span>}
    </>
  );
});
