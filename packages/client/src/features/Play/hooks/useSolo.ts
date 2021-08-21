import { useCallback, useContext, useEffect } from 'react';
import { Gamemode } from '../../../../../types';
import { GameContext } from '../../../context';
import { usePlayButton } from './usePlayButton';

export function useSolo() {
  const { gamestate, play, mode, checkCard } = useContext(GameContext);
  // const { pauseProgress } = usePlayButton();
  /**
   * Set Gamemode to solo
   */
  const solo: Gamemode = 'solo';

  /**
   * Solo side-effects
   */
  const soloSideEffects = useCallback(
    (handleWin: () => void, handleLose: () => void) => {
      // switch (gamestate) {
      //   case 'validate':
      //     // TODO pauseProgress();
      //     checkCard() ? handleWin() : handleLose();
      //     break;
      //   case 'pause':
      //     // pauseProgress();
      //     break;
      //   case 'win':
      //     play('end');
      //     break;
      //   case 'failure':
      //     play('pause');
      //     break;
      //   case 'end':
      //     // setReplay(true);
      //     break;
      //   default:
      //     break;
      // }
    },
    []
  );

  return { solo, soloSideEffects };
}
