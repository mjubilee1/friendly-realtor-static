/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import { components, GroupBase, MenuListProps } from 'react-select';

import Checkbox from '../../Checkbox';
import { isOption, OptionType } from '../SelectTypes';

export const MenuList: React.ComponentType<
  MenuListProps<OptionType, true, GroupBase<OptionType>>
> = (props) => {
  const { children, options, getValue, setValue, clearValue } = props;

  const selectAllOption = useMemo(() => ({ label: 'Select All', value: 'all' }), []);
  const selectAllRef = useRef<HTMLDivElement | null>(null);

  // Filter out any groups from options
  const allOptions = options.filter((option) => isOption(option)) as OptionType[];
  const value = getValue();
  const allSelected = useMemo(() => {
    const isAllSelected = _.isEqual(allOptions.length, value.length); // compared length only otherwise sequence of options will be different and check will always return false.
    return isAllSelected;
  }, [allOptions, value]);

  const onSelectAll = useCallback(() => {
    if (!allSelected) {
      setValue(allOptions, 'select-option', selectAllOption);
    } else {
      clearValue();
    }
  }, [allOptions, allSelected, clearValue, selectAllOption, setValue]);

  return (
    <components.MenuList {...props}>
      <div
        onClick={onSelectAll}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'Enter':
            case ' ': // Space Bar
              onSelectAll();
              break;
            default:
              break;
          }
        }}
        role="option"
        tabIndex={0}
        aria-selected={allSelected}
        className="selectAll-option"
      >
        <components.Option
          {...props}
          data={selectAllOption}
          type="option"
          isDisabled={false}
          isSelected={allSelected}
          isFocused={false}
          innerRef={(element) => {
            selectAllRef.current = element;
          }}
          label={selectAllOption.label}
        >
          <Checkbox checked={allSelected} readOnly />
          <span>Select All</span>
        </components.Option>
      </div>
      {children}
    </components.MenuList>
  );
};
