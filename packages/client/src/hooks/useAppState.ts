import { useReducer } from 'react';
import logger from 'use-reducer-logger';
import { NODE_ENV } from '../config';
import {
  AppState,
  appReducer,
  AppActions,
  initialAppState,
} from '../reducers/app.reducer';

export function useAppState() {
  const [state, dispatch] = useReducer<
    (state: AppState, action: AppActions) => AppState
  >(
    NODE_ENV === 'development' ? logger(appReducer) : appReducer,
    initialAppState
  );

  // /**
  //  * Manage game state
  //  * @param gamestate
  //  */
  // const play = useCallback((gamestate: Gamestate) => {
  //   switch (gamestate) {
  //     case 'init':
  //       dispatch({ type: INIT_GAME });
  //       break;
  //     case 'ready':
  //       dispatch({ type: READY_CHECK });
  //       break;
  //     case 'standby':
  //       dispatch({ type: STANDBY });
  //       break;
  //     case 'start':
  //       dispatch({ type: START_GAME });
  //       break;
  //     case 'validate':
  //       dispatch({ type: VALIDATE });
  //       break;
  //     case 'pause':
  //       dispatch({ type: PAUSE });
  //       break;
  //     case 'failure':
  //       dispatch({ type: FAILURE });
  //       break;
  //     case 'win':
  //       dispatch({ type: WIN_GAME });
  //       break;
  //     case 'end':
  //       dispatch({ type: END_GAME });
  //       break;
  //     default:
  //       throw new Error('Invalid game state.');
  //   }
  // }, []);

  // /**
  //  * Update game mode
  //  * @param gamemode
  //  */
  // const mode = useCallback((gamemode: Gamemode) => {
  //   switch (gamemode) {
  //     case 'default':
  //       dispatch({ type: UPDATE_GAMEMODE, payload: 'default' });
  //       break;
  //     case 'solo':
  //       dispatch({ type: UPDATE_GAMEMODE, payload: 'solo' });
  //       break;
  //     case 'death':
  //       dispatch({ type: UPDATE_GAMEMODE, payload: 'death' });
  //       break;
  //     case 'blackout':
  //       dispatch({ type: UPDATE_GAMEMODE, payload: 'blackout' });
  //       break;
  //     default:
  //       throw new Error('Invalid game mode.');
  //   }
  // }, []);

  // /**
  //  * Dispatch Create Room
  //  * @param room
  //  * @param host
  //  */
  // const dispatchCreateRoom = (room: Room, host: Host) => {
  //   dispatch({
  //     type: SET_ROOM,
  //     payload: { room, host },
  //   });
  // };

  // /**
  //  * Dispatch New Ball
  //  * @param ball
  //  * @param draws
  //  * @param pool
  //  */
  // const dispatchNewBall = (ball: Ball, draws: Draws, pool: Pool) => {
  //   dispatch({
  //     type: NEW_BALL,
  //     payload: {
  //       ball,
  //       draws,
  //       pool,
  //     },
  //   });
  // };

  // /**
  //  * Solo: Impersonate sending card to host
  //  * @param card
  //  * @param user
  //  */
  // const dispatchSendCard = (card: Card, user: Player) => {
  //   dispatch({ type: GET_CARD, payload: { card: card, owner: user } });
  // };

  // /**
  //  * Dispatch check card success
  //  */
  // const dispatchCheckCardSuccess = (winner: Winner) => {
  //   dispatch({
  //     type: CHECK_CARD_SUCCESS,
  //     payload: winner,
  //   });
  // };

  // /**
  //  * Dispatch check card failure
  //  */
  // const dispatchCheckCardFailure = () => {
  //   dispatch({ type: CHECK_CARD_FAILURE });
  // };

  // /**
  //  * Dispatch new player joined room
  //  * @param player Player
  //  */
  // const dispatchPlayerJoined = (player: Player) => {
  //   dispatch({ type: PLAYER_JOINED, payload: player });
  // };

  // /**
  //  * Dispatch player left room
  //  * @param player Player
  //  */
  // const dispatchPlayerLeft = (player: Player) => {
  //   dispatch({ type: PLAYER_LEFT, payload: player });
  // };

  // /**
  //  * Remove player from room
  //  * @param player Player
  //  */
  // const dispatchRemovePlayer = (player: Player) => {
  //   dispatch({ type: PLAYER_KICKED, payload: player });
  // };

  // /**
  //  * Dispatch player ready
  //  * @param player Player
  //  */
  // const dispatchPlayerReady = (player: Player) => {
  //   dispatch({ type: PLAYER_READY, payload: player });
  // };

  // /**
  //  * Dispatch new ball
  //  * @param ball Ball
  //  */
  // const dispatchDispenseBall = (ball: Ball) => {
  //   dispatch({ type: SET_BALL, payload: ball });
  // };

  return {
    state,
    dispatch,
  };
}
