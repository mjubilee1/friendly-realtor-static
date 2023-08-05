import React from 'react';
import { IconProp } from '../../Icon/IconTypes';

export type InfoProps = React.PropsWithChildren<{
  icon?: IconProp;
  indent?: boolean;
  noRowMargin?: boolean;
  className?: string;
}>;
