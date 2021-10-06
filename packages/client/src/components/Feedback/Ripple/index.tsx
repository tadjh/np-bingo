import { HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface RippleProps extends HTMLAttributes<HTMLSpanElement> {}

export default function Ripple({
  className,
  ...props
}: RippleProps): JSX.Element | null {
  return (
    <span
      {...props}
      className={clsx(
        'animate-ripple absolute w-5 h-5 bg-white rounded-full blur-[0.5px]',
        className
      )}
    />
  );
}
