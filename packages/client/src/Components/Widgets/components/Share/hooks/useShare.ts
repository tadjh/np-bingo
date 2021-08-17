import { useContext, useState } from 'react';
import useSound from 'use-sound';
import { SoundContext } from '../../../../../context';
import { buttonSfx } from '../../../../../config/sounds';

export function useShare(
  reference: HTMLInputElement | null,
  close: () => void
): [string, () => void, () => void, () => void] {
  const { volume, sounds } = useContext(SoundContext);
  const [isCopied, setIsCopied] = useState(false);
  const copyText = isCopied
    ? 'Link copied to clipboard!'
    : 'Click to copy link to clipboard';

  const [playSfx] = useSound(buttonSfx, {
    volume: volume,
    sprite: {
      buttonPress: [1000, 1000],
    },
    soundEnabled: sounds,
    playbackRate: 1.5,
  });

  const clickSfx = () => {
    playSfx({ id: 'buttonPress' });
  };

  /**
   * Focus link and copy value to keyboard
   * @returns
   */
  const copyToClipboard = () => {
    if (reference === null) return;
    reference.select();
    try {
      document.execCommand('copy');
      copy();
    } catch (err) {
      throw new Error('Error in copy code to clipboard');
    }
  };

  /**
   * Copy
   */
  const copy = () => {
    setIsCopied(true);
  };

  /**
   * Clear
   */
  const clear = () => {
    setIsCopied(false);
  };

  /**
   * Closes modal and resets copy
   */
  const handleClose = () => {
    close();
    clear();
  };

  return [copyText, clickSfx, handleClose, copyToClipboard];
}
