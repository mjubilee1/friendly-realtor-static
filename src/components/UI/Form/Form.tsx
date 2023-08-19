import React from 'react';
import { FormTextArea } from './TextArea';
import { FormText } from './Text';
import { ActionRow } from './ActionRow';
import { FormProps } from './FormTypes';
import { FileInput } from './FileInput';
import { FormTextProps } from './Text/TextTypes';
import { FormButton } from './FormButton';
import { Info } from './Info';
import { Radio } from './Radio';
import { FormSwitch } from './FormSwitch';
import { FormRow } from './FormRow';
import { FormSelect } from './FormSelect';
import { Date } from './Date';

function getAligmentClass(pos): string {
  switch (pos) {
    case 'left':
      return 'text-left';
    case 'right':
      return 'text-right';
    default:
      return 'text-center';
  }
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>((props: FormProps, ref) => (
  <form {...props} className={`${props.className} ${getAligmentClass(props.align)}`} ref={ref} />
));

export default Object.assign(Form, {
  ActionRow,
  Button: FormButton,
  File: FileInput,
  Date,
  Info,
  Password: React.forwardRef<HTMLInputElement, Omit<FormTextProps, 'type'>>((props, ref) => (
    <FormText type="password" {...props} ref={ref} />
  )),
  Radio,
  Row: FormRow,
  Select: FormSelect,
  Switch: FormSwitch,
  Text: FormText,
  TextArea: FormTextArea,
});
