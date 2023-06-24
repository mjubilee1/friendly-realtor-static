import React from 'react';
import { PopupProps } from './PopupTypes';

export const Popup = (props: PopupProps) => {
  const { message, onClose } = props;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-primary p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{message}</h2>
          <button
            aria-label="Close"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
