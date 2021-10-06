import React from 'react';
import clsx from 'clsx';
import { TooltipDirection } from '..';
import { useTooltip } from '../hooks';

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
  const [box, arrow] = useTooltip(direction);

  if (disabled || children === '') return null;
  return (
    <span
      className={clsx(
        box(),
        'absolute px-2.5 py-2 transform rounded-sm shadow-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-opacity-70 border-gray-300 dark:border-gray-600 border text-xs font-mono font-bold leading-normal whitespace-nowrap box-content group-hover:visible',
        !isHovered && 'opacity-0 invisible',
        className
      )}
    >
      <span
        className={clsx(
          arrow(),
          'absolute box-content h-3 w-3 transform rotate-45 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
        )}
      ></span>
      {children}
    </span>
  );
}
