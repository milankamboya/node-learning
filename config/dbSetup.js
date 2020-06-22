const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(`mongo db connection done with ${conn.connection.host}`);
  } catch (error) {
    console.log(`error while database connection`)
    process.exit(1);
  }
};

module.exports = connectDB;