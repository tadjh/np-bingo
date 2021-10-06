import { Schema, model, Document } from 'mongoose';
import { Card, Method, Results } from '@np-bingo/types';
import { IPlayer, PlayerSchema } from './player';

export interface IWinner extends Document {
  methods: Method[];
  data: Results;
  player: IPlayer;
  card: Card;
}

export const WinnerSchema = new Schema(
  {
    methods: [String],
    data: {
      column: Schema.Types.Mixed,
      diagonal: Schema.Types.Mixed,
      row: Schema.Types.Mixed,
    },
    player: PlayerSchema,
    card: [Number],
  },
  { timestamps: true }
);
export default model<IWinner>('Winner', WinnerSchema);
