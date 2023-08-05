import React from 'react';
import { ValidationMessageProps } from './ValidationMessageTypes';

export const ValidationMessage = React.forwardRef<HTMLSpanElement, ValidationMessageProps>(
  (props: ValidationMessageProps, ref) => {
    const { children, className, ...restProps } = props;
    return (
      <span {...restProps} className={`${className}`} ref={ref}>
        {children}
      </span>
    );
  },
);
