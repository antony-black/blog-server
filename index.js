require('dotenv').config();

const express = require( 'express');
const mongoose = require( 'mongoose')
const cookieParser = require( 'cookie-parser');
const cors =require('cors')
const router = require('./router/index.js');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    app.listen(PORT, () => {
      console.log(`Server has been started on PORT = ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
