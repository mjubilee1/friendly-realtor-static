import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';
import Icon from '../Icon';
import { ButtonType } from './ButtonTypes';
import { ColorOptions, SizeOptions, PositionOptions } from '../../../models';

export default {
  title: 'Components/Button',
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button Text',
  color: 'blue' as ColorOptions,
  type: 'button' as ButtonType
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'button' as ButtonType,
  color: 'green' as ColorOptions,
  children: 'Secondary'
};

export const LargeButton = Template.bind({});
LargeButton.args = {
  type: 'button' as ButtonType,
  color: 'blue' as ColorOptions,
  children: 'Button Text',
  size: 'large' as SizeOptions
};

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  type: 'button' as ButtonType,
  color: 'green' as ColorOptions,
  children: 'Continue',
  icon: {
    name: 'video-camera',
    solid: true,
    position: 'left' as PositionOptions,
    color: 'white' as ColorOptions,
    size: 'medium' as SizeOptions
  }
};

export const LargeButtonWithIcon = Template.bind({});
LargeButtonWithIcon.args = {
  type: 'button' as ButtonType,
  color: 'blue' as ColorOptions,
  children: 'Continue',
  size: 'large' as SizeOptions,
  icon: {
    name: 'video-camera',
    solid: true,
    position: 'left' as PositionOptions,
    color: 'white' as ColorOptions,
    size: 'large' as SizeOptions
  }
};

export const ButtonIconOnly = Template.bind({});
ButtonIconOnly.args = {
  type: 'button' as ButtonType,
  color: 'green' as ColorOptions,
  iconOnly: true,
  icon: {
    name: 'video-camera',
    solid: true,
    color: 'white' as ColorOptions,
    size: 'large' as SizeOptions
  }
};

export const IndicatorButton = Template.bind({});
IndicatorButton.args = {
  type: 'button' as ButtonType,
  color: 'gray' as ColorOptions,
  className: '!p-1',
  children: <Icon name="video-camera" color="white" size="large" solid className="relative" />,
  icon: {
    name: 'dot',
    solid: true,
    color: 'blue' as ColorOptions,
    size: 'small' as SizeOptions,
    position: 'left' as PositionOptions,
    className: 'absolute top-4 left-[2.65em]'
  }
};
