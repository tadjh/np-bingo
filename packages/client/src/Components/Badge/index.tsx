import React from 'react';
import Tooltip from '../Tooltip';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'blue';
  description?: string;
  isHovered?: boolean;
}

export default function Badge({
  color,
  children,
  description = '',
  isHovered = false,
  ...props
}: BadgeProps): JSX.Element {
  function backgroundColor(
    color: BadgeProps['color']
  ): BadgeProps['className'] {
    switch (color) {
      case 'blue':
        return 'bg-blue-bingo hover:bg-blue-900 active:bg-blue-800';
      default:
        return 'bg-gray-700 hover:bg-gray-800 active:bg-gray-600';
    }
  }

  return (
    <div
      className={`absolute w-7 h-5 -top-2 -right-2 z-20 rounded-full text-white text-opacity-90 text-xs text-center font-mono font-bold leading-normal shadow-md hover:shadow-lg tooltip ${backgroundColor(
        color
      )}`}
      {...props}
    >
      {description !== '' && (
        <Tooltip isHovered={isHovered}>{description}</Tooltip>
      )}
      {children}
    </div>
  );
}
