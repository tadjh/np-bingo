import React from 'react';
import Ripple from '../../Ripple';
import { useButton } from './hooks';

export type ButtonVariants = 'contained';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  component?: any;
  to?: string;
  disabled?: boolean;
}

export default function Button({
  variant = 'contained',
  component: Component,
  className,
  children,
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps): JSX.Element {
  const [buttonPressSfx, buttonSyle] = useButton(variant, disabled);

  const buttonClasses = [
    'relative px-6 py-2 rounded-full transition focus:outline-none hover:shadow-xl overflow-hidden ripple-lighter dark:ripple-darker',
    buttonSyle,
    className,
  ].join(' ');

  if (Component)
    return (
      <Component
        className={buttonClasses}
        disabled={disabled}
        onMouseDown={buttonPressSfx}
        {...props}
      >
        <Ripple disabled={disabled} />
        {children}
      </Component>
    );
  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      type={type}
      onMouseDown={buttonPressSfx}
      {...props}
    >
      <Ripple disabled={disabled} />
      {children}
    </button>
  );
}
