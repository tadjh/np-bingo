import { Schema, model, Document } from 'mongoose';
import { Player } from '@np-bingo/types';

type PlayerOmit = Omit<Player, 'socketId'>;
interface ModifiedPlayer extends PlayerOmit {
  socketId: string;
}

// TODO Does this work?
export type IPlayer = ModifiedPlayer & Document;

export const PlayerSchema = new Schema({
  // uid: {
  //   type: Number,
  //   required: true,
  // },
  name: String,
  socketId: String,
  ready: Boolean,
  kicked: Boolean,
  leave: Boolean,
});
export default model<IPlayer>('Player', PlayerSchema);
