import mongoose from "mongoose";

const connectToDb = async (url) => {
  return await mongoose.connect(url);
};

export default connectToDb;
