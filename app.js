/*******
 Project 8 - SQL Library Manager
*******/

const express = require('express');
const Book = require('./models').Books;
const app = express();
const path = require('path')
const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

//setting the express view engine to pug files
app.set('view engine', 'pug');

//joining the views folder to the project
app.set('views', path.join(__dirname, "views")); 

// serving the static files to the public folder that uses express
app.use('/static', express.static('public'));

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * setting up routes
**/

//redirecting the root route
app.get('/', (req, res) => {
    res.redirect('/books');
});

//rendering the books route
app.get('/books', async (req, res) => {
    try{
        const books = await Book.findAll();
        res.render('index', {books: books});
    } catch (error) {
        res.render('page-not-found', { error })
    }
});

//rendering the new book form
app.get('/books/new', (req, res) => {
    res.render('new-book');
});

//post the created book
app.post('/books/new', async (req, res) => {
    try {
        const { title, author, genre, year } = req.body;
        await Book.create({
            title,
            author,
            genre,
            year
        }).then(() => {
            res.redirect('/')
        });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
          const errors = error.errors.map(err => err.message);
          res.render('error');
          console.error('Validation errors: ', errors);
        } else {
          throw error;
        }
      }
});

/* GET / retrieve book to update */
app.get('/books/:id', (req, res, next) => {
    Book.findByPk(req.params.id).then(book => {
        if(book) {
            res.render('update-book', { book }) 
        } else {
            const err = new Error();
            err.status = 404;
            next(err);
        }
    })
    .catch (err => {
        err.status = 500
        next(err);
    }) 
});

//update book
app.post('/books/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/');
});

/* Delete book */
app.post('/books/:id/delete', async (req, res) => {
  const bookToDelete = await Book.findByPk(req.params.id);
  await bookToDelete.destroy();
  res.redirect('/');
});

/*
 *  error handling
*/

//creating the 404 status error
app.use((req, res, next) => {
    const err = new Error('Oops! URL not found.');
    err.status = 404 || 500;
    next(err);
});

//non-matching error
app.use((err,req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('page-not-found');
});

//port listener
sequelize.sync().then(() =>{
    const portNumber = 3000;
    app.listen(portNumber);
    console.log("App started on localhost at port " + portNumber);
});