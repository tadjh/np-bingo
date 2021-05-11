import React from 'react';
import Ripple from '../Ripple';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained';
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
  const disabledStyle =
    'disabled:opacity-50 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:text-gray-800 dark:disabled:text-gray-400 disabled:shadow-none disabled:ripple-none disabled:cursor-default disabled:translate-y-0';

  function variantStyle(
    variant: ButtonProps['variant']
  ): ButtonProps['className'] {
    switch (variant) {
      case 'contained':
        return 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-300 dark:hover:bg-blue-400 text-white dark:text-black';
      default:
        return 'text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-700 hover:bg-gray-200';
    }
  }

  if (Component)
    return (
      <Component
        className={[
          variantStyle(variant),
          baseStyle,
          disabledStyle,
          className,
        ].join(' ')}
        disabled={disabled}
        {...props}
      >
        {!disabled && <Ripple />}
        {children}
      </Component>
    );
  return (
    <button
      className={[
        variantStyle(variant),
        baseStyle,
        disabledStyle,
        className,
      ].join(' ')}
      type={type}
      disabled={disabled}
      {...props}
    >
      {!disabled && <Ripple />}
      {children}
    </button>
  );
}
