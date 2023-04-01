import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Popover from './Popover';

export default {
  title: 'Components/Popover',
  component: Popover
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} element={<button>Popover Btn</button>}>
    Hello
  </Popover>
);

export const BasicPopover = Template.bind({});
BasicPopover.args = {};
