var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');
const fileUpload = require('express-fileupload');


var adminRouter = require('./routes/admin');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var courierRouter = require('./routes/courier');
var orderRouter = require('./routes/orders');
var notificationRouter = require('./routes/notification');
var supplierRouter = require('./routes/supplier');
var supervisorRouter = require('./routes/supervisor');
var customerRouter = require('./routes/customer');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors(
  {
    
  origin:['http://localhost:3000','http://192.168.56.1:3000','https://localhost:8080','http://localhost:8081','https://localhost:8081'],

  methods:['GET','POST','DELETE', 'PATCH'],
  credentials: true

}        
));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',resave: true,saveUninitialized: true, proxy:true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/courier', courierRouter);
app.use('/order', orderRouter);
app.use('/notification', notificationRouter);
app.use('/supplier', supplierRouter);
app.use('/supervisor', supervisorRouter);
app.use('/customer', customerRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}else{
  app.get("/",(req,res)=>{
    res.send("Api running");
  })
}


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.use(function(){

//console.log(__dirname);

/**var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var dt = date.getDate();

console.log("Year :"+ year);
console.log("Month :"+ month);
console.log("Date :"+ dt); */



module.exports = app;
