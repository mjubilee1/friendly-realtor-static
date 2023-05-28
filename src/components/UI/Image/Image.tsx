import React from 'react';
import { ImageProps } from './ImageTypes';

// Get the size className
function getSizeClassName(size: string) {
  switch (size) {
    case 'xsmall':
      return 'w-1 h-1';
    case 'small':
      return 'w-2 h-2';
    case 'medium':
      return 'w-4 h-4';
    case 'large':
      return 'w-6 h-6';
    case 'xlarge':
      return 'w-8 h-8';
    case '2xlarge':
      return 'w-12 h-12';
    case '3xlarge':
      return 'w-16 h-16';
    case '4xlarge':
      return 'w-20 h-20';
    default:
      return size;
  }
}

export const Image = ({
  id,
  src,
  alt,
  className,
  onClick,
  circle,
  size,
  ariaLabel,
  omitMarginAuto,
  marginBottom,
}: ImageProps) => {
  let defaultStyles = '';
  defaultStyles = circle ? 'rounded-full border-primary-500 border-2 p-1 ' : '';
  if (size) {
    defaultStyles += getSizeClassName(size);
  } else {
    defaultStyles += 'h-32 w-32';
  }

  if (!omitMarginAuto) {
    defaultStyles += ' m-auto';
  }
  // if we have onClick, wrap image in button and provide aria-label (accessibility), else return just the image
  return onClick ? (
    <button onClick={onClick} aria-label={ariaLabel || ''}>
      <img id={id} src={src} className={`inline-block ${defaultStyles} ${className}`} alt={alt} />
    </button>
  ) : (
    <img
      src={src}
      className={`inline-block ${defaultStyles} ${marginBottom} ${className}`}
      alt={alt}
    />
  );
};
