import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const H1 = Template.bind({});
H1.args = {
  children: 'Heading1',
  as: 'h1'
};

export const H1Bold = Template.bind({});
H1Bold.args = {
  children: 'Heading1 - Bold',
  weight: 'bold',
  as: 'h1'
};

export const H1Thin = Template.bind({});
H1Thin.args = {
  children: 'Heading1 - Bold',
  weight: 'thin',
  as: 'h1'
};

export const H2 = Template.bind({});
H2.args = {
  children: 'Heading2',
  className: 'font-medium',
  as: 'h2'
};

export const H3 = Template.bind({});
H3.args = {
  children: 'Heading3',
  className: 'font-medium',
  as: 'h3'
};

export const H4 = Template.bind({});
H4.args = {
  children: 'Heading4',
  className: 'font-medium',
  as: 'h4'
};

export const H5 = Template.bind({});
H5.args = {
  children: 'Heading5',
  className: 'font-medium',
  as: 'h5'
};

export const H6 = Template.bind({});
H6.args = {
  children: 'Heading6',
  className: 'font-medium',
  as: 'h6'
};
