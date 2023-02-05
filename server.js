const express = require('express');
const connectDB = require('./config/db')
const auth = require('./middleware/auth');
const notauth = require('./middleware/notauth');

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


// Handling route requests
app.use('/', require('./routes/login'));
app.use('/', require('./routes/register'));

// Renderring the pages on requests
app.get('/', auth, (req, res) => res.render('index'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
