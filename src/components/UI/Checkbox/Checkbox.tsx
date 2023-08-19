import React, { useEffect, useRef, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CheckboxProps } from './CheckboxTypes';
import Icon from '../Icon';

function getLabelPosClass(pos): string {
  switch (pos) {
    case 'bottom':
      return 'column';
    case 'top':
      return 'column-reverse';
    case 'left':
      return 'row-reverse';
    default:
      return 'row';
  }
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props: CheckboxProps, ref) => {
  const { checked, className, id, labelIcon, labelText, value, labelPos } = props;
  const fieldId = `${id}_${uuidv4()}`;
  const innerRef = useRef<HTMLInputElement>(null);
  const checkRef = ref ?? innerRef;

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.checked = !!checked;
    }
  }, [checked, innerRef]);

  return (
    <div
      className={`flex flex-row m-0 p-0 relative items-center gap-x-1 ${getLabelPosClass(
        labelPos,
      )}`}
    >
      <input
        checked={checked}
        className={`${className} w-4 h-4 rounded-md text-green-600 cursor-pointer focus:ring-0 focus:shadow-none`}
        id={fieldId}
        ref={checkRef}
        type="checkbox"
      />
      {labelIcon && <Icon name={labelIcon.name} color={labelIcon.color} size={labelIcon.size} />}
      <label className="" htmlFor={fieldId}>
        {labelText}
      </label>
    </div>
  );
});

export default Checkbox;
