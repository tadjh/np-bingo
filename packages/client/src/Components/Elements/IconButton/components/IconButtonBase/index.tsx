import React from 'react';

export interface IconButtonbaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  component?: React.ComponentType<any>;
  disabled?: boolean;
}

export default function IconButtonBase({
  component: Component,
  children,
  ...props
}: IconButtonbaseProps): JSX.Element {
  if (Component) return <Component {...props}></Component>;
  return <button {...props}>{children}</button>;
}
