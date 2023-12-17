import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB is connected");
  } catch (error) {
    mongoose.disconnect();
    process.exit();
  }
};
