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
    const [rawSSN, setRawSSN] = useState('');
    const [ssn, setSSN] = useState('');

    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const handleChange = (e) => {
      let { name, value } = e.target;

      if (value.replace(/-/g, '').length < rawSSN.length) {
        const last = rawSSN.length - 1;
        setRawSSN(rawSSN.slice(0, last));
        return;
      }

      let numValue = value.replace(/\D/g, '');

      let newSSN = '';
      if (rawSSN.length > 5) {
        // Limit numValue to at most 4 digits when rawSSN.length > 5
        numValue = numValue.slice(0, 4);
        newSSN = rawSSN.slice(0, 5) + numValue;
      } else {
        newSSN = rawSSN + numValue;
      }

      if (newSSN.length > 9) {
        return;
      }

      if (props.onRawSSNChange) {
        props.onRawSSNChange(newSSN);
      }
      setSSN(newSSN);
      setRawSSN(newSSN);
    };

    const format = (v) => {
      v = v.slice(0, 11).replace(/-/g, '');
      if (v.length <= 3) {
        return v;
      }
      if (v.length > 3 && v.length <= 5) {
        return `${v.slice(0, 3)}-${v.slice(3)}`;
      }
      if (v.length > 5) {
        return `${v.slice(0, 3)}-${v.slice(3, 5)}-${v.slice(5)}`;
      }
    };

    const mask = (v) => {
      const masked = v.slice(0, 7).replace(/[0-9]/g, '*');
      const final = masked + v.slice(7);
      return final;
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
              type="text"
              value={mask(format(rawSSN))}
              onChange={handleChange}
              autoComplete="off"
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
