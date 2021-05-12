import React, { useMemo } from 'react';
import { toSlug } from '../../Utils';
import ListBase from '../ListBase';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}

export default function List({ title, children }: ListProps): JSX.Element {
  const id = useMemo(() => toSlug(title), [title]);

  if (title) {
    return (
      <div className="w-full h-full flex flex-col gap-y-1.5">
        <h3
          className="text-lg text-center text-black dark:text-white text-opacity-90 dark:text-opacity-90"
          id={id}
        >
          {title}
        </h3>
        <ListBase aria-labelledby={id}>{children}</ListBase>
      </div>
    );
  }
  return <ListBase>{children}</ListBase>;
}
