import { Card, Player, Serial, Winner } from '@np-bingo/types';
import { useContext, useEffect, useReducer } from 'react';
import {
  FeaturesContext,
  GameContext,
  RoomContext,
  UserContext,
} from '../../../context';
import { usePlayListenersRoom, usePlaySounds } from '.';
import { usePlayListenersHost } from './usePlayListenersHost';
import {
  CHECK_CARD_FAILURE,
  CHECK_CARD_SUCCESS,
  CLEAR_CROSSMARKS,
  NEW_CARD,
  WINNER_CROSSMARKS,
} from '../../../config/constants';
import { winningCells } from '../../../utils/bingo.validate';
import { BINGO, newCard } from '../../../utils/bingo';
import {
  initialPlayState,
  PlayActions,
  playReducer,
  PlayState,
} from '../../../reducers/play.reducer';
import { NODE_ENV } from '../../../config';
import { ReducerLogger } from '../../../hooks/useReducerLogger';

export function usePlay() {
  const {
    user: { socketId },
    socket,
  } = useContext(UserContext);
  const { ballDelay } = useContext(FeaturesContext);
  const { winners } = useContext(RoomContext);
  const { gamestate, gamemode, playerCards, dispatch, checkCard } = useContext(
    GameContext
  );
  const [
    { card, serial, crossmarks, kicked, isWinner, isNewGame },
    playDispatch,
  ] = useReducer<(state: PlayState, action: PlayActions) => PlayState>(
    NODE_ENV === 'development' ? ReducerLogger(playReducer) : playReducer,
    initialPlayState
  );

  const { playWinSfxData, playWinSfx, playLoseSfx } = usePlaySounds();
  const [subscribeToHost] = usePlayListenersHost(
    socket,
    playDispatch,
    dispatch
  );
  const [subscribeToRoom] = usePlayListenersRoom(socket, dispatch);

  /**
   * Creates a new card and stores it in state
   */
  const handleNewCard = () => {
    const [card, serial] = newCard(BINGO);
    setNewCard(card, serial);
  };

  /**
   * Set new card
   * @param card
   * @param serial
   */
  const setNewCard = (card: Card, serial: Serial) => {
    playDispatch({ type: NEW_CARD, payload: { card: card, serial: serial } });
  };

  /**
   * Set new game
   */
  useEffect(() => {
    if (!isNewGame) return;
    const [card, serial] = newCard(BINGO);
    setNewCard(card, serial);
    if (gamemode !== 'solo') {
      subscribeToHost();
      subscribeToRoom();
    }
  }, [isNewGame, gamemode, subscribeToHost, subscribeToRoom]);

  /**
   * If current user is a winner
   * @param winners
   * @param socketId
   * @returns Winner
   */
  const isCurrentWinner = (
    winners: Winner[],
    socketId: Player['name'] | null
  ): Winner | undefined => {
    return winners.find((winner) => winner.player.socketId === socketId);
  };

  /**
   * Game board reset for Solo and Multiplayer
   */
  useEffect(() => {
    if (gamestate !== 'ready') return;
    if (!isWinner) return;
    if (isNewGame) return;

    const handleWinCleanUp = () => {
      playDispatch({ type: CLEAR_CROSSMARKS });

      playWinSfxData.stop();
    };

    handleWinCleanUp();
  }, [gamestate, isWinner, isNewGame, playWinSfxData]);

  /**
   * Multiplayer Win
   */
  useEffect(() => {
    if (gamemode === 'solo') return;
    if (gamestate !== 'win') return;

    /**
     * Handles win
     */
    const handleWin = (winner: Winner) => {
      const winningCrossmarks = winningCells(winner.results);
      playWinSfx();
      playDispatch({ type: WINNER_CROSSMARKS, payload: winningCrossmarks });
    };

    const winner = isCurrentWinner(winners, socketId);
    if (!winner) return;
    handleWin(winner);
  }, [gamestate, gamemode, socketId, winners, dispatch, playWinSfx]);

  /**
   * Solo: On Validation
   */
  useEffect(() => {
    if (gamemode !== 'solo') return;
    if (gamestate !== 'validate') return;

    /**
     * Handles win
     */
    const handleWin = (winner: Winner) => {
      const winningCrossmarks = winningCells(winner.results);
      playWinSfx();
      dispatch({ type: CHECK_CARD_SUCCESS, payload: [winner] });
      playDispatch({ type: WINNER_CROSSMARKS, payload: winningCrossmarks });
    };

    /**
     * Handles lose
     */
    const handleLose = () => {
      dispatch({ type: CHECK_CARD_FAILURE });
      playLoseSfx();
    };

    const winner = checkCard(playerCards[0]);

    // Delay showing result
    const validateDelay = setTimeout(() => {
      winner !== null ? handleWin(winner) : handleLose();
    }, ballDelay);

    return () => clearTimeout(validateDelay);
  }, [
    gamestate,
    gamemode,
    ballDelay,
    playerCards,
    checkCard,
    dispatch,
    playWinSfx,
    playLoseSfx,
  ]);

  return {
    card,
    serial,
    crossmarks,
    kicked,
    isWinner,
    isNewGame,
    handleNewCard,
  };
}
