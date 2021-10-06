import React, { Dispatch, SetStateAction } from 'react';
import features from '../config/features';

export interface SoundContextProps {
  volume: number;
  sounds: boolean;
  setVolume: Dispatch<SetStateAction<number>>;
  toggleSounds: () => void;
}

export const initialSoundContext: SoundContextProps = {
  volume: features.defaultVolume,
  sounds: features.sounds,
  setVolume: () => {},
  toggleSounds: () => {},
};

export const SoundContext = React.createContext(initialSoundContext);
