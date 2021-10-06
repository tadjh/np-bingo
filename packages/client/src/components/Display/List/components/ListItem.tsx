import React from 'react';

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export function ListItem({ children, ...props }: ListItemProps): JSX.Element {
  return (
    <li
      className="flex items-center gap-x-3 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 hover:shadow-md rounded-md py-0.5 px-1"
      {...props}
    >
      {children}
    </li>
  );
}
