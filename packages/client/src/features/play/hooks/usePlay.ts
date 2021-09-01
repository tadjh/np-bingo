import {
  Card,
  Gamemode,
  Player,
  Results,
  Serial,
  Winner,
} from '@np-bingo/types';
import { useCallback, useContext, useEffect, useReducer } from 'react';
import {
  FeaturesContext,
  GameContext,
  RoomContext,
  UserContext,
} from '../../../context';
import { usePlayEmitters, usePlayListenersRoom, usePlaySounds } from '.';
import { usePlayListenersHost } from './usePlayListenersHost';
import {
  CHECK_CARD_FAILURE,
  CHECK_CARD_SUCCESS,
  NEW_CARD,
  NOT_WINNER,
  READY_CHECK,
  WINNER_CROSSMARKS,
} from '../../../config/constants';
import { winningCells, winningMethods } from '../../../utils/bingo.validate';
import { BINGO, newCard } from '../../../utils/bingo';
import {
  initialPlayState,
  PlayActions,
  playReducer,
  PlayState,
} from '../../../reducers/play.reducer';
// import logger from 'use-reducer-logger';
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
  const {
    emitReadyUp,
    // emitSendCard
  } = usePlayEmitters();
  const [subscribeToHost, unsubscribeFromHost] = usePlayListenersHost(
    socket,
    playDispatch,
    dispatch
  );
  const [subscribeToRoom, unsubscribeFromRoom] = usePlayListenersRoom(
    socket,
    dispatch
  );
  // const [, soloSideEffects] = useSolo();

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
      subscribeToRoom(); // TODO is this best location?
    }
  }, [isNewGame, gamemode, subscribeToHost, subscribeToRoom]);

  /**
   * Sets Winning crossmarks after successful card validations
   * @param results Results of validation check
   */
  const setWinningCrossmarks = (winningCrossmarks: {
    [key: string]: boolean;
  }) => {
    playDispatch({ type: WINNER_CROSSMARKS, payload: winningCrossmarks });
  };

  /**
   * Sync Play gamestate with App gamestate
   */
  // useEffect(() => {
  //   if (gamestate !== 'init') return;
  //   // Syncing Player View with Host Game State.
  //   initPlay();
  //   play('ready');
  // }, [gamestate, initPlay, play]);

  const handleWinCleanUp = useCallback(() => {
    // TODO maybe useMemo playWinSfxData, expensive?
    playWinSfxData.stop();
    playDispatch({ type: NOT_WINNER });
  }, [playWinSfxData, playDispatch]);

  const isCurrentWinner = (
    winners: Winner[],
    socketId: Player['name'] | null
  ): Winner | undefined => {
    return winners.find((winner) => winner.player.socketId === socketId);
  };

  // TODO IMPROVE
  useEffect(() => {
    if (gamestate !== 'ready') return;
    if (isWinner) return handleWinCleanUp();
  }, [gamestate, isWinner, handleWinCleanUp]);

  useEffect(() => {
    if (gamemode === 'solo') return;
    if (gamestate !== 'win') return;

    /**
     * Handles win
     */
    const handleWin = (winner: Winner) => {
      const winningCrossmarks = winningCells(winner.results);
      playWinSfx();
      setWinningCrossmarks(winningCrossmarks);
    };

    const winner = isCurrentWinner(winners, socketId);
    if (!winner) return;
    handleWin(winner);
  }, [gamestate, gamemode, socketId, winners, dispatch, playWinSfx]);

  // TODO deafenHostAction
  // TODO deafenRomAction

  // useEffect(() => {
  //   console.log('test ' + gamestate);Î
  //   if (gamestate === 'win') return handleWin();
  // }, [gamestate, handleWin]);

  /**
   * Set/Reset Play on Ready
   */
  // useEffect(() => {
  //   if (gamestate !== 'ready') return;
  //   setCard();
  //   confettiStop();
  // }, [gamestate, setCard]);

  /**
   * Solo: On Validation
   * // TODO Move to useSolo
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
      setWinningCrossmarks(winningCrossmarks);
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
