import React from 'react';
import { HelperMessageProps } from './HelperMessageTypes';

export const HelperMessage = React.forwardRef<HTMLSpanElement, HelperMessageProps>(
  (props: HelperMessageProps, ref) => {
    const { children, className, ...restProps } = props;
    return (
      <span {...restProps} className={`${className}`} ref={ref}>
        {children}
      </span>
    );
  },
);
