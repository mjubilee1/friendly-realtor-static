import React, { useId } from 'react';
import { Select } from '../../Select';
import { Group } from '../Shared/Group';
import { HelperMessage } from '../Shared/HelperMessage';
import { Label } from '../Shared/Label';
import { ValidationMessage } from '../Shared/ValidationMessage/ValidationMessage';
import { FormSelectProps } from './FormSelectTypes';

export function FormSelect(props: FormSelectProps) {
  const {
    className,
    label,
    helperText,
    hideLabel,
    validationText,
    width = 'small',
    ...restProps
  } = props;
  // If an id is not provided, generate one to explicitly bind the label to the input
  const fieldId = useId();
  const customStyles = {
    control: (provided) => ({ ...provided, borderRadius: '8px' }),
  };

  return (
    <Group noGutter={hideLabel}>
      <Label htmlFor={fieldId} hidden={hideLabel}>
        {label}
      </Label>
      <Select
        className={`${className || ''}`}
        id={fieldId}
        width={width}
        {...restProps}
        styles={customStyles}
      />
      {(helperText || validationText) && (
        <div className="">
          {helperText && <HelperMessage>{helperText}</HelperMessage>}
          {validationText && <ValidationMessage>{validationText}</ValidationMessage>}
        </div>
      )}
    </Group>
  );
}
