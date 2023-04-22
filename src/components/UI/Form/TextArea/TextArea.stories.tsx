import React from 'react';
import { Story, Meta } from '@storybook/react';

import { FormTextArea } from './TextArea';
import { FormTextAreaProps } from './TextAreaTypes';

export default {
  title: 'Components/Form/Form.TextArea',
  component: FormTextArea
} as Meta;

const defaultArgs: FormTextAreaProps = {
  defaultValue: '',
  type: 'text',
  className: 'w-80'
};

const Template: Story<FormTextAreaProps> = (args) => <FormTextArea {...args} />;

export const TextArea: Story<FormTextAreaProps> = (args) => <FormTextArea {...args} />;
TextArea.args = defaultArgs;

// create a invalid check

export const TextAreaDisabled: Story<FormTextAreaProps> = Template.bind({});
TextAreaDisabled.args = {
  ...defaultArgs,
  disabled: true
};
