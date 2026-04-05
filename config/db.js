
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Exit if DB fails (important for reliability)
  }
};
export default connectDB;
