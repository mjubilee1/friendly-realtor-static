import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Checkbox from './Checkbox';
import { ColorOptions, SizeOptions, PositionOptions } from '../../../models';

export default {
  title: 'Components/Checkbox',
  component: Checkbox
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const BasicCheckbox = Template.bind({});

export const CustomMessageCheckbox = Template.bind({});
CustomMessageCheckbox.args = {
  labelText: 'Hello World'
};

export const CustomMessageCheckboxWithIcon = Template.bind({});
CustomMessageCheckboxWithIcon.args = {
  labelText: 'Hello World',
  labelIcon: {
    name: 'link',
    solid: true,
    position: 'left' as PositionOptions,
    color: 'black' as ColorOptions,
    size: 'medium' as SizeOptions
  }
};
