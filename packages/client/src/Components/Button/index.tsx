import React from 'react';
import Ripple from '../Ripple';

export type ButtonVariants = 'contained';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  component?: any;
  to?: string;
  disabled?: boolean;
}

export default function Button({
  variant,
  component: Component,
  className = '',
  children,
  type = 'button',
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  const baseStyle =
    'relative px-7 py-2 rounded-full transition focus:outline-none hover:shadow-xl overflow-hidden ripple-lighter dark:ripple-darker transform hover:-translate-y-0.5 active:translate-y-0';

  function variantStyle(variant?: ButtonVariants | 'disabled'): string {
    switch (variant) {
      case 'disabled':
        return 'disabled:opacity-50 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:text-gray-800 dark:disabled:text-gray-400 disabled:shadow-none disabled:cursor-default disabled:translate-y-0';
      case 'contained':
        return 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-300 dark:hover:bg-blue-400 text-white dark:text-black text-opacity-90 dark:text-opacity-90';
      default:
        return 'text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-700 hover:bg-gray-200';
    }
  }

  const buttonClasses = `${baseStyle} ${
    !disabled ? variantStyle(variant) : variantStyle('disabled')
  } ${className}`;

  if (Component)
    return (
      <Component className={buttonClasses} disabled={disabled} {...props}>
        <Ripple disabled={disabled} />
        {children}
      </Component>
    );
  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      type={type}
      {...props}
    >
      <Ripple disabled={disabled} />
      {children}
    </button>
  );
}
