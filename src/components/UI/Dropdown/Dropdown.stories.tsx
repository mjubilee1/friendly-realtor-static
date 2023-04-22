import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Dropdown from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const EndeavorsDropdown = Template.bind({});

EndeavorsDropdown.args = {
  id: '2',
  ariaLabel: 'Storybook Dropdown Example',
  dropBackgroundColor: 'bg-gray-500',
  dropClassName: 'bg-white rounded-sm border-xs border-gray-700 box-shadow',
  trigger: <p>Select an option...</p>,
  children: (
    <ul className="box-shadow">
      <li className=" hover:bg-red-200 hover:animate-pulse px-4 py-2">
        <button onClick={() => console.log('Item 1 clicked')}>Item 1</button>
      </li>
      <li className=" hover:bg-blue-200 px-4 py-2">
        <button onClick={() => console.log('Item 2 clicked')}>Item 2</button>
      </li>
      <li className="hover:bg-green-200 px-4 py-2">
        <button onClick={() => console.log('Item 3 clicked')}>Item 3</button>
      </li>
      <li className=" hover:bg-gray-200 px-4 py-2">
        <button onClick={() => console.log('Item 4 clicked')}>Item 4</button>
      </li>
    </ul>
  )
};

export const DisabledDropdown = Template.bind({});
DisabledDropdown.args = {
  id: '3',
  ariaLabel: 'Storybook Dropdown Example',
  dropBackgroundColor: 'bg-gray-500',
  dropClassName: 'bg-white rounded-sm border-xs border-gray-700 box-shadow',
  trigger: <p>Select an option...</p>,
  children: (
    <ul className="box-shadow">
      <li className=" hover:bg-red-200 hover:animate-pulse px-4 py-2">
        <button onClick={() => console.log('Item 1 clicked')}>Item 1</button>
      </li>
      <li className=" hover:bg-blue-200 px-4 py-2">
        <button onClick={() => console.log('Item 2 clicked')}>Item 2</button>
      </li>
      <li className="hover:bg-green-200 px-4 py-2">
        <button onClick={() => console.log('Item 3 clicked')}>Item 3</button>
      </li>
      <li className=" hover:bg-gray-200 px-4 py-2">
        <button onClick={() => console.log('Item 4 clicked')}>Item 4</button>
      </li>
    </ul>
  )
};
