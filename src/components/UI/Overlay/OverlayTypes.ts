import { ReactNode } from 'react';

export type OverlayProps = {
  children: ReactNode;
  dismiss: () => void;
  open: boolean;
  maxWidth: string;
  omitPadding?: boolean;
  duration?: string;
  // ALWAYS add an aria label or aria labelled by
  ariaLabel?: string;
  ariaLabelledBy?: string;
  omitDismissX?: boolean;
};
