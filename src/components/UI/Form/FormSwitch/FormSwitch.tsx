import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Switch } from '../../Switch';
import { Group } from '../Shared/Group';
import { HelperMessage } from '../Shared/HelperMessage';
import { Label } from '../Shared/Label';
import { ValidationMessage } from '../Shared/ValidationMessage/ValidationMessage';
import { FormSwitchProps } from './FormSwitchTypes';

export const FormSwitch = React.forwardRef<HTMLInputElement, FormSwitchProps>(
  (props: FormSwitchProps, ref) => {
    const { id, label, helperText, hideLabel, validationText, ...restProps } = props;
    // If an id is not provided, generate one to explicitly bind the label to the input
    const fieldId = uuidv4() || id;

    return (
      <Group noGutter={hideLabel}>
        <Label htmlFor={fieldId} hidden={hideLabel}>
          {label}
        </Label>
        <Switch id={fieldId} ref={ref} {...restProps} />
        {(helperText || validationText) && (
          <div>
            {helperText && <HelperMessage>{helperText}</HelperMessage>}
            {validationText && <ValidationMessage>{validationText}</ValidationMessage>}
          </div>
        )}
      </Group>
    );
  },
);
