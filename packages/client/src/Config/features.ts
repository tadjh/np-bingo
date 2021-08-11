import { Special, Theme } from '@np-bingo/types';

interface Config {
  allowNewCard: boolean;
  allowSolo: boolean;
  ballDelay: number;
  defaultVolume: number;
  maxActiveGames: number;
  maxRoomSize: number;
  publicRooms: boolean;
  share: boolean;
  sounds: boolean;
  specialRules: Special[];
  streamerMode: boolean;
  theme: Theme;
}

const config = {
  allowNewCard: false, // Allow players to draw a new random card
  allowSolo: true, // Allow solo mode
  ballDelay: 5000, // Ball animation duration in milliseconds
  defaultVolume: 0.25,
  maxActiveGames: 5, // TODO
  maxRoomSize: 30, // TODO
  publicRooms: true, // TODO Allow public game rooms
  share: true, // Allow shareable room links
  sounds: true,
  specialRules: [], // TODO Array of valid special rules
  streamerMode: false, // TODO Hide
  theme: 'dark', // Set initial theme 'light' or 'dark'
} as Config;

export default config;
