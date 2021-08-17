import { useCallback, useContext } from 'react';
import { BallContext, FeautresContext, GameContext } from '../../../context';
import { useProgress } from '../../../hooks';
import { usePlaySounds, useSoloButton, usePlaySocket } from '.';

export function usePlayButton() {
  const { ballDelay } = useContext(FeautresContext);
  const { gamemode, play } = useContext(GameContext);
  const { ball, newBall } = useContext(BallContext);
  const { soloOnProgressDone, soloHandlePrimaryButton, soloHandleSendCard } =
    useSoloButton();
  const { emitLeaveRoom } = usePlaySocket();
  const { playRandomSfx } = usePlaySounds();

  /**
   * New Ball w/ Side Effects
   */
  const triggerBall = () => {
    newBall();
    triggerBallEffects();
  };

  /**
   * Loop ball animation and trigger newBall in solo mode
   * @returns When ball number is 0
   */
  const onProgressDone = () => {
    if (ball.remainder === 0) return play('end');
    if (gamemode === 'solo') return soloOnProgressDone(triggerBall);
  };

  const { progress, inProgress, enableProgress, pauseProgress } = useProgress(
    ballDelay,
    onProgressDone
  );

  /**
   * New ball side effects
   */
  const triggerBallEffects = useCallback(() => {
    playRandomSfx();
    enableProgress();
  }, [playRandomSfx, enableProgress]);

  /**
   * Sets gamestate based on gamestate
   */
  const handlePrimaryButton = () => {
    if (gamemode === 'solo') return soloHandlePrimaryButton();
    return play('standby');
  };

  /**
   * Wrapper function for sendCard
   */
  const handleSendCard = () => {
    if (gamemode === 'solo') soloHandleSendCard();
    // default & solo
    // TODO is this best way or socket.io emit directly?
    play('validate');
  };

  const handleLeaveRoom = () => {
    if (gamemode === 'solo') return;
    emitLeaveRoom();
  };

  return {
    progress,
    inProgress,
    enableProgress,
    pauseProgress,
    triggerBall,
    triggerBallEffects,
    handlePrimaryButton,
    handleSendCard,
    handleLeaveRoom,
  };
}
