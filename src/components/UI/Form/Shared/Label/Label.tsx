import React from 'react';
import { LabelProps } from './LabelTypes';

export const Label = React.forwardRef<HTMLLabelElement | HTMLSpanElement, LabelProps>(
  (props: LabelProps, ref) => {
    const { children, className = '', htmlFor, useSpan, ...restProps } = props;

    return useSpan ? (
      <span className={`${className}`} ref={ref} {...restProps}>
        {children}
      </span>
    ) : (
      <label
        className={`${className}`}
        htmlFor={htmlFor}
        // control, form, htmlFor
        ref={
          // Type guard to make sure a span ref isn't passed in for a label
          ref &&
          Object.prototype.hasOwnProperty.call(ref, 'control') &&
          Object.prototype.hasOwnProperty.call(ref, 'form') &&
          Object.prototype.hasOwnProperty.call(ref, 'htmlFor')
            ? (ref as React.ForwardedRef<HTMLLabelElement>)
            : null
        }
        {...restProps}
      >
        {children}
      </label>
    );
  },
);
