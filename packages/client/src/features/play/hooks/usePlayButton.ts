import { useContext, useEffect } from 'react';
import { BallContext, FeaturesContext, GameContext } from '../../../context';
import { useProgress } from '../../../hooks';
import { usePlaySounds, useSoloButton, usePlayEmitters } from '.';
import { GAME_OVER, STANDBY, CHECK_CARD } from '../../../config/constants';
import { Card } from '@np-bingo/types';

export function usePlayButton(card: Card) {
  const { ballDelay } = useContext(FeaturesContext);
  const { gamestate, gamemode, split, dispatch } = useContext(GameContext);
  const { ball } = useContext(BallContext);
  const { emitReadyUp, emitLeaveRoom, emitSendCard } = usePlayEmitters();
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
   * Multiplayer progress on new ball.
   * // TODO useProgress being in usePlayButton means this can't be moved to usePlay without a larger refactor
   */
  useEffect(() => {
    if (gamemode === 'solo') return;

    if (ball.number > 0) {
      enableProgress();
    }
  }, [gamemode, ball.number, enableProgress]);

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
  } = useSoloButton(triggerBallEffects, enableProgress, pauseProgress, card);

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
    if (gamemode === 'solo') return soloHandleSendCard();
    dispatch({ type: CHECK_CARD });
    emitSendCard(card);
  };

  /**
   * Leave room
   */
  const handleLeaveRoom = () => {
    if (gamemode === 'solo') return;
    emitLeaveRoom();
  };

  /**
   * Disabled validate button based on gamestate and rule set
   * @returns boolean
   */
  const disableSendCard = () => {
    if (gamestate === 'start') return false;
    if (split && gamestate === 'pause') return false;
    return true;
  };

  return {
    progress,
    inProgress,
    handlePrimaryButton,
    handleSendCard,
    handleLeaveRoom,
    disableSendCard,
  };
}
