import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { Theme } from '@np-bingo/types';
export interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  theme: Theme;
}
export function Wrapper({
  children,
  theme,
  ...props
}: WrapperProps): JSX.Element {
  return (
    <div
      id="App"
      className={clsx(
        'sm:relative sm:flex sm:justify-center sm:items-center sm:min-h-screen overflow-hidden',
        theme
      )}
    >
      {children}
    </div>
  );
}
