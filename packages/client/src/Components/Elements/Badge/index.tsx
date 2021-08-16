import React from 'react';
import Tooltip from '../Tooltip';

export type BadgeColors = 'gray' | 'blue' | 'disabled';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: BadgeColors;
  description?: string;
  isHovered?: boolean;
  disabled?: boolean;
}

export default function Badge({
  color = 'gray',
  children,
  description = '',
  isHovered = false,
  disabled,
  ...props
}: BadgeProps): JSX.Element {
  function backgroundColor(color: BadgeColors): string {
    switch (color) {
      case 'disabled':
        return 'bg-gray-500 dark:bg-gray-600';
      case 'blue':
        return 'bg-blue-bingo hover:bg-blue-900 active:bg-blue-800';
      case 'gray':
        return 'bg-gray-700 hover:bg-gray-800 active:bg-gray-600';
      default:
        throw new Error('Error in Badge background color');
    }
  }

  return (
    <div
      className={`absolute w-7 h-5 -top-2 -right-1 z-20 rounded-full text-white text-opacity-90 text-xs text-center font-mono font-bold leading-normal shadow-md hover:shadow-lg tooltip ${
        !disabled ? backgroundColor(color) : backgroundColor('disabled')
      }`}
      {...props}
    >
      {description !== '' && (
        <Tooltip isHovered={isHovered} disabled={disabled}>
          {description}
        </Tooltip>
      )}
      {children}
    </div>
  );
}
