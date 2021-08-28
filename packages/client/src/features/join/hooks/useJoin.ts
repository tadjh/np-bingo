import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { JoinRoom, Player, Room } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { useFetch, useQuery } from '../../../hooks';
import { JOIN_ROOM, CHANGE_GAMEMODE, INIT } from '../../../config/constants';

export function useJoin() {
  const { user, socket, connect } = useContext(UserContext);
  const { gamestate, dispatch } = useContext(GameContext);
  let query = useQuery();
  let history = useHistory();
  const [joiningRoom, setJoiningRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room>('');
  const { result, isLoading, isError, body, setBody } = useFetch<
    Player,
    JoinRoom
  >('PUT', `/api/game/join/${currentRoom}`);
  /**
   * Handle Solo Button
   */
  const handleSolo = () => dispatch({ type: CHANGE_GAMEMODE, payload: 'solo' });

  /**
   * Init on visit to home
   */
  useEffect(() => {
    if (gamestate === 'init') return;
    dispatch({ type: INIT });
  }, [gamestate, dispatch]);

  /**
   * Player: Connect to socket.io and store room input in state
   * @param room Room code
   */
  const joinRoom = useCallback(
    (room: Room) => {
      // if (isUpdatingUser) return;
      setJoiningRoom(true);
      setCurrentRoom(room);

      if (socket.connected === true) return;
      connect();
    },
    [socket, connect]
  );

  // TODO Move socket delegation to App

  /**
   * Trigger Fetch once socket is loaded
   */
  useEffect(() => {
    if (user.socketId === null || !joiningRoom) return;
    setBody(user);
  }, [user, joiningRoom, setBody]);

  /**
   * Call api Update room once user socketId has been set
   */
  useEffect(() => {
    if (result === null) return;

    /**
     * To Room: Player joined
     */
    const emitJoinRoom = (room: Room, hostSocketId: string, user: Player) => {
      socket.emit('player:event', 'join-room', room, hostSocketId, user);
    };

    emitJoinRoom(result.data.room, result.data.host.socketId!, body!);

    // TODO Prevent room join if host is already playing (throw error if gamestate not 'ready')

    setJoiningRoom(false);

    dispatch({
      type: JOIN_ROOM,
      payload: { room: result.data.room, host: result.data.host },
    });

    history.push(`/play?r=${result.data.room}`);
  }, [result, body, socket, history, dispatch]);

  /**
   * Handles share link
   */
  useEffect(() => {
    const queryRoom = query.get('r');
    if (queryRoom === null) return;
    joinRoom(queryRoom);
  }, [query, joinRoom]);

  return { isLoading, isError, joinRoom, handleSolo };
}
