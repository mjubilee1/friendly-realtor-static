import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SwitchProps } from './SwitchTypes';

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>((props: SwitchProps, ref) => {
  const { id, checked, className, label, ...restProps } = props;
  // If an id is not provided, generate one to explicitly bind the label to the input
  const fieldId = id || uuidv4();
  const labelText = useMemo(() => {
    switch (typeof label) {
      case 'boolean':
        return checked ? 'Enabled' : 'Disabled';
      case 'object':
        return checked ? label.enabled : label.disabled;
      case 'string':
      default:
        return label;
    }
  }, [label, checked]);

  return (
    <label htmlFor={fieldId} className="relative flex items-center cursor-pointer gap-2">
      <input
        id={fieldId}
        className="sr-only peer"
        checked={checked}
        ref={ref}
        type="checkbox"
        {...restProps}
      />
      <div
        className={`${className} h-6 bg-gray-200 border-2 border-gray-200 rounded-full w-11 after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:h-5 after:w-5 after:shadow-sm after:rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-blue-600 peer-checked:border-blue-600 after:transition-all after:duration-300`}
      />
      {label ? <span>{labelText}</span> : null}
    </label>
  );
});

export default Switch;
