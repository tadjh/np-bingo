import React from 'react';
import { ListBase } from './ListBase';
import { ListBaseWithTitle } from './ListBaseWithTitle';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}

export default function List({ title, children }: ListProps): JSX.Element {
  if (title) return <ListBaseWithTitle title={title} />;
  return <ListBase>{children}</ListBase>;
}
