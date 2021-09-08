import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import IconButtonBase from '../IconButtonBase';
import Tooltip, { TooltipDirection } from '../../../../Display/Tooltip';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  description?: string;
  direction?: TooltipDirection;
  isHovered?: boolean;
  component?: any;
  to?: string;
  className?: string;
  disabled?: boolean;
}
// TODO Improve typing for handling router link

export default function IconButton({
  className = '',
  children,
  disabled = false,
  description,
  direction,
  isHovered,
  ...props
}: IconButtonProps): JSX.Element {
  return (
    <div className="relative tooltip">
      {description && (
        <Tooltip
          isHovered={isHovered}
          direction={direction}
          disabled={disabled}
        >
          {description}
        </Tooltip>
      )}
      <IconButtonBase
        className={clsx(
          'relative tooltip bg-transparent rounded-full p-1.5 transition ripple-lighter dark:ripple-darker focus:outline-none overflow-hidden',
          !disabled
            ? 'hover:bg-gray-900 dark:hover:bg-white hover:bg-opacity-10 dark:hover:bg-opacity-10 hover:shadow-xl dark:hover:shadow-xl'
            : 'cursor-default',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </IconButtonBase>
    </div>
  );
}
