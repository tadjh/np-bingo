import React from 'react';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export default function Footer({
  className = '',
  children,
  ...props
}: FooterProps): JSX.Element {
  return (
    <footer
      className={['flex flex-col items-center z-10 p-5', className].join(' ')}
      {...props}
    >
      {children}
    </footer>
  );
}
