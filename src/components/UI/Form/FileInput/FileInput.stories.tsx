import React from 'react';
import { Story, Meta } from '@storybook/react';

import { FileInput } from './FileInput';
import { FileInputProps } from './FileInputTypes';

export default {
  title: 'Components/Form/Form.FileInput',
  component: FileInput
} as Meta;

const defaultArgs: FileInputProps = {
  label: 'File Input'
};

const Template: Story<FileInputProps> = (args) => <FileInput {...args} />;

export const BasicFileInput = Template.bind({});
BasicFileInput.args = defaultArgs;
