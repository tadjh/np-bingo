import { Schema, model, Document } from 'mongoose';
import { Room } from 'socket.io-adapter';
import { PlayerSchema, IPlayer } from './player';
import { WinnerSchema, IWinner } from './winner';

export interface IGame extends Document {
  room: Room;
  host: IPlayer;
  players: IPlayer[];
  winner: IWinner;
  active: boolean;
}

const GameSchema = new Schema(
  {
    room: String,
    active: Boolean,
    host: PlayerSchema,
    players: [PlayerSchema],
    winners: [WinnerSchema],
  },
  { timestamps: true }
);
export default model<IGame>('Game', GameSchema);
