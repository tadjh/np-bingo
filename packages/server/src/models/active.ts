import { Room } from '@np-bingo/types';
import { Schema, model, Document } from 'mongoose';

export interface IActive extends Document {
  room: Room;
  name: string;
  // count: number;
  // private: boolean;
  joinable: boolean;
}
const ActiveSchema = new Schema(
  {
    room: String,
    name: String,
    // count: Number,
    // private: Boolean,
    joinable: Boolean,
  },
  { timestamps: true }
);
export default model<IActive>('Active', ActiveSchema);
