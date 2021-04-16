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
  return (
    <div
      className={[
        'grid-item',
        `grid-item-${index}`,
        crossmark && 'crossmark',
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
