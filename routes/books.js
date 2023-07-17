const express = require('express');
const {
  getAllBooks,
  createBook,
  getSingleBook,
  deleteSingleBook,
  updateBook,
} = require('../controller/bookController');

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.get('/:id', getSingleBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteSingleBook);

module.exports = router;
