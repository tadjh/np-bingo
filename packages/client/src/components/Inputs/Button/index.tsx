import React, { ButtonHTMLAttributes, useRef } from 'react';
import clsx from 'clsx';
import Ripple from '../../Feedback/Ripple';
import { useButton } from './hooks';
import { useRipple } from '../../../hooks/useRipple';

export type ButtonVariant = 'default' | 'primary' | 'success';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: ButtonVariant;
  component?: any;
  className?: string;
  to?: string;
  disabled?: boolean;
}

export default function Button({
  variant = 'default',
  component: Component,
  className,
  children,
  to,
  disabled = false,
  ...props
}: ButtonProps): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { isRippling, coordinates, handleSetCoordinates } =
    useRipple(buttonRef);
  const { buttonStyle, handleMouseDown } = useButton(
    variant,
    disabled,
    handleSetCoordinates
  );
  if (Component)
    return (
      <Component
        {...props}
        ref={buttonRef}
        to={to}
        className={clsx(
          'relative px-6 py-2 rounded-full transition focus:outline-none overflow-hidden text-center',
            'disabled:opacity-50 disabled:text-gray-800 dark:disabled:text-gray-400 disabled:shadow-none disabled:cursor-default disabled:pointer-events-none',
          buttonStyle(),
          className
        )}
        onMouseDown={handleMouseDown}
        disabled={disabled}
      >
        {isRippling && (
          <Ripple
            style={{ top: `${coordinates.y}px`, left: `${coordinates.x}px` }}
            disabled={disabled}
          />
        )}
        <span className="relative z-10">{children}</span>
      </Component>
    );
  return (
    <button
      {...props}
      ref={buttonRef}
      className={clsx(
        'relative px-6 py-2 rounded-full transition focus:outline-none overflow-hidden text-center',
          'disabled:opacity-50 disabled:text-gray-800 dark:disabled:text-gray-400 disabled:shadow-none disabled:cursor-default disabled:pointer-events-none',
        buttonStyle(),
        className
      )}
      onMouseDown={handleMouseDown}
      disabled={disabled}
    >
      {isRippling && (
        <Ripple
          style={{ top: `${coordinates.y}px`, left: `${coordinates.x}px` }}
          disabled={disabled}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
