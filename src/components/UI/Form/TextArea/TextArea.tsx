import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextAreaProps } from './TextAreaTypes';
import { Label } from '../Shared/Label';
import { Group } from '../Shared/Group';
import { HelperMessage } from '../Shared/HelperMessage';
import { ValidationMessage } from '../Shared/ValidationMessage';

export const FormTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props: TextAreaProps, ref) => {
    const {
      className,
      helperText,
      hideLabel,
      id,
      label,
      rows = 4,
      validationText,
      ...restProps
    } = props;

    // If an id is not provided, generate one to explicitly bind the label to the input
    const fieldId = id || uuidv4();

    return (
      <Group noGutter={hideLabel}>
        <Label hidden={hideLabel} htmlFor={fieldId}>
          {label}
        </Label>
        <textarea
          className={`${className} block w-full`}
          id={fieldId}
          ref={ref}
          rows={rows}
          {...restProps}
        />
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

export default FormTextArea;
