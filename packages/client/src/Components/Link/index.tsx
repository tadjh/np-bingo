import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

export default function Link({
  className = '',
  children,
  ...props
}: LinkProps) {
  return (
    <RouterLink
      className={[
        'text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
