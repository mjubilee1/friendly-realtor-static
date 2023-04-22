import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { Switch } from './Switch';
import { SwitchProps } from './SwitchTypes';

export default {
  title: 'Components/Switch',
  component: Switch
} as Meta;

const defaultArgs = {
  label: true
};

const Template: Story<SwitchProps> = ({ label, disabled }: SwitchProps) => {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => setChecked(!checked);

  return <Switch onChange={toggleChecked} checked={checked} label={label} disabled={disabled} />;
};

export const BasicSwitch = Template.bind({});
BasicSwitch.args = defaultArgs;

export const CustomMessageSwitch = Template.bind({});
CustomMessageSwitch.args = {
  label: {
    enabled: 'My Thing Enabled',
    disabled: 'My Thing Disabled'
  }
};
