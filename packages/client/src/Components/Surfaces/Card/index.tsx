import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Card({ children }: CardProps): JSX.Element {
  return (
    <div className="w-full flex flex-col justify-center items-center p-5 rounded-md shadow-md bg-gray-200 dark:bg-gray-800">
      {children}
    </div>
  );
}
