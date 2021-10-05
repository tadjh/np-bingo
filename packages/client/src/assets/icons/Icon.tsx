import React, { SVGProps } from 'react';
import clsx from 'clsx';

export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  children?: React.ReactNode;
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
  viewBox?: string;
}

export default function Icon({
  children,
  size = 'medium',
  viewBox = '0 0 20 20',
  className,
  ...props
}: IconProps) {
  function iconSize() {
    switch (size) {
      case 'x-small':
        return 'h-4 w-4';
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
      className={clsx(
        iconSize(),
        className ||
          'text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60'
      )}
      fill="currentColor"
      viewBox={viewBox}
      {...props}
    >
      {children}
    </svg>
  );
}
