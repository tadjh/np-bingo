import React from 'react';
import Icon, { IconProps } from './Icon';

export default function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon viewBox="4 4 12 12" {...props}>
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </Icon>
  );
}
