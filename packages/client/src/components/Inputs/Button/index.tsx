import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import Ripple from '../../Feedback/Ripple';
import { useButton } from './hooks';

export type ButtonVariants = 'default' | 'primary' | 'success';
// AriaButtonProps<'button' | 'a'>
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: ButtonVariants;
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
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  const { isRippling, buttonRef, coordinates, buttonStyle, handleMouseDown } =
    useButton(variant, disabled);
  if (Component)
    return (
      <Component
        {...props}
        ref={buttonRef}
        to={to}
        className={clsx(
          'relative px-6 py-2 rounded-full transition focus:outline-none overflow-hidden text-center',
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
