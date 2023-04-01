import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from './Icon';
import { ColorOptions, SizeOptions } from '../../../models';

export default {
  title: 'Components/Icon',
  component: Icon
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Dot = Template.bind({});
Dot.args = {
  color: 'blue' as ColorOptions,
  name: 'dot',
  size: 'small' as SizeOptions
};

export const Discover = Template.bind({});
Discover.args = {
  color: 'green' as ColorOptions,
  name: 'discover',
  size: 'large' as SizeOptions
};
