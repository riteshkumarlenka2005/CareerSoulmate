import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lenkariteshkumar2005:B6NkQkTGJ1exEE4i@clustercareersoulmate.jqxh8yt.mongodb.net/careersoulmate?appName=ClusterCareerSoulmate');
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
