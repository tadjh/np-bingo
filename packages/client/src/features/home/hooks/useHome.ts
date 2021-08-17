import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Host } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { apiCreateRoom } from '../api';

export function useHome(
  dispatchCreateRoom: (room: string, host: Host) => void
) {
  let history = useHistory();
  const user = useContext(UserContext);
  const { gamestate, room, play } = useContext(GameContext);

  /**
   * Reset gamestate on visit to home
   */
  useEffect(() => {
    if (gamestate === 'init') return;
    play('init');

    // TODO Does this work?
    return () => {
      play('ready');
    };
  }, [gamestate, play]);

  /**
   * Route after create room
   */
  useEffect(() => {
    if (gamestate !== 'init' || room === '') return;
    history.push(`/host?r=${room}`);
  }, [gamestate, room, history]);

  /**
   * Create a new game room
   */
  const createRoom = useCallback(() => {
    apiCreateRoom(user, (res) => {
      dispatchCreateRoom(res.data.game.room, res.data.game.host);
    });
  }, [dispatchCreateRoom, user]);

  return [createRoom];
}
