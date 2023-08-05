import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../Button';
import { Group } from '../Shared/Group';
import { Label } from '../Shared/Label';
import { FormButtonProps } from './FormButtonTypes';

export const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  (props: FormButtonProps, ref) => {
    const { children, id, label, hideLabel, ...restProps } = props;
    // If an id is not provided, generate one to explicitly bind the label to the input
    const fieldId = uuidv4() || id;

    return (
      <Group noGutter={hideLabel}>
        <Label hidden={hideLabel} htmlFor={fieldId}>
          {label}
        </Label>
        <Button id={fieldId} ref={ref} {...restProps}>
          {children}
        </Button>
      </Group>
    );
  },
);
