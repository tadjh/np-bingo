import { Schema, model, Document } from 'mongoose';
import { SocketId } from 'socket.io-adapter';

export interface IPlayer extends Document<any, {}> {
  // uid: number;
  name: string;
  socketId: SocketId;
}

export const PlayerSchema = new Schema({
  // uid: {
  //   type: Number,
  //   required: true,
  // },
  name: String,
  socketId: Schema.Types.Mixed,
});
export default model<IPlayer>('Player', PlayerSchema);
