import React from 'react';
import NumberFormat from 'react-number-format';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '../Shared/Group';
import { HelperMessage } from '../Shared/HelperMessage';
import { FormNumberProps } from './NumberType';
import { Label } from '../Shared/Label';
import { ValidationMessage } from '../Shared/ValidationMessage';

export const FormNumber = React.forwardRef<HTMLInputElement, FormNumberProps>(
  (props: FormNumberProps, ref) => {
    const {
      className,
      helperText,
      hideLabel,
      id,
      label,
      validationText,
      type,
      thousandsGroupStyle,
      prefix,
      placeholder,
      decimalSeparator,
      displayType,
      thousandSeparator,
      decimalScale,
      fixedDecimalScale,
      allowEmptyFormatting,
      onValueChange,
      value,
      defaultValue,
      isAllowed,
      format,
      allowNegative,
      mask,
      ...restProps
    } = props;
    // If an id is not provided, generate one to explicitly bind the label to the input
    const fieldId = uuidv4() || id;

    return (
      <Group noGutter={hideLabel} className="flex gap-4">
        <div className="flex flex-col justify-center">
          <Label hidden={hideLabel} htmlFor={fieldId}>
            {label}
          </Label>
        </div>
        <NumberFormat
          id={fieldId}
          getInputRef={ref}
          className={`${className}`}
          thousandsGroupStyle={thousandsGroupStyle}
          placeholder={placeholder}
          prefix={prefix}
          decimalSeparator={decimalSeparator}
          displayType={displayType}
          type={type}
          value={value}
          defaultValue={defaultValue}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowEmptyFormatting={allowEmptyFormatting}
          onValueChange={onValueChange}
          isAllowed={isAllowed}
          format={format}
          allowNegative={allowNegative}
          mask={mask}
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
export default FormNumber;
