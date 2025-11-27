import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.dbURI + 'zomatodb');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
