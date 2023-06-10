import React, { useState } from 'react';
import { ChecklistProps } from './ChecklistTypes';
import { Icon, Button } from '..';

export const Checklist = (props: ChecklistProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed z-[250] left-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-r-lg shadow-lg ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {isOpen ? (
        <>
          <div className="flex items-center justify-between mb-2 text-black">
            <h2 className="text-xl font-bold">Buyer's Checklist</h2>
            <Button onClick={handleToggle} type="button" color="" className="!p-0 !m-0">
              <Icon name="x" color="black" size="xlarge" />
            </Button>
          </div>
          <ul>
            <li className="text-black flex items-center mb-2 gap-2">
              <Icon name="check" color="black" size="large" className="w-6" />
              <span className="max-w-[11rem]">Get pre-approved for a mortgage.</span>
            </li>
            <li className="text-black flex items-center mb-2 gap-2">
              <Icon name="check" color="black" size="large" />
              <span className="max-w-[11rem]">Find a real estate agent.</span>
            </li>
            <li className="text-black flex items-center mb-2 gap-2">
              <Icon name="check" color="black" size="large" />
              <span className="max-w-[11rem]">Search for properties that meet your criteria.</span>
            </li>
            <li className="text-black flex items-center mb-2 gap-2">
              <Icon name="check" color="black" size="large" />
              <span className="max-w-[11rem]">Negotiate and finalize the purchase agreement.</span>
            </li>
          </ul>
        </>
      ) : (
        <Button
          onClick={handleToggle}
          type="button"
          color=""
          className="bg-white border border-black rounded-full !p-0 !m-0"
        >
          <Icon name="check" color="black" size="xlarge" />
        </Button>
      )}
    </div>
  );
};
