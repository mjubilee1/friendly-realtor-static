import { ReactNode } from 'react';
import { PositionOptions } from '../../../models';

export type TooltipProps = {
  theme?: 'dark' | 'light' | 'transparent';
  arrow?: boolean;
  content: string;
  triggerContent?: string;
  children?: ReactNode;
  // checky tippy docs... i.e. mouseenter
  trigger?: string;
  position?: PositionOptions;
  disabled?: boolean;
  omitTabIndex?: boolean;
  interactive?: boolean;
  maxWidth?: number;
  useOnShow?: boolean;
  padded?: boolean;
  delay?: number;
};
