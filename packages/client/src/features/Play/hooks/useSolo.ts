import { useCallback, useContext } from 'react';
import { GameContext } from '../../../context';
import { usePlayButton } from './usePlayButton';

export function useSolo(): [
  () => void,
  (handleWin: () => void, handleLose: () => void) => void
] {
  const { gamestate, play, mode, checkCard } = useContext(GameContext);
  const { pauseProgress } = usePlayButton();
  /**
   * Set Gamemode to solo
   */
  const solo = () => {
    mode('solo');
  };

  /**
   * Solo side-effects
   */
  const soloSideEffects = useCallback(
    (handleWin: () => void, handleLose: () => void) => {
      switch (gamestate) {
        case 'validate':
          // TODO pauseProgress();
          checkCard() ? handleWin() : handleLose();
          break;
        case 'pause':
          pauseProgress();
          break;
        case 'win':
          play('end');
          break;
        case 'failure':
          play('pause');
          break;
        case 'end':
          // setReplay(true);
          break;
        default:
          break;
      }
    },
    [gamestate, pauseProgress, checkCard, play]
  );

  return [solo, soloSideEffects];
}
