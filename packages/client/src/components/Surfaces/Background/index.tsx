import React from 'react';
// TODO Add story

export interface BackgroundProps {
  variant?: 'default' | 'phone' | 'top';
}
export default function Background({ variant = 'default' }: BackgroundProps) {
  if (variant === 'phone')
    return (
      <div className="background bg-iphone bg-contain bg-no-repeat bg-center absolute w-[430px] h-[868px]"></div>
    );
  if (variant === 'top')
    return (
      <div className="background bg-iphone-top bg-contain bg-no-repeat bg-center absolute w-[430px] h-[32px] z-20 transform translate-x-[-28px] translate-y-[-1px]"></div>
    );
  return (
    <div className="background bg-bingo-light dark:bg-bingo-dark bg-cover bg-no-repeat bg-bottom absolute left-0 top-0 h-full w-full rounded-[38px]"></div>
  );
}
