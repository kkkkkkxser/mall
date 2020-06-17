var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var ejs = require('ejs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload')
var mallRouter = require('./routes/mall')
var getImgRouter = require('./routes/getImg')

var app = express();

// // 跨域
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
//   });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 引擎改为html
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 登录拦截,判断是否登录
// app.use(function(req,res,next){
//   if(req.cookies.userId){
//     next();
//   }else{
//     if(req.originalUrl=='/mall/login'){
//       next();
//     }else{
//       // this.$message.error("请先登录");
//       res.json({
//         status:'10001',
//         msg:'当前未登录',
//         result:''
//       })
//     }
//   }
// })
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter );
app.use('/mall',mallRouter)
app.use('/getImg',getImgRouter)


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

//app.js
// let express = require('express');
// let app = express();

module.exports = app;
