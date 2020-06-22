const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbSetup');

dotenv.config({ path: './config/config.env' });

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});