const { Book, validate } = require('../models/bookModel');
const { successResponse, errorResponse, formatJoiError } = require('../utils/response.message');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

// get all books
const getAllBooks = async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).json(successResponse(books));
};

// carete new book
const createBook = async (req, res) => {
  console.log(req.body);
  // const { error } = validate(req.body);
  // if (error) {
  //   const joiError = formatJoiError(error.details);
  //   return res.status(400).send(errorResponse(joiError, 400, 'Validation error.'));
  // }

  const { name, author, price, rating, isFeatured } = req.body;

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    const bookImage = files.image;

    const uploadCloudinary = await cloudinary.uploader.upload(bookImage.filepath, {
      use_filename: true,
      folder: 'Book',
    });

    try {
      const book = await Book.create({
        name: fields.name,
        author: fields.author,
        price: fields.price,
        rating: fields.rating,
        thumbnail: uploadCloudinary.secure_url,
        thumbnailId: uploadCloudinary.public_id,
        isFeatured,
      });
      res.status(200).json(successResponse(book));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

// get a single book
const getSingleBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(errorResponse({}, 404, 'Sorry, no book found.'));
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(400).json(errorResponse({}, 400, 'Sorry, no book found.'));
  }

  res.status(200).json(successResponse(book));
};

// update book
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(errorResponse({}, 404, 'Sorry, no book found.'));
  }

  const book = await Book.findByIdAndUpdate(id, { ...req.body }, { new: true });

  if (!book) {
    return res.status(400).json(errorResponse({}, 400, 'Sorry, no book found.'));
  }

  res.status(200).json(successResponse(book, 200, 'Book updated successfully.'));
};

// delete single book
const deleteSingleBook = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(errorResponse({}, 404, 'Sorry, no book found.'));
  }

  const book = await Book.findOneAndDelete({ _id: id });

  await cloudinary.uploader.destroy(book.thumbnailId);

  if (!book) {
    return res.status(400).json(errorResponse({}, 400, 'Sorry, no book found.'));
  }

  res.status(200).json(successResponse(book, 200, 'Book deleted successfully.'));
};

module.exports = {
  getAllBooks,
  createBook,
  getSingleBook,
  updateBook,
  deleteSingleBook,
};
