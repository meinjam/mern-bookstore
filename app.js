require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//express app
const app = express();

// routes
app.get('/', (req, res) => {
  res.json({ msg: 'welcome to the net ninja' });
});

//connected to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error(error.message);
  });

//listen for request
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
