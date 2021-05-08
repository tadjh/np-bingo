import React from 'react';

export interface CreditProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement> {
  author?: string;
  link?: string;
}

export default function Credit({
  author,
  link = '',
}: CreditProps): JSX.Element {
  return (
    <React.Fragment>
      <div className="text-black dark:text-white text-opacity-60 dark:text-opacity-40">
        {`Made by ${author}`}
      </div>
      <a
        className="hover:underline text-blue-600 dark:text-white dark:text-opacity-40"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {link}
      </a>
    </React.Fragment>
  );
}
