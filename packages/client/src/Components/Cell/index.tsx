import React, { useEffect, useState } from 'react';
import Ripple from '../Ripple';
import './style.css';

export interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  winner: boolean;
  index: number;
  checked?: boolean;
  disabled?: boolean;
}

export default function Cell({
  index = 1,
  children,
  checked: override,
  onClick,
  winner = false,
  disabled,
  ...props
}: CellProps): JSX.Element {
  const [checked, setChecked] = useState(false);

  const eventHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (disabled) return;
    setChecked((prevCheck) => !prevCheck);
    onClick && onClick(event);
  };

  /**
   * Force cells checked on win with override
   */
  useEffect(() => {
    if (override === undefined) return;
    setChecked(false);
  }, [override]);

  return (
    <div
      className={[
        'flex justify-center items-center relative w-16 h-14 ripple-lighter dark:ripple-darker select-none bg-gray-100 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white text-opacity-90 dark:text-opacity-90 border-2 border-gray-900 dark:border-white dark:border-opacity-5 font-mono font-bold text-2xl uppercase transition-colors cursor-pointer',
        `cell-${index}`,
      ].join(' ')}
      onClick={eventHandler}
      {...props}
    >
      <Ripple />
      <div
        className={[
          override || checked ? 'absolute -bottom-2 text-7xl' : 'hidden',
          winner
            ? 'text-green-600 dark:text-green-500'
            : 'text-red-600 dark:text-red-500',
        ].join(' ')}
      >
        &#10008;
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
