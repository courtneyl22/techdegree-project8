/*******
 * Project 8 - SQL Library Manager
*******/

const express = require('express');
const app = express();
const path = require('path')

//setting the express view engine to pug files
app.set('view engine', 'pug');

//joining the views folder to the project
app.set('views', path.join(__dirname, "views")); 

// serving the static files to the public folder that uses express
app.use('/static', express.static('public'));

//port listener
const portNumber = 3000;
app.listen(portNumber);
console.log("App started on localhost at port " + portNumber);
