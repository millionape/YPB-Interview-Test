var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routers
var urlRouter = require('./routes/url');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

// middleware
var {isAuthenticate} = require('./middleware/autorization')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const connection = require('./db/db.config')
connection.once('open', () => console.log('DB Connected'))

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/url', urlRouter);
app.use('/admin',isAuthenticate, adminRouter);
app.use('/', indexRouter);

module.exports = app;
