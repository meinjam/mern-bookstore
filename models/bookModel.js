const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      required: true,
    },
    description: {
      type: String,
      minLength: 5,
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
  },
});

const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required().label('book name'),
    description: Joi.string().min(5).max(255).required().label('book description'),
    isFeatured: Joi.boolean(),
  }).options({ abortEarly: false });

  return schema.validate(book);
};

const Book = mongoose.model('Book', bookSchema);

module.exports = {
  Book,
  validate: validateBook,
};
