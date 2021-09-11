import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { Theme } from '@np-bingo/types';
import Background from '../../Surfaces/Background';
import Container from '../Container';
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
      <Background variant="phone" />
      <Container>
        <Background />
        <Background variant="top" />
        {children}
      </Container>
    </div>
  );
}
