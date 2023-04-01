import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tooltip from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip
} as ComponentMeta<typeof Tooltip>;

const Template1: ComponentStory<typeof Tooltip> = (args) => (
  <div className="m-8 w-1/2">
    <Tooltip {...args}>
      <button className="bg-primary-500 text-black w-1/2 p-4 rounded-sm"> Hover Over Me to see tooltip </button>
    </Tooltip>
  </div>
);

export const TooltipExample = Template1.bind({});
TooltipExample.args = {
  content: 'I am a tooltip',
  position: 'top',
  arrow: true
};
