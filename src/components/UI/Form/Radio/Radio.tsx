import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '../Shared/Group';
import { Label } from '../Shared/Label';
import { RadioProps } from './RadioTypes';

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>((props: RadioProps, ref) => {
  const { name, labelClassName, className, label, hideLabel, options = [], ...restProps } = props;
  // If an id is not provided, generate one to explicitly bind the label to the input
  const radioGroupName = name || uuidv4();

  return (
    <Group noGutter={hideLabel}>
      <Label hidden={hideLabel} className={` ${labelClassName}`}>
        {label}
      </Label>
      <div className={`form-check ${className}`}>
        {options.map(({ name: radioName, value, checked }) => (
          <div key={radioName} className="flex gap-4">
            <input
              key={radioName}
              id={radioName}
              value={value}
              type="radio"
              defaultChecked={checked}
              name={radioGroupName}
              ref={ref}
              {...restProps}
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label className="font-medium m-0 transition p-0" htmlFor={radioName}>
              {radioName}
            </label>
          </div>
        ))}
      </div>
    </Group>
  );
});
