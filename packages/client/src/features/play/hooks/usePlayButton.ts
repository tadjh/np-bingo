import { useContext } from 'react';
import { BallContext, FeaturesContext, GameContext } from '../../../context';
import { useProgress } from '../../../hooks';
import { usePlaySounds, useSoloButton, usePlayEmitters } from '.';
import { GAME_OVER, STANDBY, CHECK_CARD } from '../../../config/constants';

export function usePlayButton() {
  const { ballDelay } = useContext(FeaturesContext);
  const { gamemode, dispatch } = useContext(GameContext);
  const { ball } = useContext(BallContext);
  const { emitReadyUp, emitLeaveRoom } = usePlayEmitters();
  const { playRandomSfx } = usePlaySounds();

  /**
   * Loop ball animation and trigger newBall in solo mode
   * @returns When ball number is 0
   */
  const onProgressDone = () => {
    if (ball.remainder === 0) return dispatch({ type: GAME_OVER });
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

  const {
    soloOnProgressDone,
    soloHandlePrimaryButton,
    soloHandleSendCard,
  } = useSoloButton(triggerBallEffects, enableProgress, pauseProgress);

  /**
   * Sets gamestate based on current gamestate
   */
  const handlePrimaryButton = () => {
    if (gamemode === 'solo') return soloHandlePrimaryButton();
    dispatch({ type: STANDBY });
    emitReadyUp();
  };

  /**
   * Wrapper function for sendCard
   */
  const handleSendCard = () => {
    if (gamemode === 'solo') soloHandleSendCard();
    dispatch({ type: CHECK_CARD });
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
