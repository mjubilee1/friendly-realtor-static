import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavItems from './NavItems';

export default {
  title: 'Components/NavItems',
  component: NavItems
} as ComponentMeta<typeof NavItems>;

const Template: ComponentStory<typeof NavItems> = (args) => <NavItems {...args} />;

export const Nav = Template.bind({});
Nav.args = {
  items: [
    {
      label: 'Page 1',
      children: <p>Hello</p>
    },
    {
      label: 'Page 2',
      children: <p>Hello</p>
    },
    {
      label: 'Page 3',
      children: <p>Hello</p>
    },
    {
      label: 'Page 4',
      children: <p>Hello</p>
    }
  ]
};
