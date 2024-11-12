import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://hrcamilo11:PhOpXwbuwxeygN0B@cluster0.8kcjg.mongodb.net/TrackTex');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error');
    }
    process.exit(1);
  }
};

export default connectDB;