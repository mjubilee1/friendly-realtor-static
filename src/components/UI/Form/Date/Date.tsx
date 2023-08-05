import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DateTimePicker from 'react-datetime-picker';
import { DateProps } from './DateTypes';
import { Group } from '../Shared/Group';
import { Label } from '../Shared/Label';
import { ValidationMessage } from '../Shared/ValidationMessage';
import { HelperMessage } from '../Shared/HelperMessage/HelperMessage';
import './dateStyles.css';

export function Date(props: DateProps) {
  const {
    className,
    labelClassName,
    helperClassName,
    helperText,
    validationClassName,
    hideLabel,
    id,
    label,
    validationText,
    ...restProps
  } = props;

  // If an id is not provided, generate one to explicitly bind the label to the input
  const fieldId = uuidv4() || id;

  return (
    <Group noGutter={hideLabel} className="w-full">
      <Label htmlFor={fieldId} hidden={hideLabel} className={labelClassName}>
        {label}
      </Label>
      <div className={`bg-white ${className || ''} border-none rounded-lg`}>
        <DateTimePicker
          {...restProps}
          disableClock
          yearPlaceholder="yyyy"
          monthPlaceholder="mm"
          dayPlaceholder="dd"
          hourPlaceholder="hh"
          minutePlaceholder="mm"
          className="w-full"
        />
      </div>
      <div className="relative flex-grow">
        {(helperText || validationText) && (
          <div className="mt-4">
            {helperText && <HelperMessage className={helperClassName}>{helperText}</HelperMessage>}
            {validationText && (
              <ValidationMessage className={validationClassName}>
                {validationText}
              </ValidationMessage>
            )}
          </div>
        )}
      </div>
    </Group>
  );
}
