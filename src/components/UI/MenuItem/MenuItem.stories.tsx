import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ColorOptions, SizeOptions } from '../../../models';

import MenuItem from './MenuItem';

export default {
  title: 'Components/MenuItem',
  component: MenuItem
} as ComponentMeta<typeof MenuItem>;

const Template: ComponentStory<typeof MenuItem> = (args) => <MenuItem {...args} />;

export const SimpleMenuItem = Template.bind({});
SimpleMenuItem.args = {
  icon: {
    color: 'black' as ColorOptions,
    name: 'chevron-right',
    size: 'large' as SizeOptions
  },
  items: [
    {
      label: 'Item 1',
      onClick: () => console.log('Item 1 clicked'),
      className: 'bg-red-400 hover:bg-red-300'
    },
    {
      label: 'Item 2',
      className: 'bg-red-400 hover:bg-red-300'
    },
    {
      label: 'Item 3',
      className: 'bg-red-400 hover:bg-red-300'
    },
    {
      label: 'Item 1',
      onClick: () => console.log('Item 1 clicked'),
      className: 'bg-red-400 hover:bg-red-300'
    },
    {
      label: 'Item 2',
      className: 'bg-red-400 hover:bg-red-300'
    },
    {
      label: 'Item 3',
      className: 'bg-red-400 hover:bg-red-300'
    }
  ]
};
