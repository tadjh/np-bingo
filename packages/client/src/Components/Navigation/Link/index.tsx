import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useClickSoft } from '../../../assets/sounds';

export default function Link({
  className = '',
  children,
  ...props
}: LinkProps) {
  const [clickSoftSfx] = useClickSoft();
  return (
    <RouterLink
      className={[
        'text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400',
        className,
      ].join(' ')}
      onMouseDown={clickSoftSfx}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
