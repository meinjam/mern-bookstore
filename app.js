const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/books');
const initalizeCloudinary = require('./config/cloudinary');

//express app
const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

initalizeCloudinary();

// routes
app.get('/', (req, res) => {
  res.json({ msg: 'welcome to book store' });
});

app.use('/api/books', bookRoutes);

//connected to db
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error(error.message);
  });

module.exports = app;
