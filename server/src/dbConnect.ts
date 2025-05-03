import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

export default async function connectDB() {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB with Mongoose"))
    .catch((error: any) => {
      console.error("Failed to connect to MongoDB with Mongoose", error);
    });
}
