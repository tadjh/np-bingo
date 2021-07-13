import React from 'react';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export default function Header({
  className = '',
  children,
  ...props
}: HeaderProps): JSX.Element {
  return (
    <header
      className={['flex justify-center z-10 p-5', className].join(' ')}
      {...props}
    >
      {children}
    </header>
  );
}
