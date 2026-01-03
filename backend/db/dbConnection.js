import mongoose from "mongoose";
// console.log(process.env.MONGO_URI);

const connectDb = async () => {
  try {
    const instanceDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "MongoDB connected Successfully on !",
      instanceDB.connection.host
    );
  } catch (error) {
    console.log("Error occured in connecting to mongoDB", error);
  }
};

export default connectDb;
