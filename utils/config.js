require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
};
