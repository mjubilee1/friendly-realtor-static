import React from 'react';
import { LabelProps } from './LabelTypes';

export default function Labels({ labels }: LabelProps) {
  return (
    <div>
      {labels.map((label) => {
        const { name, color } = label;
        const formattedClassName = `${color} px-3 py-1 rounded-full mr-2 text-white text-sm`;
        return <span className={formattedClassName}>{name}</span>;
      })}
    </div>
  );
}
