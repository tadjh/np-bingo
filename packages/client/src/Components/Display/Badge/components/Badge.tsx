import React from 'react';
import { BadgeColors } from '..';
import Tooltip from '../../Tooltip';
import { useBadge } from '../hooks';

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
  disabled = false,
  ...props
}: BadgeProps): JSX.Element {
  const [backgroundColor] = useBadge(color, disabled);
  return (
    <div
      className={[
        'absolute w-7 h-5 -top-2 -right-1 z-20 rounded-full text-white text-opacity-90 text-xs text-center font-mono font-bold leading-normal shadow-md hover:shadow-lg tooltip',
        backgroundColor(),
      ].join(' ')}
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
