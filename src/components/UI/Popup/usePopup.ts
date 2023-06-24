import React, { useState } from 'react';

export const usePopup = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const openPopup = (msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return { isOpen, message, openPopup, closePopup };
};
