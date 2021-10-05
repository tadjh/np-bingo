import { Schema, model } from 'mongoose';
// TODO Implement
const ActiveSchema = new Schema({
  room: String,
  name: String,
  count: Number,
  private: Boolean,
});
export default model('Active', ActiveSchema);
