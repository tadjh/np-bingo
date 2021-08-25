import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Room } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { useQuery } from '../../../hooks';
import { apiUpdateRoom } from '../api';
import { Socket } from 'socket.io-client';
import { JOIN_ROOM, CHANGE_GAMEMODE } from '../../../config/constants';

export function useJoin(): [(room: Room) => void, () => void] {
  const { user, socket, connect } = useContext(UserContext);
  const { dispatch } = useContext(GameContext);
  let query = useQuery();
  let history = useHistory();
  const [currentRoom, setCurrentRoom] = useState('');
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  /**
   * Handle Solo Button
   */
  const handleSolo = () => {
    dispatch({ type: CHANGE_GAMEMODE, payload: 'solo' });
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
  // TODO IS A MESS
  const updateRoom = useCallback(() => {
    // TODO Prevent room join if host is already playing (throw error if gamestate not 'ready')
    apiUpdateRoom(currentRoom, user, (res) => {
      dispatch({
        type: JOIN_ROOM,
        payload: { room: currentRoom, host: res.data.host },
      });
      emitJoinRoom(currentRoom, res.data.host.socketId, user);
      history.push(`/play?r=${currentRoom}`);
    });
  }, [currentRoom, user, history, emitJoinRoom, dispatch]);

  /**
   * Call api Update room once user socketId has been set
   */
  // TODO IS A MESS
  useEffect(() => {
    if (!isUpdatingUser || user.socketId === '') return;
    setIsUpdatingUser(false);
    updateRoom();
  }, [isUpdatingUser, setIsUpdatingUser, user.socketId, updateRoom]);

  /**
   * Handles share link
   */
  useEffect(() => {
    const queryRoom = query.get('r');
    if (queryRoom === null) return;
    joinRoom(queryRoom);
  }, [query, joinRoom]);

  return [joinRoom, handleSolo];
}
