const { Router } = require('express');
const { Book } = require('../models').Book;

const router = new Router();

/* POST create book */
router.post('/', (req, res, next) => {
  res.redirect('/books/' + book.id);
});

/* GET / retrieve book to update */
router.get('/:id/edit', async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  res.render('books/edit', { book, title: 'Edit book' });
});

/* PUT update book */
router.put('/:id', async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/books/' + book.id);
});

/* Delete book */
router.post('/books/:id/delete', async (req, res) => {
  const bookToDelete = await Book.findByPk(req.params.id);
  await bookToDelete.destroy();
  res.redirect('/books');
});