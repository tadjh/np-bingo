import React from 'react';

export interface BackgroundProps {
  variant?: 'default' | 'phone' | 'top';
}
export default function Background({ variant = 'default' }: BackgroundProps) {
  if (variant === 'phone')
    return (
      <div className="background bg-iphone bg-contain bg-no-repeat bg-center absolute sm:w-[430px] sm:h-[868px] invisible sm:visible"></div>
    );
  if (variant === 'top')
    return (
      <div className="background bg-iphone-top bg-contain bg-no-repeat bg-center absolute left-0 sm:w-[430px] sm:h-[32px] z-20 transform translate-x-[-28px] translate-y-[-1px] invisible sm:visible"></div>
    );
  return (
    <div className="background bg-bingo-light dark:bg-bingo-dark bg-cover bg-no-repeat bg-bottom absolute left-0 top-0 h-full w-full sm:rounded-[38px]"></div>
  );
}
