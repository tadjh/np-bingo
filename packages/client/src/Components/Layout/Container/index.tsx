import React from 'react';
import clsx from 'clsx';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Container({
  className = '',
  children,
  ...props
}: ContainerProps): JSX.Element {
  return (
    <div
      className={clsx(
        'max-w-md mx-auto relative flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
