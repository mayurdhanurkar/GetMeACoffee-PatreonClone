// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(`mongodb://localhost:27017/coffee`
//       //if newurlParser is not used, it will show a warning in the console
//       // ,{  useNewUrlParser: true,}
//     );
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// }

// module.exports = connectDB;

import mongoose from "mongoose";

const cached = globalThis.mongooseCache ??= {
  conn: null,
  promise: null,
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
};

export default connectDB;