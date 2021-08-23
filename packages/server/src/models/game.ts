import { Schema, model, Document } from 'mongoose';
import { Room } from 'socket.io-adapter';
import { PlayerSchema, IPlayer } from './player';
import { WinnerSchema, IWinner } from './winner';

export interface IGame extends Document {
  room: Room;
  host: IPlayer;
  players: IPlayer[];
  winner: IWinner;
}

const GameSchema = new Schema({
  room: String,
  host: PlayerSchema,
  players: [PlayerSchema],
  winners: [WinnerSchema],
});
export default model<IGame>('Game', GameSchema);
