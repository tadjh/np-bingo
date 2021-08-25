import { useContext } from 'react';
import { Card } from '@np-bingo/types';
import { BallContext, GameContext, UserContext } from '../../../context';
import {
  GET_CARD,
  NEW_BALL,
  PAUSE,
  READY_CHECK,
  START,
} from '../../../config/constants';
import { PlayContext } from '../../../context/PlayContext';

export function useSoloButton(
  triggerBallEffects: () => void,
  enableProgress: () => void,
  pauseProgress: () => void
) {
  const { user } = useContext(UserContext);
  const { gamestate, dispatch } = useContext(GameContext);
  const { card } = useContext(PlayContext);
  const { newBall } = useContext(BallContext);

  /**
   * New Ball w/ Side Effects
   */
  const triggerBall = () => {
    const currentBall = newBall();
    dispatch({
      type: NEW_BALL,
      payload: currentBall,
    });
    triggerBallEffects();
  };

  /**
   * Trigger newBall when loop ball animation completes
   * @returns void
   */
  const soloOnProgressDone = () => {
    if (gamestate === 'start') return triggerBall();
  };

  /**
   * Solo handle primary button
   * @param gamestate
   * @returns
   */
  const soloHandlePrimaryButton = () => {
    switch (gamestate) {
      case 'ready':
        triggerBall();
        break;
      case 'start':
        dispatch({ type: PAUSE });
        pauseProgress();
        break;
      case 'win':
        dispatch({ type: READY_CHECK });
        break;
      case 'end':
        dispatch({ type: READY_CHECK });
        // playWinSfxData.stop(); // TODO ??
        break;
      default:
        dispatch({ type: START });
        enableProgress();
        break;
    }
  };

  /**
   * Mocks sending card to host
   * @param card
   * @param dispatchSendCard
   */
  const soloHandleSendCard = () => {
    pauseProgress();
    dispatch({ type: GET_CARD, payload: { card: card, owner: user } });
    enableProgress();
  };

  return {
    soloOnProgressDone,
    soloHandlePrimaryButton,
    soloHandleSendCard,
  };
}
