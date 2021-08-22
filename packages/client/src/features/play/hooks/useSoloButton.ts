import { useContext } from 'react';
import { Card, Player } from '@np-bingo/types';
import { BallContext, GameContext, UserContext } from '../../../context';

export function useSoloButton(
  triggerBallEffects: () => void,
  enableProgress: () => void,
  pauseProgress: () => void
) {
  const { user } = useContext(UserContext);
  const { gamestate, play } = useContext(GameContext);
  const { newBall } = useContext(BallContext);

  /**
   * New Ball w/ Side Effects
   */
  const triggerBall = () => {
    newBall();
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
        play('start');
        break;
      case 'start':
        play('pause');
        pauseProgress();
        break;
      case 'win':
        play('ready');
        break;
      case 'end':
        // playWinSfxData.stop();
        play('ready');
        break;
      default:
        play('start');
        enableProgress();
        break;
    }
  };

  /**
   * Mocks sending card to host
   * @param card
   * @param dispatchSendCard
   */
  const soloHandleSendCard = (
    card: Card,
    dispatchSendCard: (card: Card, user: Player) => void
  ) => {
    pauseProgress();
    dispatchSendCard(card, user);
    enableProgress();
  };

  return {
    soloOnProgressDone,
    soloHandlePrimaryButton,
    soloHandleSendCard,
  };
}
