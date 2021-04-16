import React from 'react';
import './style.css';

export interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  index: number;
  crossmark?: boolean;
  onClick: (event: React.MouseEvent) => void;
}

export default function Cell({
  index = 1,
  crossmark = false,
  children,
  ...props
}: CellProps) {
  const checked = crossmark && 'crossmark';
  return (
    <div
      className={['grid-item', `grid-item-${index}`, checked].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
