const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbSetup');
const router = require('./routes/index');

dotenv.config({ path: './config/config.env' });

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});