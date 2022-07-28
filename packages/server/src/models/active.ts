import { Room } from '@np-bingo/types';
import { Schema, model, Document } from 'mongoose';

export interface IActive extends Document {
  gameId: string;
  room: Room;
  name: string;
  joinable: boolean;
}
const ActiveSchema = new Schema(
  {
    gameId: String,
    room: String,
    name: String,
    joinable: Boolean,
  },
  { timestamps: true }
);
export default model<IActive>('Active', ActiveSchema);
