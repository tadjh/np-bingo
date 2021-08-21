import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Host, Room } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { useQuery } from '../../../hooks';
import socket from '../../../lib/socket.io';
import { apiUpdateRoom } from '../api';

export function useJoin(
  dispatchJoinRoom: (room: string, host: Host) => void
): [(room: Room) => void, () => void] {
  const { user } = useContext(UserContext);
  const { room, host, play, mode } = useContext(GameContext);
  let query = useQuery();
  const queryRoom = query.get('r');
  let history = useHistory();

  /**
   * Player: Join game by room code
   * @param room Room code
   */
  const joinRoom = useCallback(
    (room: Room) => {
      apiUpdateRoom(room, user, (res) => {
        dispatchJoinRoom(room, res.data.host);
      });
    },
    [dispatchJoinRoom, user]
  );

  const handleSolo = () => {
    mode('solo');
    play('ready');
  };

  /**
   * Handles share link
   */
  useEffect(() => {
    if (queryRoom === null) return;
    // TODO Check if room is active first
    joinRoom(room);
  }, [queryRoom, joinRoom, room]);

  /**
   * Routes when room is updated
   */
  useEffect(() => {
    if (room === '') return;
    socket.emit('join-room', room, host.socket, user);
    history.push(`/play?r=${room}`);
  }, [room, host.socket, user, history]);

  return [joinRoom, handleSolo];
}
