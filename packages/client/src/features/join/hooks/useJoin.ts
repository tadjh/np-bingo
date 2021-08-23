import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Host, Room } from '@np-bingo/types';
import { GameContext, RoomContext, UserContext } from '../../../context';
import { useQuery } from '../../../hooks';
import { apiUpdateRoom } from '../api';

export function useJoin(
  dispatchJoinRoom: (room: string, host: Host) => void
): [(room: Room) => void, () => void] {
  const { user, socket } = useContext(UserContext);
  const { room, host } = useContext(RoomContext);
  const { play, mode } = useContext(GameContext);
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
    socket.emit('player:join-room', room, host.socketId, user);
    history.push(`/play?r=${room}`);
  }, [room, socket, host.socketId, user, history]);

  return [joinRoom, handleSolo];
}
