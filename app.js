const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false}, (e) => {
  if(e) { throw e }
  console.log('Connected to database!');
})

const categoryRouterAPI = require('./api/category/router');
const productRouterAPI = require('./api/product/router');
const orderRouterAPI = require('./api/order/router');
const promoRouterAPI = require('./api/promo/router');
const userRouterAPI = require('./api/user/router');
const testimonialRouterAPI = require('./api/testimonial/router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/category', categoryRouterAPI);
app.use('/api/product', productRouterAPI);
app.use('/api/order', orderRouterAPI);
app.use('/api/promo', promoRouterAPI);
app.use('/api/promo', userRouterAPI);
app.use('/api/user', userRouterAPI);
app.use('/api/testimonial', testimonialRouterAPI)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
