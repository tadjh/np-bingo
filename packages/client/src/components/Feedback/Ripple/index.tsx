import React from 'react';

export interface RippleProps {
  disabled?: boolean;
}

export default function Ripple({ disabled }: RippleProps): JSX.Element | null {
  if (disabled) return null;
  return <span className="ripple w-full h-full absolute top-0 left-0"></span>;
}
