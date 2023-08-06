import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Icon from '../../Icon';
import { FormTextProps } from './TextTypes';
import { Group } from '../Shared/Group';
import { Label } from '../Shared/Label';
import { ValidationMessage } from '../Shared/ValidationMessage';
import { HelperMessage } from '../Shared/HelperMessage/HelperMessage';

export const FormText = React.forwardRef<HTMLInputElement, FormTextProps>(
  (props: FormTextProps, ref) => {
    const {
      className,
      labelClassName,
      labelIcon,
      helperClassName,
      helperText,
      validationClassName,
      hideLabel,
      id,
      label,
      type = 'text',
      validationText,
      value,
      error,
      maskSSN = false,
      ...restProps
    } = props;

    // If an id is not provided, generate one to explicitly bind the label to the input
    const fieldId = uuidv4() || id;
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const formatSsn = (ssn: string | null | undefined) => {
      return !ssn
        ? ''
        : ssn
            .replace(/[^\d\*]/g, '')
            .replace(/(?=\d{6})\d/, '*')
            .slice(0, 9);
    };

    return (
      <Group noGutter={hideLabel}>
        <div className="flex justify-between items-center">
          <Label htmlFor={fieldId} hidden={hideLabel} className={labelClassName}>
            {label}
          </Label>
          <div>{labelIcon}</div>
        </div>
        <div className={`${className} flex justify-end relative`}>
          {maskSSN ? (
            <input
              {...restProps}
              value={formatSsn(value)}
              type="text"
              className="block w-full rounded-lg text-black px-4 outline-0"
            />
          ) : (
            <input
              {...restProps}
              className="block w-full rounded-lg text-black px-4 outline-0"
              id={fieldId}
              ref={ref}
              type={type !== 'password' ? type : showPassword ? 'text' : 'password'}
            />
          )}
          {type === 'password' && (
            <button
              className="absolute pr-4 top-2 bg-transparent"
              onClick={toggleShowPassword}
              type="button"
            >
              <Icon name="eye" color="black" size="large" />
            </button>
          )}
        </div>
        <div className="relative flex-grow">
          {(helperText || validationText) && (
            <div className="mt-4">
              {helperText && (
                <HelperMessage className={helperClassName}>{helperText}</HelperMessage>
              )}
              {validationText && (
                <ValidationMessage className={validationClassName}>
                  {validationText}
                </ValidationMessage>
              )}
            </div>
          )}
          {error && <span className="text-red-500">{error.message || 'This is Required'}</span>}
        </div>
      </Group>
    );
  },
);

export default FormText;
