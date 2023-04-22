import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchBar from './SearchBar';

export default {
  title: 'Components/SearchBar',
  component: SearchBar
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = () => <SearchBar />;

export const SearchBarExample = Template.bind({});
