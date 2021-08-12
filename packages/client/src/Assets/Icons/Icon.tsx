import React from 'react';

export interface IconProps {
  className?: string;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'medium-2' | 'large';
  viewBox?: string;
}

export default function Icon({
  className = '',
  children,
  size = 'medium',
  viewBox = '0 0 20 20',
}: IconProps) {
  function iconSize() {
    switch (size) {
      case 'small':
        return 'h-5, w-5';
      case 'medium':
        return 'h-7, w-7';
      case 'medium-2':
        return 'h-9, w-9';
      case 'large':
        return 'h-10, w-10';
      default:
        return 'h-7 w-7';
    }
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={[iconSize(), className].join(' ')}
      fill="currentColor"
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
}
