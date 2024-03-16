const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const apiRouter = require('./routes/apiRouter');
const handle404 = require('./middleware/handle404');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();

// Connect to DB
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => res.json({ message: 'Welcome! You can access the API on /api' }));
app.use('/api', apiRouter);

app.use(errorHandler);
app.use(handle404);

module.exports = app;
