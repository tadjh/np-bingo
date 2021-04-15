import { Schema, model, Document } from 'mongoose';
import { Room } from 'socket.io-adapter';
import { Winner } from '@np-bingo/types';
import { PlayerSchema, IPlayer } from './player';
import { WinnerSchema } from './winner';

export interface IGame extends Document<any, {}> {
  room: Room;
  host: IPlayer;
  players: IPlayer[];
  winner: Winner;
}

const GameSchema = new Schema({
  room: String,
  host: PlayerSchema,
  players: [PlayerSchema],
  winners: [WinnerSchema],
});
export default model<IGame>('Game', GameSchema);
