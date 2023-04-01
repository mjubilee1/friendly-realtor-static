import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Overlay from './Overlay';
import Button from '../Button';

export default {
  title: 'Components/Overlay',
  component: Overlay
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  return (
    <>
      <Button type="button" onClick={() => setIsOverlayOpen(true)} color="primary" size="small">
        Click Me
      </Button>
      <Overlay {...args} open={!!isOverlayOpen} dismiss={() => setIsOverlayOpen(false)} ariaLabelledBy="overlay-header" />
    </>
  );
};

export const OverlayExample = Template.bind({});
OverlayExample.args = {
  children: (
    <div className="flex gap-4 mx-4">
      <h2 id="overlay-header">Overlay Header</h2>
      <div className="bg-red-500">Card 1</div>
      <div className="bg-blue-500">Card 2</div>
    </div>
  )
};
