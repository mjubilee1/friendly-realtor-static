import React from 'react';
import { Group } from '../Shared/Group';
import { HelperMessage } from '../Shared/HelperMessage';
import { Label } from '../Shared/Label';
import { ValidationMessage } from '../Shared/ValidationMessage/ValidationMessage';
import { FormRowProps } from './FormRowTypes';

/**
 * Use this component to lay out several components in a row on a form with a span label.
 * It will assume any interior input components are using their own labels.
 */
export const FormRow = React.forwardRef<HTMLSpanElement, FormRowProps>(
  (props: FormRowProps, ref) => {
    const { children, helperText, label, hideLabel, validationText } = props;

    return (
      <Group noGutter={hideLabel}>
        <Label className="" hidden={hideLabel} useSpan ref={ref}>
          {label}
        </Label>
        <div className="flex gap-4">{children}</div>
        {(helperText || validationText) && (
          <div className="">
            {helperText && <HelperMessage>{helperText}</HelperMessage>}
            {validationText && <ValidationMessage>{validationText}</ValidationMessage>}
          </div>
        )}
      </Group>
    );
  },
);
