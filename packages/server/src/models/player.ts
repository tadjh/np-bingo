import { Schema, model, Document } from 'mongoose';
import { Player } from '@np-bingo/types';

type PlayerOmit = Omit<Player, 'socketId'>;
interface ModifiedPlayer extends PlayerOmit {
  socketId: string;
}

export type IPlayer = ModifiedPlayer & Document;

export const PlayerSchema = new Schema(
  {
    uid: Number,
    name: String,
    socketId: String,
    ready: Boolean,
    kicked: Boolean,
    leave: Boolean,
  },
  { timestamps: true }
);
export default model<IPlayer>('Player', PlayerSchema);
