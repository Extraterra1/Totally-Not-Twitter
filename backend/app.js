const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./routes/apiRouter');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.json({ message: 'Welcome! You can access the API on /api' }));
app.use('/api', apiRouter);

module.exports = app;
