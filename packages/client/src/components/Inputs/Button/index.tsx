import React, { useRef } from 'react';
import clsx from 'clsx';
import { useClickHard } from '../../../hooks';
import Ripple from '../../Feedback/Ripple';
import { useButton } from './hooks';
import { ButtonAria, useButton as useAriaButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';

export type ButtonVariants = 'default' | 'primary' | 'success';
export interface ButtonProps extends AriaButtonProps<'button' | 'a'> {
  variant?: ButtonVariants;
  component?: any;
  className?: string;
  to?: string;
}

export default function Button({
  variant = 'default',
  component: Component,
  className,
  children,
  to,
  ...props
}: ButtonProps): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const {
    buttonProps,
  }: ButtonAria<React.HTMLAttributes<HTMLElement>> = useAriaButton(
    props,
    buttonRef
  );
  const [buttonSyle] = useButton(variant, props.isDisabled);
  const [clickHardSfx] = useClickHard();

  // TODO useRipple
  // function createRipple(event) {
  //   const button = event.currentTarget;

  //   const circle = document.createElement("span");
  //   const diameter = Math.max(button.clientWidth, button.clientHeight);
  //   const radius = diameter / 2;

  //   circle.style.width = circle.style.height = `${diameter}px`;
  //   circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  //   circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  //   circle.classList.add("ripple");

  //   const ripple = button.getElementsByClassName("ripple")[0];

  //   if (ripple) {
  //     ripple.remove();
  //   }

  //   button.appendChild(circle);
  // }

  if (Component)
    return (
      <Component
        {...buttonProps}
        ref={buttonRef}
        to={to}
        className={clsx(
          'relative px-6 py-2 rounded-full transition focus:outline-none hover:shadow-xl overflow-hidden ripple-lighter dark:ripple-darker text-center',
          buttonSyle(),
          className
        )}
        onMouseDown={clickHardSfx}
      >
        {children}
        <Ripple disabled={props.isDisabled} />
      </Component>
    );
  return (
    <button
      {...buttonProps}
      ref={buttonRef}
      className={clsx(
        'relative px-6 py-2 rounded-full transition focus:outline-none hover:shadow-xl overflow-hidden ripple-lighter dark:ripple-darker text-center',
        buttonSyle(),
        className
      )}
      onMouseDown={clickHardSfx}
    >
      {children}
      <Ripple disabled={props.isDisabled} />
    </button>
  );
}
