/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { DropdownProps } from './DropdownTypes';

export default function Dropdown({ className, dropClassName, dropBackgroundColor, children, button, icon, selected, trigger, id, ariaLabel, disabled, hideIcon }: DropdownProps) {
  if (!id) {
    return null;
  }
  const [openDropDown, setDropDown] = useState<boolean>(false);
  useEffect(() => {
    function clickHandler() {
      setDropDown(false);
    }
    // initiate the event handler
    window.addEventListener('click', clickHandler, true);
    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener('click', clickHandler);
    };
  }, []);
  const display = openDropDown ? 'block' : 'hidden';
  const visibility = openDropDown ? 'visible' : 'invisible';
  const opacity = openDropDown ? 'opacity-100' : 'opacity-0';
  const height = openDropDown ? 'h-auto' : '0';

  function Trigger() {
    const iconClassName = `transition duration-200 transform ${openDropDown ? 'rotate-180' : ''}`;
    const disabledClass = disabled ? 'opacity-50' : 'cursor-pointer';
    const onClickProp = disabled ? () => null : () => setDropDown(!openDropDown);
    if (button) {
      return (
        <Button
          type={button.type}
          text={button.text}
          color={button.color}
          icon={icon}
          disabled={disabled}
          className={button.className}
          loading={button.loading}
          onClick={onClickProp}
        >
          {button.children}
        </Button>
      );
    }
    if (trigger) {
      return (
        <div onClick={onClickProp} className={`flex items-center justify-between cursor-pointer text-sm px-6 py-2 gap-4 ${disabled ? disabledClass : ''}`}>
          <span>{trigger}</span>
          {!hideIcon && (
            <span>
              {icon ? (
                <Icon name={icon.name} color={icon.color} solid={icon.solid} size="small" className={`${icon.className || ''} ml-2`} />
              ) : (
                <Icon name="chevron-down" size="medium" color="white" className={iconClassName} />
              )}
            </span>
          )}
        </div>
      );
    }

    return (
      <p onClick={onClickProp} className="cursor-pointer">
        {selected}
      </p>
    );
  }

  return (
    <div
      id={id}
      className={`relative inline-block top-0 rounded-full border-2 border-gray-300 ${dropBackgroundColor || 'bg-transparent'} border-none ${className || ''}`}
      aria-label={ariaLabel}
    >
      <Trigger />
      <div className={`z-30 transition duration-200 overflow-hidden absolute right-0 shadow-xs w-full ${visibility} ${opacity} ${height} ${display} ${dropClassName || ''}`}>
        {children}
      </div>
    </div>
  );
}
