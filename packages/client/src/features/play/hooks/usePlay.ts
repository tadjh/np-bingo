import { Gamemode, Results, Winner } from '@np-bingo/types';
import { useCallback, useContext, useEffect } from 'react';
import { FeaturesContext, GameContext } from '../../../context';
import { usePlayEmitters, usePlaySounds } from '.';
import { usePlayListeners } from './usePlayListeners';
import {
  CHECK_CARD_FAILURE,
  CHECK_CARD_SUCCESS,
  NEW_CARD,
  NOT_WINNER,
  READY_CHECK,
  WINNER_CROSSMARKS,
} from '../../../config/constants';
import { winningMethods } from '../../../utils/bingo.validate';
import { PlayContext } from '../../../context/PlayContext';
import { BINGO, newCard } from '../../../utils/bingo';

export function usePlay(gamemode: Gamemode, confettiOverride: boolean) {
  const { ballDelay } = useContext(FeaturesContext);
  const { gamestate, dispatch, checkCard } = useContext(GameContext);
  const { isWinner, isNewGame, playDispatch } = useContext(PlayContext);
  const { playWinSfxData, playWinSfx, playLoseSfx } = usePlaySounds();
  const {
    emitReadyUp,
    // emitSendCard
  } = usePlayEmitters();
  const { listenHostAction } = usePlayListeners();
  // const [, soloSideEffects] = useSolo();

  /**
   * Creates a new card and stores it in state
   */
  const setCard = useCallback(() => {
    const [card, serial] = newCard(BINGO);
    playDispatch({ type: NEW_CARD, payload: { card: card, serial: serial } });
  }, [playDispatch]);

  /**
   * Sets Winning crossmarks after successful card validations
   * @param results Results of validation check
   * @retuns Object of winning crossmarks
   */
  function winningCells(results: Results): { [key: string]: boolean } {
    const methods = winningMethods(results);
    let winningCrossmarks = {};
    for (let i = 0; i < methods.length; i++) {
      let marks = (results[methods[i]] as number[]).map(function (item) {
        let id = `cell-${item + 1}`;
        return { [id]: true };
      });
      winningCrossmarks = Object.assign(winningCrossmarks, ...marks);
    }
    return winningCrossmarks;
  }

  /**
   * Sets Winning crossmarks after successful card validations
   * @param results Results of validation check
   */
  const setWinningCrossmarks = useCallback(
    (results: Results) => {
      const winningCrossmarks = winningCells(results);
      playDispatch({ type: WINNER_CROSSMARKS, payload: winningCrossmarks });
    },
    [playDispatch]
  );

  /**
   * Handles win
   */
  const handleWin = useCallback(
    (winner: Winner) => {
      dispatch({ type: CHECK_CARD_SUCCESS, payload: winner });
      setWinningCrossmarks(winner.results);
      playWinSfx();
    },
    [setWinningCrossmarks, playWinSfx, dispatch]
  );

  /**
   * Handles lose
   */
  const handleLose = useCallback(() => {
    dispatch({ type: CHECK_CARD_FAILURE });
    playLoseSfx();
  }, [dispatch, playLoseSfx]);

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

  // TODO IMPROVE
  useEffect(() => {
    if (gamestate !== 'ready') return;
    if (isWinner) return handleWinCleanUp();
  }, [gamestate, isWinner, handleWinCleanUp]);

  /**
   * Validate card for solo mode
   * // TODO Moving this to useSolo, creates issues
   */
  const validate = useCallback(() => {
    setTimeout(() => {
      const winner = checkCard();
      winner !== null ? handleWin(winner) : handleLose();
    }, ballDelay);
  }, [ballDelay, checkCard, handleWin, handleLose]);

  useEffect(() => {
    if (gamestate === 'validate') return validate();
  }, [gamestate, validate]);

  /**
   * Set new game
   */
  useEffect(() => {
    if (!isNewGame) return; // TODO REDO IMPLEMENTATION
    dispatch({ type: READY_CHECK });
    setCard();
    listenHostAction();
  }, [isNewGame, setCard, listenHostAction, dispatch]);

  // TODO deafenPlayerAction

  // useEffect(() => {
  //   console.log('test ' + gamestate);
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
   * Multiplayer Side-effects
   */
  // useEffect(() => {
  //   if (gamemode === 'solo') return soloSideEffects(handleWin, handleLose);
  //   switch (gamestate) {
  //     case 'standby':
  //       emitReadyUp();
  //       break;
  //     case 'validate':
  //       emitSendCard(card);
  //       break;
  //     case 'win':
  //       handleWin();
  //       play('end');
  //       break;
  //     case 'failure':
  //       handleLose();
  //       play('standby');
  //       break;
  //     default:
  //       break;
  //   }
  // }, [
  //   gamestate,
  //   gamemode,
  //   card,
  //   winner,
  //   handleWin,
  //   handleLose,
  //   play,
  //   emitReadyUp,
  //   emitSendCard,
  //   soloSideEffects,
  // ]);

  return {
    isWinner,
    setCard,
    validate,
  };
}
