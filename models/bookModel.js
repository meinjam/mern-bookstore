const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    author: {
      type: String,
      minLength: 2,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    thumbnailId: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.thumbnailId;
  },
});

const validateBook = (book) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().label('book name'),
    author: Joi.string().min(2).max(100).required().label('book author'),
    price: Joi.number().max(100000).required().label('book price'),
    rating: Joi.number().min(1).max(5).required().label('book rating'),
    isFeatured: Joi.boolean(),
  }).options({ abortEarly: false });

  return schema.validate(book);
};

const Book = mongoose.model('Book', bookSchema);

module.exports = {
  Book,
  validate: validateBook,
};
