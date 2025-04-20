import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectMongo() {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to MongoDB');
  } catch (err) {
    console.error('mongo connection error:', err);
    throw err;
  }
}