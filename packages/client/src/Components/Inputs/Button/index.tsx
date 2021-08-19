import React from 'react';
import clsx from 'clsx';
import { useClickHard } from '../../../assets/sounds/hooks';
import Ripple from '../../Feedback/Ripple';
import { useButton } from './hooks';

export type ButtonVariants = '' | 'contained';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  component?: any;
  to?: string;
  disabled?: boolean;
}

export default function Button({
  variant = '',
  component: Component,
  className,
  children,
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps): JSX.Element {
  const [buttonSyle] = useButton(variant, disabled);
  const [clickHardSfx] = useClickHard();
  const buttonClasses = clsx(
    'relative px-6 py-2 rounded-full transition focus:outline-none hover:shadow-xl overflow-hidden ripple-lighter dark:ripple-darker',
    buttonSyle(),
    className
  );

  if (Component)
    return (
      <Component
        className={buttonClasses}
        disabled={disabled}
        onMouseDown={clickHardSfx}
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
      onMouseDown={clickHardSfx}
      {...props}
    >
      <Ripple disabled={disabled} />
      {children}
    </button>
  );
}
