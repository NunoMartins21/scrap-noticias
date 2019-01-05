var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routers
var indexRouter = require('./routes/index');
var jornaisRouter = require('./routes/jornais');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// Jornais
app.use('/jornais', jornaisRouter);

module.exports = app;