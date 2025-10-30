import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
  } catch (error) {
    console.log("MongoDB connection Error", error);
    process.exit(1);
  }
};
