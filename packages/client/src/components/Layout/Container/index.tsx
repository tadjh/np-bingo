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
        'min-w-[375px] min-h-[810px] relative flex flex-col bg-gray-100 dark:bg-gray-900 shadow-md rounded-[38px]', // min-h-screen mt-[30px]
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
