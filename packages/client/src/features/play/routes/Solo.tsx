import { useContext } from 'react';
import { useEffect } from 'react';
import { CHANGE_GAMEMODE } from '../../../config/constants';
import { GameContext } from '../../../context';
import Play, { PlayProps } from './Play';

export interface SoloProps extends PlayProps {}

export function Solo({ ...props }: SoloProps) {
  const { gamemode, dispatch } = useContext(GameContext);
  useEffect(() => {
    if (gamemode === 'solo') return;
    dispatch({ type: CHANGE_GAMEMODE, payload: 'solo' });
  }, [gamemode, dispatch]);
  return <Play gamemodeOverride="solo" {...props} />;
}
