import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Select } from './Select';
import { MultiSelect } from './MultiSelect';
import { MultiSelectProps, SingleSelectProps } from './SelectTypes';
import { IconProp } from '../Icon/IconTypes';

export default {
  title: 'Components/Select',
  component: Select
} as Meta;

const defaultArgs: MultiSelectProps = {
  options: [
    {
      label: 'Office 1',
      value: 'o1'
    },
    {
      label: 'Office 2',
      value: 'o2'
    },
    {
      label: 'Office Threeeeeeeeeeeeeeeeeeeeeeeeeee',
      value: 'o3'
    },
    ...new Array(3).fill('').map((val, index) => ({ label: `Thing ${index}`, value: index }))
  ],
  isSearchable: true
};

const SingleTemplate: Story<SingleSelectProps> = (args) => <Select {...args} />;

export const SingleSelect = SingleTemplate.bind({});
SingleSelect.args = {
  ...defaultArgs,
  placeholder: 'Select Office',
  boldInput: false,
  optionColor: '#999999',
  width: 'medium'
} as SingleSelectProps;

const MultiTemplate: Story<MultiSelectProps> = (args) => <MultiSelect {...args} />;

export const MultipleSelect = MultiTemplate.bind({});
MultipleSelect.args = defaultArgs;

const defaultArgsWithIcon: SingleSelectProps | MultiSelectProps = {
  options: [
    {
      label: 'Office 1',
      value: 'o1',
      icon: { name: 'chevron-right', color: 'black', size: 'small' } as IconProp
    },
    {
      label: 'Office 2',
      value: 'o2',
      icon: { name: 'chevron-left', color: 'black', size: 'small' } as IconProp
    },
    {
      label: 'Office Threeeeeeeeeeeeeeeeeeeeeeeeeee',
      value: 'o3',
      icon: { name: 'home', color: 'black', size: 'small' } as IconProp
    },
    ...new Array(3).fill('').map((val, index) => ({ label: `Thing ${index}`, value: index }))
  ],
  isSearchable: true
};

const SingleTemplateWithIcon: Story<SingleSelectProps> = (args) => <Select {...args} />;

export const SingleSelectWithIcon = SingleTemplateWithIcon.bind({});
SingleSelectWithIcon.args = {
  ...defaultArgsWithIcon,
  placeholder: 'Select Office',
  boldInput: true,
  optionColor: '#4779FF',
  width: 'medium'
} as SingleSelectProps;
