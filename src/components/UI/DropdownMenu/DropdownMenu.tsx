import React, { useState, useRef, useEffect } from 'react';
import { DropdownMenuProps } from './DropdownMenuTypes';

export const DropdownMenu = ({ title, dropdownItems }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  let closeTimeout;

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a delay before closing the dropdown
    closeTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Clear the timeout when the component is unmounted or the state changes
  useEffect(() => {
    return () => {
      clearTimeout(closeTimeout);
    };
  }, [closeTimeout]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="font-ubuntu font-normal cursor-pointer text-[16px] text-white">
        {title}
      </button>
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute py-2 bg-gray-400 text-white rounded shadow-lg z-[1000]"
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
        >
          {dropdownItems.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 overflow-hidden whitespace-nowrap hover:bg-gray-700"
            >
              {item.to ? (
                <a
                  href={item.to}
                  className="block w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              ) : (
                <a href={item.id} className="block w-full">
                  {item.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
