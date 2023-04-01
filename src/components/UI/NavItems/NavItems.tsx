/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Button } from '..';
import { NavItemsProps } from './NavItemsTypes';

export default function NavItems({ items, containerClassNames, classNames }: NavItemsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <div className="bg-endeavors-gray-700 rounded-lg p-8">
      <ul className={`flex flex-wrap justify-between mb-4 ${containerClassNames}`}>
        {items &&
          items.length &&
          items.map((item, idx) => {
            const { label } = item;
            return (
              <li className="flex flex-wrap flex-col justify-center">
                <Button type="button" color="transparent" className={`${classNames} cursor-pointer rounded-none ${activeIdx === idx && '!border-endeavors-blue-600 border-b-2'}`}>
                  <div onClick={() => setActiveIdx(idx)} className="text-lg font-light uppercase text-endeavors-gray-100">
                    {label}
                  </div>
                </Button>
              </li>
            );
          })}
      </ul>
      <div>{items[activeIdx].children}</div>
    </div>
  );
}
