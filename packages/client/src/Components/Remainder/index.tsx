import React from 'react';
import { Typography } from '@material-ui/core';
import './style.css';

export interface RemainderProps {
  value: number;
  disabled?: boolean;
}

export default function Remainder({ value = 0, disabled }: RemainderProps) {
  return (
    <Typography
      variant="caption"
      className={['remainder', disabled && 'disabled'].join(' ')}
      gutterBottom
    >{`Balls Remaining: ${value}`}</Typography>
  );
}
