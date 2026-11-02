const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/coffee`
      //if newurlParser is not used, it will show a warning in the console
      // ,{  useNewUrlParser: true,}
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;