import React from 'react';

export interface IconButtonbaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  component?: React.ComponentType<any>;
  disabled?: boolean;
}

// TODO Improve Typing

export default function IconButtonBase({
  component: Component,
  children,
  ...props
}: IconButtonbaseProps): JSX.Element {
  if (Component) return <Component {...props}></Component>;
  return <button {...props}>{children}</button>;
}
