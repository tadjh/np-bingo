import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import ChevronLeftIcon from '../../../assets/icons/ChevronLeft';
import { useClickSoft } from '../../../hooks';
import IconButton from '../../Inputs/IconButton';

export interface BackProps extends LinkProps {}
// TODO Back stories
export default function Back({ ...props }: BackProps): JSX.Element {
  const [clickSoftSfx] = useClickSoft();
  return (
    <RouterLink {...props} onMouseDown={clickSoftSfx}>
      <IconButton description="Back">
        <ChevronLeftIcon />
      </IconButton>
    </RouterLink>
  );
}
