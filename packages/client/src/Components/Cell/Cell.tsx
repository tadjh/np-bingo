import React, { useState } from 'react';
import './style.css';

export interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  className?: string;
  index: number;
  onClick: (event: React.MouseEvent) => void;
  checked?: boolean;
  disabled?: boolean;
}

export default function Cell({
  index = 1,
  children,
  checked: override,
  onClick,
  className,
  disabled,
  ...props
}: CellProps) {
  const [checked, setChecked] = useState(false);
  const eventHandler = (event: React.MouseEvent) => {
    if (disabled) {
      return;
    }
    setChecked((prevCheck) => !prevCheck);
    onClick(event);
  };
  // TODO override may need work
  return (
    <div
      className={[
        'grid-item',
        `grid-item-${index}`,
        (override || checked) && 'checked',
        className && className,
      ].join(' ')}
      onClick={eventHandler}
      {...props}
    >
      {children}
    </div>
  );
}
