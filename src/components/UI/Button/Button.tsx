import React, { forwardRef } from 'react';
import Icon from '../Icon/Icon';
import { ButtonProps } from './ButtonTypes';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    type = 'button',
    color,
    children,
    icon,
    iconOnly,
    className,
    onClick,
    loading,
    href,
    target,
    disabled,
    size,
  }: ButtonProps) => {
    const btnType = type === 'submit' ? 'submit' : 'button';
    let btnSize = '';
    let fontSize = '';
    let btnBgColor = '';
    let btnBgColorHover = '';
    switch (size) {
      case 'large':
        btnSize = 'py-2 px-6 gap-4';
        fontSize = 'text-lg';
        break;
      case 'none':
        btnSize = 'px-0 py-0 mx-0 my-0';
        fontSize = 'text-base';
        break;
      default:
        btnSize = 'py-1 px-4 gap-2';
        fontSize = 'text-sm';
    }

    switch (color) {
      case 'primary':
        btnBgColor = 'bg-primary text-white';
        btnBgColorHover = 'hover:bg-primary-light';
        break;
      case 'secondary':
        btnBgColor = 'bg-blue-500';
        btnBgColorHover = 'hover:bg-blue-400';
        break;
      case 'blue':
        btnBgColor = 'bg-endeavors-blue-700 text-white';
        btnBgColorHover = 'hover:bg-endeavors-blue-600';
        break;
      case 'gray':
        btnBgColor = 'bg-endeavors-gray-400 text-white';
        btnBgColorHover = 'hover:bg-endeavors-gray-300';
        break;
      case 'green':
        btnBgColor = 'bg-endeavors-green-500 text-white';
        btnBgColorHover = 'hover:bg-endeavors-green-400';
        break;
      case 'red':
        btnBgColor = 'bg-endeavors-red-400 text-white';
        btnBgColorHover = 'hover:bg-endeavors-red-300';
        break;
      case 'black':
        btnBgColor = 'bg-endeavors-gray-400';
        btnBgColorHover = 'hover:bg-endeavors-gray-300';
        break;
      case 'transparent':
        btnBgColor = 'bg-transparent';
        break;
      default:
        btnBgColor = 'bg-endeavors-blue-700 text-white';
        btnBgColorHover = 'hover:bg-endeavors-blue-600';
    }

    const handleClick = () => {
      if (href) {
        // we want to always pass in noopener norefer if href to protect against xss
        window.open(href, target || '_self', 'noopener norefer');
      } else if (onClick) {
        onClick();
      }
    };

    const disabledClass = disabled ? 'opacity-50' : 'cursor-pointer';
    const formattedClassName = className || '';
    const buttonSize = iconOnly ? 'p-1' : `${btnSize} ${fontSize}`;
    const combinedClassNames = `leading-5 tracking-tight border-sm text-center ${formattedClassName} ${btnBgColor} ${buttonSize} ${!disabled} ${btnBgColorHover} ${disabledClass}`;
    const onClickProp = !disabled && !!handleClick ? { onClick: handleClick } : {};
    return (
      <button
        type={btnType}
        disabled={disabled}
        className={`${combinedClassNames} focus:outline-none bg-center items-center cursor-pointer shadow-xs rounded-full`}
        {...onClickProp}
      >
        {icon && !loading && iconOnly ? (
          <Icon
            name={icon.name}
            color={icon.color}
            solid={icon.solid}
            size={icon.size}
            className={`${icon.className || ''}`}
          />
        ) : null}
        {icon && !loading && icon.position === 'left' && (
          <Icon
            name={icon.name}
            color={icon.color}
            solid={icon.solid}
            size={icon.size}
            className={`${icon.className || ''}`}
          />
        )}
        <div className="flex items-center mx-auto gap-2">
          {children}
          {loading && <Icon name="spinner" color="white" size="large" />}
        </div>
      </button>
    );
  },
);

export default Button;
