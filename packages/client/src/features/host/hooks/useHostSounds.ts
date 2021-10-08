import { useContext } from 'react';
import useSound from 'use-sound';
import { dispenseSfx, connectionSfx } from '../../../config/sounds';
import { SoundContext } from '../../../context';
import { randomNumber } from '../../../utils';

export function useHostSounds() {
  const { volume, sounds } = useContext(SoundContext);

  const [playSfx] = useSound(dispenseSfx, {
    volume: volume,
    sprite: {
      dispenseBall1: [0, 2000],
      dispenseBall2: [250, 1750],
      dispenseBall3: [2000, 2000],
      dispenseBall4: [2250, 1750],
    },
    soundEnabled: sounds,
  });

  const playRandomSfx = () => {
    playSfx({ id: `dispenseBall${randomNumber(4)}` });
  };

  const [connectSfx] = useSound(connectionSfx, {
    volume: volume,
    sprite: {
      join: [0, 1000],
      leave: [1000, 1000],
      ready: [250, 750],
      send: [1250, 750],
    },
    soundEnabled: sounds,
  });

  const joinSfx = () => {
    connectSfx({ id: 'join' });
  };

  const leaveSfx = () => {
    connectSfx({ id: 'leave' });
  };

  const readySfx = () => {
    connectSfx({ id: 'ready' });
  };

  const sendSfx = () => {
    connectSfx({ id: 'send' });
  };

  return { playRandomSfx, joinSfx, leaveSfx, readySfx, sendSfx };
}
