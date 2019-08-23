/*******
 Project 8 - SQL Library Manager
*******/

const express = require('express');
const Book = require('./models').Books;

const app = express();
const path = require('path')
const sequelize = require('./models').sequelize;

//setting the express view engine to pug files
app.set('view engine', 'pug');

//joining the views folder to the project
app.set('views', path.join(__dirname, "views")); 

// serving the static files to the public folder that uses express
app.use('/static', express.static('public'));

/**
 * setting up routes
**/

//redirecting the root route
app.get('/', (req, res) => {
    res.redirect('/books');
});

//render the books route
app.get('/books', async (req, res) => {
    try{
        const books = await Book.findAll();
        res.render('index', {books: books});
    } catch (error) {
        console.log('error getting books', error);
    }
});

//render the new book form
app.get('/books/new', (req, res) => {
    res.render('new-book', {book: Book.build()});
});

//post the created book
app.post('/books/new', async (req, res, next) => {
  const book = await Book.create(req.body)
    res.redirect('/books', book);
});

/* GET / retrieve book to update */
app.get(`/books/:id`, async (req, res, next) => {
  const book = await Book.findAll();
  res.render('update-book', { book });
});

/* PUT update book */
app.put('/:id', async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/books/' + book.id);
});

/* Delete book */
app.post('/books/:id/delete', async (req, res) => {
  const bookToDelete = await Book.findByPk(req.params.id);
  await bookToDelete.destroy();
  res.redirect('/books');
});



// //const { Book } = db.models;

// (async () => {
//   await db.sequelize.sync({ force: true });
//   try {
//       console.log('Adding book to database...');
//     const book = await Book.create({
//       title: 'Beloved',
//       author: 'Toni Morrison',
//       genre: 'Magical Realism',
//       year: 1987
//     });
//     console.log(book.toJSON());
//   } catch (error) {
//     console.error('Error connecting to the database: ', error);
//   }
// })();



//port listener
sequelize.sync()
    .then(() =>{
        const portNumber = 3000;
        app.listen(portNumber);
        console.log("App started on localhost at port " + portNumber);
    })


/** 
//creating the 404 status error
app.use((req, res, next) => {
    const err = new Error('Oops!');
    err.status = 404;
    next(err);
});

/** 
 * handling errors 
 * 
app.use('/error', (err,req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});



*/

