import { useContext } from 'react';
import { usePlaySounds, usePlayButton, useSolo } from '.';
import { GameContext } from '../../../context';

export function useSoloButton() {
  const { gamestate, play } = useContext(GameContext);
  const { triggerBall, enableProgress } = usePlayButton();
  const { playWinSfxData } = usePlaySounds();
  const [solo] = useSolo();

  /**
   * Trigger newBall when loop ball animation completes
   * @returns void
   */
  const soloOnProgressDone = (triggerBall: () => void) => {
    if (gamestate === 'start') return triggerBall();
  };

  /**
   * Solo handle primary button
   * @param gamestate
   * @returns
   */
  const soloHandlePrimaryButton = () => {
    switch (gamestate) {
      case 'start':
        play('pause');
        break;
      case 'ready':
        triggerBall();
        play('start');
        break;
      case 'end':
        playWinSfxData.stop();
        play('init');
        solo();
        break;
      default:
        play('start');
        enableProgress();
        break;
    }
  };

  const soloHandleSendCard = () => {
    // sendCard(card, user);
  };

  return {
    soloOnProgressDone,
    soloHandlePrimaryButton,
    soloHandleSendCard,
  };
}
