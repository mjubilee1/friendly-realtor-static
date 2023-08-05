import React from 'react';
import { ActionRowProps } from './ActionRowTypes';

export function ActionRow(props: ActionRowProps) {
  const { children, className = '' } = props;

  return (
    <div
      className={`${className} flex items-center content-center gap-4 flex-row justify-end mt-4 w-full`}
    >
      {children}
    </div>
  );
}
