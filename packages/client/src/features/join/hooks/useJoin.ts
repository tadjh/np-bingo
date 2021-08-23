import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Host, Room } from '@np-bingo/types';
import { GameContext, RoomContext, UserContext } from '../../../context';
import { useQuery } from '../../../hooks';
import { apiUpdateRoom } from '../api';
import { Socket } from 'socket.io-client';

export function useJoin(
  dispatchJoinRoom: (room: string, host: Host) => void
): [(room: Room) => void, () => void] {
  const { user, socket, isUpdatingUser, setIsUpdatingUser, connect } =
    useContext(UserContext);
  const { room, host } = useContext(RoomContext);
  const { play, mode } = useContext(GameContext);
  let query = useQuery();
  const queryRoom = query.get('r');
  let history = useHistory();
  const [currentRoom, setCurrentRoom] = useState('');

  /**
   * Handle Solo Button
   */
  const handleSolo = () => {
    mode('solo');
    play('ready');
  };

  /**
   * Player: Connect to socket.io and store room input in state
   * @param room Room code
   */
  const joinRoom = useCallback(
    (room: Room) => {
      if (isUpdatingUser) return;
      setCurrentRoom(room);
      connect();
    },
    [isUpdatingUser, connect]
  );

  /**
   * To Room: Player joined
   */
  const emitJoinRoom = useCallback(
    (room, hostSocketId: Socket['id'], user) => {
      socket.emit('player:action', 'join-room', room, hostSocketId, user);
    },
    [socket]
  );

  /**
   * Call Api Update Room
   */
  const updateRoom = useCallback(() => {
    // TODO Prevent room join if host is already playing (throw error if gamestate not 'ready')
    apiUpdateRoom(currentRoom, user, (res) => {
      dispatchJoinRoom(currentRoom, res.data.host);
      emitJoinRoom(currentRoom, res.data.host.socketId, user);
      history.push(`/play?r=${currentRoom}`);
      play('ready'); // TODO Move inside Play
    });
  }, [currentRoom, user, history, dispatchJoinRoom, emitJoinRoom, play]);

  /**
   * Call api Update room once user socketId has been set
   */
  useEffect(() => {
    if (!isUpdatingUser || user.socketId === '') return;
    setIsUpdatingUser(false);
    updateRoom();
  }, [isUpdatingUser, setIsUpdatingUser, user.socketId, updateRoom]);

  /**
   * Handles share link
   */
  useEffect(() => {
    if (queryRoom === null) return;
    joinRoom(queryRoom);
  }, [queryRoom, joinRoom]);

  return [joinRoom, handleSolo];
}
