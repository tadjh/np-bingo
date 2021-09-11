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
      id="container"
      className={clsx(
        'min-h-screen overflow-hidden',
        'sm:min-w-[376px] sm:min-h-[810px] sm:rounded-[38px]',
        'relative flex flex-col px-3 bg-gray-100 dark:bg-gray-900', // min-h-screen mt-[30px]
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
