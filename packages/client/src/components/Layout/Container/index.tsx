import React from 'react';
import clsx from 'clsx';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
// TODO make responsive
export default function Container({
  className = '',
  children,
  ...props
}: ContainerProps): JSX.Element {
  return (
    <div
      className={clsx(
        'min-h-screen',
        'sm:min-w-[375px] sm:min-h-[810px] sm:rounded-[38px]',
        'relative flex flex-col bg-gray-100 dark:bg-gray-900', // min-h-screen mt-[30px]
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
