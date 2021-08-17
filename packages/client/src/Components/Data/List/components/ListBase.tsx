import React from 'react';

export interface ListBaseProps extends React.HTMLAttributes<HTMLUListElement> {}

export function ListBase({ children, ...props }: ListBaseProps) {
  return (
    <ul className="w-full h-full flex flex-col gap-y-1.5" {...props}>
      {children}
    </ul>
  );
}
