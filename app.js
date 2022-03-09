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

const APIRouter = require('./api/routes');
const dashboardRouter = require('./app/dashboard/router');
const categoryRouter = require('./app/category/router');
const orderRouter = require('./app/order/router');
const productRouter = require('./app/product/router');
const promoRouter = require('./app/promo/router');
const testimonialRouter = require('./app/testimonial/router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// temporary routes
app.get('/', (req, res) => {
  res.redirect('/dashboard');
})
app.use('/api', APIRouter);
app.use('/dashboard', dashboardRouter);
app.use('/category', categoryRouter);
app.use('/history-order', orderRouter);
app.use('/product', productRouter);
app.use('/promo', promoRouter);
app.use('/testimonial', testimonialRouter);

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