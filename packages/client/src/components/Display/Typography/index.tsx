import React from 'react';

export interface StatusProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function Typography({
  children,
  ...props
}: StatusProps): JSX.Element {
  return (
    <div className="text-black dark:text-white text-opacity-90 dark:text-opacity-90">
      {children}
    </div>
  );
}
