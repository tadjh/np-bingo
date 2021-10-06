import React from 'react';
import clsx from 'clsx';
import { BadgeProps } from '.';
import Tooltip from '../Tooltip';
import { useBadge } from './hooks';

export default function Badge({
  color = 'gray',
  children,
  description = '',
  isHovered = false,
  disabled = false,
  offset = 0,
  ...props
}: BadgeProps): JSX.Element {
  const [backgroundColor, alert] = useBadge(color, offset, disabled);
  return (
    <div
      className={clsx(
        'absolute w-7 h-5 -top-2 -right-1 z-20 rounded-full text-opacity-90 text-xs text-center font-mono font-bold leading-normal shadow-md hover:shadow-lg group',
        backgroundColor()
      )}
      style={{ backgroundPositionY: `${offset}%` }}
      {...props}
    >
      <div
        className={clsx(
          'absolute top-0 right-[-3px] rounded-full w-2 h-2 shadow',
          alert()
        )}
      />
      <Tooltip isHovered={isHovered} disabled={disabled}>
        {description}
      </Tooltip>
      {children}
    </div>
  );
}
