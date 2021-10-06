import React from 'react';

export interface TypographyProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}
// TODO Add Typography.stories
export default function Typography({
  className,
  children,
  ...props
}: TypographyProps): JSX.Element {
  return (
    <div
      className={
        className ||
        'text-black dark:text-white text-opacity-90 dark:text-opacity-90'
      }
      {...props}
    >
      {children}
    </div>
  );
}
