import { Schema, model, Document } from 'mongoose';
import { Player } from '@np-bingo/types';

// TODO Does this work?
export type IPlayer = Player & Document;

export const PlayerSchema = new Schema({
  // uid: {
  //   type: Number,
  //   required: true,
  // },
  name: String,
  socketId: String,
});
export default model<IPlayer>('Player', PlayerSchema);
