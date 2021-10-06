import mongoose from 'mongoose';
import { DB_USER, DB_PASS, DB_URL, DB_NAME } from '.';

const db = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    console.log('MongoDB is Connected...');
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
