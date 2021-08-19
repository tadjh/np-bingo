import { useContext, useEffect } from 'react';
import useSound from 'use-sound';
import { SoundContext } from '../../../../../../../context';
import { scribbleSfx } from '../../../../../../../config/sounds';
import { useToggle } from '../../../../../../../hooks';

export function useCell(
  onClick: React.MouseEventHandler<HTMLDivElement>,
  override?: boolean
): [boolean, () => void, () => void] {
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
   * Force cells unchecked on win with override
   */
  useEffect(() => {
    if (override !== false) return;
    uncheck();
  }, [override, uncheck]);

  return [isChecked, toggleChecked, toggleSfx];
}