import React from 'react';

export interface MainProps extends React.HTMLAttributes<HTMLElement> {}

export default function Main({
  className = '',
  children,
  ...props
}: MainProps): JSX.Element {
  return (
    <main
      role="main"
      className={['flex flex-col items-center z-10 p-5', className].join(' ')}
      {...props}
    >
      {children}
    </main>
  );
}
