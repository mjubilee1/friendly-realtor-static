import React from 'react';
import { Story, Meta } from '@storybook/react';

import { FormNumber } from './Number';
import { FormNumberProps } from './NumberType';

export default {
  title: 'Components/Form/Form.Number',
  component: FormNumber,
} as Meta;

const defaultArgs: FormNumberProps = {
  placeholder: '$0.00',
  type: 'text',
  prefix: '$',
};

export const TextInput: Story<FormNumberProps> = (args) => <FormNumber {...args} />;
TextInput.args = defaultArgs;
