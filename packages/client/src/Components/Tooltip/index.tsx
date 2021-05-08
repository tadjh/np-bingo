import React from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  isHovered?: boolean;
}

export default function Tooltip({
  isHovered = false,
  className = '',
  children,
}: TooltipProps): JSX.Element {
  return (
    <span
      className={`tooltip-t absolute -top-2 -left-1.5 p-2 transform -translate-y-full rounded-sm shadow-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-opacity-70 border-gray-300 dark:border-gray-600 border text-xs font-mono font-bold leading-normal transition-opacity delay-300 whitespace-nowrap ${
        !isHovered ? 'opacity-0' : ''
      }${className}`}
    >
      <span className="absolute box-content border-br bottom-2 left-2.5 h-4 w-4 transform translate-y-full rotate-45 rounded-br-sm bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"></span>
      {children}
    </span>
  );
}
