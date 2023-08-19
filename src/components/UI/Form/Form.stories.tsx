import React from 'react';
import { Story, ComponentMeta } from '@storybook/react';

import Form from './Form';
import { FormProps } from './FormTypes';
import { IconProp } from '../Icon/IconTypes';
import Button from '../Button';

export default {
  title: 'Components/DemoForm',
  component: Form,
} as ComponentMeta<typeof Form>;

export const DemoForm: Story<FormProps> = (args: FormProps) => {
  const { onSubmit, ref, ...restProps } = args;
  const formIcon: IconProp = {
    name: 'cog',
    color: 'black',
    size: 'large',
  };

  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      {...restProps}
      className="flex flex-col gap-8 max-w-2xl p-8 rounded-md border-2 border-black"
    >
      <Form.Button type="button" color="green" label="Form Button">
        Authorize Things & Stuff
      </Form.Button>
      <Form.Text
        label="Text Input"
        type="text"
        helperText="The quick brown fox jumped over the lazy dog"
      />
      <Form.File label="File Input" />
      <Form.Switch label="Switch (checkbox)" />
      <Form.Info icon={formIcon} indent>
        I must not fear. Fear is the mind-killer.
      </Form.Info>
      <Form.Text label="Email Input" type="email" validationText="Example validation error" />
      <Form.Password label="Password Input" />
      <Form.Select
        label="Single Select"
        options={new Array(6).fill('').map((val, index) => ({
          label: `Office ${index + 1}`,
          value: index + 1,
        }))}
      />
      <Form.TextArea label="Text (multi-line)" />
      {/* <Form.Radio
          label="Radio Buttons"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedRadio(e.target.value)
          }
          options={new Array(8).fill(0).map((val, index) => {
            const thisValue = `option${index + 1 + val}`;
            return {
              name: `Option ${index + 1}`,
              value: thisValue,
              checked: selectedRadio === thisValue,
            };
          })}
        /> */}
      <Form.Radio
        label="Radio Buttons"
        options={new Array(8).fill(0).map((val, index) => ({
          name: `Option ${index + 1}`,
          value: `option${index + 1}`,
          checked: index === 1,
        }))}
      />
      <Form.Number
        label="Amount"
        thousandsGroupStyle="thousand"
        placeholder="$0.00"
        prefix="$"
        decimalSeparator="."
        displayType="input"
        type="text"
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        allowEmptyFormatting={false}
      />
      <Form.ActionRow>
        <Button type="button" color="secondary">
          Clear
        </Button>
        <Button type="submit" color="primary">
          Save
        </Button>
      </Form.ActionRow>
    </Form>
  );
};
