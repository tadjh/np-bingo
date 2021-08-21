import React from 'react';
import clsx from 'clsx';
import Ripple from '../../../../../../components/Feedback/Ripple';
import HeavyBallotXIcon from '../../../../../../assets/icons/HeavyBallotX';
import { useCell } from './hooks';

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
  winner = false,
  disabled = false,
  ...props
}: CellProps): JSX.Element {
  const { isChecked, toggleSfx, handleClick } = useCell(disabled, override);
  return (
    <div
      className={clsx(
        'flex justify-center items-center relative w-[54px] h-[48px] ripple-lighter dark:ripple-darker select-none bg-gray-100 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white text-opacity-90 dark:text-opacity-90 border-2 border-gray-900 dark:border-white dark:border-opacity-5 font-mono font-bold text-xl uppercase transition-colors cursor-pointer overflow-hidden',
        `cell-${index}`,
        `${index === 13 ? 'text-base' : ''}`
      )}
      onClick={handleClick}
      onMouseDown={!winner ? toggleSfx : undefined}
      {...props}
    >
      <Ripple />
      <div className={clsx(override || isChecked ? 'absolute' : 'hidden')}>
        <HeavyBallotXIcon
          size="x-large"
          className={
            winner
              ? 'text-green-600 dark:text-green-500'
              : 'text-red-600 dark:text-red-500'
          }
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
