import { Special, Theme } from '@np-bingo/types';

export interface Config {
  allowNewCard: boolean;
  allowPublic: boolean;
  allowShare: boolean;
  allowSolo: boolean;
  ballDelay: number;
  defaultVolume: number;
  maxActiveGames: number;
  maxRoomSize: number;
  showCredit: boolean;
  sounds: boolean;
  specialRules: Special[];
  streamerMode: boolean;
  theme: Theme;
}

const config: Config = {
  allowNewCard: false, // Allow players to draw a new random card
  allowPublic: true, // TODO Allow public game rooms
  allowShare: true, // Allow shareable room links
  allowSolo: true, // Allow solo mode
  ballDelay: 5000, // Ball animation duration in milliseconds
  defaultVolume: 0.25, // Default sound volume
  maxActiveGames: 5, // TODO
  maxRoomSize: 30, // TODO
  showCredit: false,
  sounds: true, // default sounds enabled
  specialRules: [], // TODO Array of valid special rules
  streamerMode: false, // TODO Streamer mode default
  theme: 'dark', // Set default theme 'light' or 'dark'
};

export default config;
