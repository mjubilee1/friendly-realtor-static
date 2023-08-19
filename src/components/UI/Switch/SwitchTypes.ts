import React from 'react';

export type SwitchStyleProps = {
  label?: boolean | string | { enabled: string; disabled: string };
};

export type SwitchProps = SwitchStyleProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;
