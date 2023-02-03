const express = require('express');
const connectDB = require('./config/db')

const app = express();
const port = 3000;

// Conecting to database
connectDB();

// Setting up the view engine
app.set('view engine', 'ejs');

// Setting up the static files
app.use(express.static('public'));

// helps us to get data from req.body
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

// Renderring the pages on requests
app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
