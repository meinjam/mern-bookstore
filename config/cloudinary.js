const cloudinary = require('cloudinary').v2;
const configuration = require('../utils/config');

const initalizeCloudinary = () => {
  cloudinary.config({
    cloud_name: configuration.CLOUD_NAME,
    api_key: configuration.CLOUD_API_KEY,
    api_secret: configuration.CLOUD_API_SECRET,
  });
};

module.exports = initalizeCloudinary;
