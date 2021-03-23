import { Schema, model } from 'mongoose';

const StatusSchema = new Schema({
  public: [
    {
      room: String,
      name: String,
      count: Number,
    },
  ],
});
export default model('Status', StatusSchema);
