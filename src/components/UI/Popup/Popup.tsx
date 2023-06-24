import React from 'react';
import { PopupProps } from './PopupTypes';

export const Popup = (props: PopupProps) => {
  const { message, onClose } = props;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{message}</h2>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
