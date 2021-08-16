import React from 'react';
import IconButtonBase from '../IconButtonBase';
import Ripple from '../../Ripple';
import Tooltip, { TooltipDirection } from '../Tooltip';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  description?: string;
  direction?: TooltipDirection;
  isHovered?: boolean;
  component?: React.ComponentType<any>;
  to?: string;
}
// TODO Improve typing for handling router link

export default function IconButton({
  className = '',
  children,
  disabled,
  description = '',
  direction,
  isHovered,
  component: Component,
  ...props
}: IconButtonProps): JSX.Element {
  return (
    <div className="relative tooltip">
      {description !== '' && (
        <Tooltip
          isHovered={isHovered}
          direction={direction}
          disabled={disabled}
        >
          {description}
        </Tooltip>
      )}
      <IconButtonBase
        className={`relative tooltip bg-transparent rounded-full p-2 transition ripple-lighter dark:ripple-darker focus:outline-none overflow-hidden ${
          !disabled
            ? 'hover:bg-gray-900 dark:hover:bg-white hover:bg-opacity-10 dark:hover:bg-opacity-10 hover:shadow-xl dark:hover:shadow-xl'
            : 'cursor-default'
        } ${className}`}
        disabled={disabled}
        {...props}
      >
        <Ripple disabled={disabled} />
        {children}
      </IconButtonBase>
    </div>
  );
}
