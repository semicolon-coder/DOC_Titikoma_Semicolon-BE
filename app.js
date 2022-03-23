const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const multer = require('multer');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
require('dotenv').config();

// Connect to database MongoDB
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false}, (e) => {
  if(e) { throw e }
  console.log('Connected to database!');
})

// Create multer for storage when user uploaded the file
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  }
})

// Filtering file that user uploaded
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const app = express();

app.use(cors());

// Require router for page routes
const APIRouter = require('./api/routes');
const authRouter = require('./app/auth/router');
const dashboardRouter = require('./app/dashboard/router');
const categoryRouter = require('./app/category/router');
const orderRouter = require('./app/order/router');
const productRouter = require('./app/product/router');
const promoRouter = require('./app/promo/router');
const testimonialRouter = require('./app/testimonial/router');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.JWT_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ storage: fileStorage, fileFilter }).single('image'))

// Assign the routes
app.use('/', dashboardRouter);
app.use('/api', APIRouter);
app.use('/auth', authRouter);
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
