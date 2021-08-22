import { useContext } from 'react';
import { BallContext, FeaturesContext, GameContext } from '../../../context';
import { useProgress } from '../../../hooks';
import { usePlaySounds, useSoloButton, usePlayEmitters } from '.';
import { Card, Player } from '@np-bingo/types';

export function usePlayButton(
  card: Card,
  dispatchSendCard: (card: Card, user: Player) => void
) {
  const { ballDelay } = useContext(FeaturesContext);
  const { gamemode, play } = useContext(GameContext);
  const { ball } = useContext(BallContext);
  const { emitLeaveRoom } = usePlayEmitters();
  const { playRandomSfx } = usePlaySounds();

  /**
   * Loop ball animation and trigger newBall in solo mode
   * @returns When ball number is 0
   */
  const onProgressDone = () => {
    if (ball.remainder === 0) return play('end');
    if (gamemode === 'solo') return soloOnProgressDone();
  };

  const { progress, inProgress, enableProgress, pauseProgress } = useProgress(
    ballDelay,
    onProgressDone
  );

  /**
   * New ball side effects
   */
  const triggerBallEffects = () => {
    playRandomSfx();
    enableProgress();
  };

  const { soloOnProgressDone, soloHandlePrimaryButton, soloHandleSendCard } =
    useSoloButton(triggerBallEffects, enableProgress, pauseProgress);

  /**
   * Sets gamestate based on current gamestate
   */
  const handlePrimaryButton = () => {
    if (gamemode === 'solo') return soloHandlePrimaryButton();
    return play('standby');
  };

  /**
   * Wrapper function for sendCard
   */
  const handleSendCard = () => {
    if (gamemode === 'solo') soloHandleSendCard(card, dispatchSendCard);
    play('validate');
    // TODO emit send card
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
    handlePrimaryButton,
    handleSendCard,
    handleLeaveRoom,
  };
}
