import React from 'react';

export interface IconProps {
  className?: string;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'x-large';
  viewBox?: string;
}

export default function Icon({
  children,
  size = 'medium',
  viewBox = '0 0 20 20',
  className,
}: IconProps) {
  function iconSize() {
    switch (size) {
      case 'small':
        return 'h-5 w-5';
      case 'medium':
        return 'h-7 w-7';
      case 'large':
        return 'h-10 w-10';
      case 'x-large':
        return 'h-12 w-12';
      default:
        return 'h-7 w-7';
    }
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={[
        iconSize(),
        className === undefined
          ? 'text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60'
          : '',
      ].join(' ')}
      fill="currentColor"
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
}
