import { Gamemode, Results } from '@np-bingo/types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FeaturesContext, GameContext } from '../../../context';
import { usePlayEmitters, usePlaySounds, usePlayState, useSolo } from '.';
import { handleError, logger } from '../../../utils';
import { PlayerDispatchers } from '..';
import { useToggle } from '../../../hooks';

export function usePlay(
  dispatchers: PlayerDispatchers,
  gamemode: Gamemode,
  confettiOverride: boolean
) {
  const { ballDelay } = useContext(FeaturesContext);
  const { gamestate, mode, play, checkCard } = useContext(GameContext);
  const {
    card,
    serial,
    crossmarks,
    kicked,
    initPlay,
    setCard,
    setWinningCrossmarks,
  } = usePlayState();
  const [isWinner, winnerToggle, winnerStart, winnerStop] =
    useToggle(confettiOverride);
  const { playWinSfxData, playWinSfx, playLoseSfx } = usePlaySounds();
  const { emitReadyUp, emitSendCard } = usePlayEmitters();
  // const [, soloSideEffects] = useSolo();

  /**
   * Handles win
   */
  const handleWin = useCallback(
    (results: Results) => {
      // TODO if (winner.methods.length <= 0) return;
      setWinningCrossmarks(results);
      playWinSfx();
      winnerStart();
    },
    [setWinningCrossmarks, playWinSfx, winnerStart]
  );

  /**
   * Handles lose
   */
  const handleLose = useCallback(() => {
    playLoseSfx();
  }, [playLoseSfx]);

  /**
   * Sync Play gamestate with App gamestate
   */
  // useEffect(() => {
  //   if (gamestate !== 'init') return;
  //   // Syncing Player View with Host Game State.
  //   initPlay();
  //   play('ready');
  // }, [gamestate, initPlay, play]);

  useEffect(() => {
    if (gamestate === 'ready') return setCard();
  }, [gamestate, setCard]);

  const handleWinCleanUp = useCallback(
    (isWinner: boolean) => {
      if (!isWinner) return;
      // TODO maybe useMemo playWinSfxData, expensive?
      playWinSfxData.stop();
      winnerStop();
    },
    [playWinSfxData, winnerStop]
  );

  useEffect(() => {
    if (gamestate !== 'ready') return;
    if (isWinner) return handleWinCleanUp(isWinner);
  }, [gamestate, isWinner, handleWinCleanUp]);

  /**
   * Validate card for solo mode
   * // TODO Moving this to useSolo, creates issues
   */
  const validate = useCallback(() => {
    setTimeout(() => {
      const winner = checkCard();
      winner !== null ? handleWin(winner.results) : handleLose();
    }, ballDelay);
  }, [ballDelay, checkCard, handleWin, handleLose]);

  useEffect(() => {
    if (gamestate === 'validate') return validate();
  }, [gamestate, validate]);

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
    card,
    serial,
    crossmarks,
    kicked,
    setCard,
    validate,
  };
}
