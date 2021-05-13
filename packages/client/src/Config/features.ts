import { Special, Theme } from '@np-bingo/types';

interface Config {
  theme: Theme;
  allowSolo: boolean;
  share: boolean;
  publicRooms: boolean;
  specialRules: Special[];
  streamerMode: boolean;
  maxRoomSize: number;
  maxActiveGames: number;
  ballDelay: number;
  allowNewCard: boolean;
}

const config = {
  theme: 'dark', // Set initial theme 'light' or 'dark'
  allowSolo: true, // Allow solo mode
  share: true, // Allow shareable room links
  publicRooms: true, // TODO Allow public game rooms
  specialRules: [], // TODO Array of valid special rules
  streamerMode: false, // TODO Hide
  maxRoomSize: 30, // TODO
  maxActiveGames: 5, // TODO
  ballDelay: 5000, // Ball animation duration in milliseconds
  allowNewCard: false, // Allow players to draw a new random card
} as Config;

export default config;
