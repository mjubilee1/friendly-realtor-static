import React from 'react';
import { Popover } from '@headlessui/react';
import { PopoverProps } from './PopoverTypes';

export default function PopoverItem({ className, children, element }: PopoverProps) {
  return (
    <Popover className={`relative ${className}`}>
      <Popover.Button>{element}</Popover.Button>

      <Popover.Panel className="absolute z-10">{children}</Popover.Panel>
    </Popover>
  );
}
