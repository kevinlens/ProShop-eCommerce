import mongoose from 'mongoose';

//mongoose connect to to DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connect: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    //passing in 1 means we are exiting the failure
    process.exit(1);
  }
};

export default connectDB;
