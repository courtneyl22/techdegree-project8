# techdegree-project8
 SQL-Library Manager

Here is my SQL Library Manager.This project required me to do the following:

Setup and Initialize Project
- The .gitignore file is in place and the node_modules folder is not stored in the repo.
- Running npm install adds all necessary dependencies.
- Running npm start launches the app.

Models
- Project includes the following Sequelize Model and properties:
  1. Book
    a. title - string
    b. author - string
    c. genre - string
    d. year - integer
- Uses the appropriate Model validation to ensure that the title and author properties will have values when the form is submitted.

Routes
- Project contains at least the following routes:
  1. / - get
  2. /books - get
  3. /books/new - get
  4. /books/new - post
  5. /books/:id - get
  6. /books/:id - post
  7. /books/:id/delete - post

Views
- Project contains at least the following views:
  1. layout.pug
  2. index.pug
  3. new-book.pug
  4. update-book.pug
  5. error.pug
  6. page-not-found.pug
  
Form Fields
- If title or author fields are empty, form will not submit and page shows friendly error message.
- Forms employ Sequelize Model validation rather than HTML’s built in validation.
- Clicking on an input’s label brings focus to corresponding input.

Errors
- If routing to a non-existent book id, project uses a global error handler to render a friendly error page.
- If navigating to a non-existent route like /error, the project renders a user friendly "Page Not Found" page.

Styles and Layout
- Project uses supplied styles.
- General layout matches example markup pages.
