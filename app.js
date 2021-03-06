// 引入依赖模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入express-sess中间件
const session = require("express-session");
// 引入multer中间件：上传文件
const multer = require("multer");


// 路由中间件 和用户相关的
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const captchaRouter = require('./routes/captcha.js');
const positionsRouter = require('./routes/positions');


// 创建express应用实例
const app = express();


// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用各中间件完成应用功能
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("yaya"));
// session配置：使用express-session中间件
app.set('trust proxy',1) /* trust first proxy */
app.use(session({
  secret:'yaya',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:45*60*1000}
}));


// 判断用户是否已经登录
app.use(function(req,res,next){
  /* 获取请求的url */
  const {url} = req;
// 判断
if(url.indexOf("/position")!==-1){
  /*获取在session中保存的登录用户信息 */
  const user = req.session.loginUser;
  if(!user){
    // res.sendFile(path.join(__dirname,"./public/index.html"));
    res.redirect("/");
    return false;
  }
}
  next();/* 执行下一步 */
});
// 指明静态资源储存位置
app.use(express.static(path.join(__dirname, 'public')));

/* 使用路由中间件 */
app.use('/', indexRouter); /* 访问项目根下资源 */
app.use('/users', usersRouter);/* 访问users目录下资源 */
app.use('/captcha', captchaRouter); // 访问captcha目录下资源
app.use('/positions', positionsRouter); // 访问positions目录下资源

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
