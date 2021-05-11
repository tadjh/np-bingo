import React from 'react';

export type TooltipDirection = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  isHovered?: boolean;
  direction?: TooltipDirection;
  disabled?: boolean;
}

export default function Tooltip({
  className = '',
  isHovered = false,
  direction = 'right',
  disabled = false,
  children,
}: TooltipProps): JSX.Element | null {
  function tooltip() {
    switch (direction) {
      case 'top':
        return 'tooltip-t left-2/4 -translate-x-2/4 bottom-full mb-1.5';
      case 'right':
        return 'tooltip-r top-2/4 -translate-y-2/4 left-full ml-1.5';
      case 'bottom':
        return 'tooltip-b left-2/4 -translate-x-2/4 top-full mt-1.5';
      case 'left':
        return 'tooltip-l top-2/4 -translate-y-2/4 right-full mr-1.5';
      default:
        throw new Error('Error in tooltip switch');
    }
  }

  function tooltipArrow() {
    switch (direction) {
      case 'top':
        return 'left-2/4 -translate-x-2/4 top-full -translate-y-1.5 border-r border-b rounded-br-sm';
      case 'right':
        return 'top-2/4 -translate-y-2/4 right-full translate-x-1.5 border-b border-l rounded-bl-sm';
      case 'bottom':
        return 'left-2/4 -translate-x-2/4 bottom-full translate-y-1.5 border-l border-t rounded-tl-sm';
      case 'left':
        return 'top-2/4 -translate-y-2/4 left-full -translate-x-1.5 border-t border-r rounded-tr-sm';
      default:
        throw new Error('Error in tooltip switch');
    }
  }

  if (disabled) return null;
  return (
    <span
      className={`${tooltip()} absolute px-2.5 py-2 transform rounded-sm shadow-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-opacity-70 border-gray-300 dark:border-gray-600 border text-xs font-mono font-bold leading-normal transition-opacity delay-300 whitespace-nowrap box-content z-50 ${
        !isHovered ? 'opacity-0 invisible' : ''
      } ${className}`}
    >
      <span
        className={`${tooltipArrow()} absolute box-content h-3 w-3 transform rotate-45 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600`}
      ></span>
      {children}
    </span>
  );
}
