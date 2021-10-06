import { HTMLAttributes, useMemo } from 'react';
import { ListBase } from '..';
import { toSlug } from '../../../../utils';

export interface ListBaseWithTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}
export function ListBaseWithTitle({
  title,
  children,
  ...props
}: ListBaseWithTitleProps) {
  const id = useMemo(() => toSlug(title), [title]);

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
