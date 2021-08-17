import { Gamemode, Winner } from '@np-bingo/types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { GameContext } from '../../../context';
import { usePlaySocket, usePlaySounds, usePlayState, useSolo } from '.';
import { logger } from '../../../utils';

export function usePlay(gamemode: Gamemode, winner: Winner) {
  const { gamestate, mode, play } = useContext(GameContext);
  const {
    card,
    serial,
    crossmarks,
    initPlay,
    setCard,
    setWinningCrossmarks,
    toggleCrossmark,
  } = usePlayState();
  const [isConfetti, setIsConfetti] = useState(false);
  const { playWinSfx, playLoseSfx } = usePlaySounds();
  const { emitReadyUp, emitSendCard } = usePlaySocket();
  const [, soloSideEffects] = useSolo();

  /**
   * Start confetti
   */
  const confettiStart = () => {
    setIsConfetti(true);
  };

  /**
   * Stop confetti
   */
  const confettiStop = () => {
    setIsConfetti(false);
  };

  /**
   * Handles win
   */
  const handleWin = useCallback(() => {
    // TODO if (winner.methods.length <= 0) return;
    setWinningCrossmarks(winner);
    playWinSfx();
    confettiStart();
    logger('handle win');
  }, [playWinSfx, setWinningCrossmarks, winner]);

  /**
   * Handles lose
   */
  const handleLose = useCallback(() => {
    playLoseSfx();
  }, [playLoseSfx]);

  /**
   * Set Gamemode after routing
   */
  useEffect(() => {
    if (gamemode === 'default') return;
    mode(gamemode);
  }, [gamemode, mode]);

  /**
   * Sync Play gamestate with App gamestate
   */
  useEffect(() => {
    if (gamestate !== 'init') return;
    // Syncing Player View with Host Game State.
    initPlay();
    play('ready');
  }, [gamestate, initPlay, play]);

  /**
   * Set/Reset Play on Ready
   */
  useEffect(() => {
    if (gamestate !== 'ready') return;
    setCard();
    confettiStop();
  }, [gamestate, setCard]);

  /**
   * Multiplayer Side-effects
   */
  useEffect(() => {
    if (gamemode === 'solo') return soloSideEffects(handleWin, handleLose);
    switch (gamestate) {
      case 'standby':
        emitReadyUp();
        break;
      case 'validate':
        emitSendCard(card);
        break;
      case 'win':
        handleWin();
        play('end');
        break;
      case 'failure':
        handleLose();
        play('standby');
        break;
      default:
        break;
    }
  }, [
    gamestate,
    gamemode,
    card,
    winner,
    handleWin,
    handleLose,
    play,
    emitReadyUp,
    emitSendCard,
    soloSideEffects,
  ]);

  return { isConfetti, card, serial, crossmarks, setCard, toggleCrossmark };
}
