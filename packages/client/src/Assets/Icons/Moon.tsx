import React from 'react';
import Icon, { IconProps } from './Icon';

export default function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </Icon>
  );
}
