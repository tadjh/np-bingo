import React from 'react';
import features from '../config/features';

export interface SoundContextProps {
  volume: number;
  sounds: boolean;
  toggleSounds: () => void;
}

export const initialSoundContext: SoundContextProps = {
  volume: features.defaultVolume,
  sounds: features.sounds,
  toggleSounds: () => {},
};

export const SoundContext = React.createContext(initialSoundContext);
