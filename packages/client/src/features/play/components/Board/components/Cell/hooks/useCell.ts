import { useContext, useEffect, MouseEvent } from 'react';
import useSound from 'use-sound';
import { SoundContext } from '../../../../../../../context';
import { scribbleSfx } from '../../../../../../../config/sounds';
import { useToggle } from '../../../../../../../hooks';

export function useCell(
  handleSetCoordinates: (event: MouseEvent<Element>) => void,
  winner: boolean,
  override?: boolean
) {
  const { volume, sounds } = useContext(SoundContext);
  const [isChecked, toggleChecked, , uncheck] = useToggle();

  const [playSfx] = useSound(scribbleSfx, {
    volume: volume,
    sprite: {
      scribble: [500, 500],
      erase: [1500, 500],
    },
    soundEnabled: sounds,
  });

  /**
   * Scribble
   */
  const scribble = () => {
    playSfx({ id: 'scribble' });
  };

  /**
   * Erase
   */
  const erase = () => {
    playSfx({ id: 'erase' });
  };

  /**
   * Toggles Scribble & Erase
   * Disabled sound on win
   * @returns void
   */
  const toggleSfx = () => {
    !isChecked ? scribble() : erase();
  };

  /**
   * Mouse Down handler
   * @param event
   * @returns
   */
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (winner) return;
    handleSetCoordinates(event);
    toggleSfx();
  };

  /**
   * Force cells unchecked on win with override
   */
  useEffect(() => {
    if (!winner) return;
    if (override !== false) return;
    uncheck();
  }, [winner, override, uncheck]);

  /**
   * Click handler
   * @param event
   * @returns void
   */
  const handleClick = () => {
    if (winner) return;
    toggleChecked();
    // onClick(event);
  };

  return { isChecked, handleClick, handleMouseDown };
}
