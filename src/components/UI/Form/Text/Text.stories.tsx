import React from 'react';
import { Story, Meta } from '@storybook/react';

import { FormText } from './Text';
import { FormTextProps } from './TextTypes';

export default {
  title: 'Components/Form/Form.Text',
  component: FormText
} as Meta;

const defaultArgs: FormTextProps = {
  placeholder: 'Text Input',
  type: 'text',
  label: 'Some Label',
  className: 'w-80'
};

const Template: Story<FormTextProps> = (args) => <FormText {...args} />;

export const TextInput: Story<FormTextProps> = (args) => <FormText {...args} />;
TextInput.args = defaultArgs;

export const TextInputPassword: Story<FormTextProps> = (args) => <FormText {...args} />;
TextInputPassword.args = {
  ...defaultArgs,
  placeholder: 'Password',
  type: 'password',
  className: 'w-80'
};

export const TextInputInvalid: Story<FormTextProps> = Template.bind({});
TextInputInvalid.args = {
  defaultValue: 'invalidemail',
  validationText: 'Validation helper text',
  type: 'email',
  className: 'w-80'
};

export const TextInputDisabled: Story<FormTextProps> = Template.bind({});
TextInputDisabled.args = {
  ...defaultArgs,
  placeholder: 'Disabled Input',
  disabled: true,
  className: 'w-80'
};
