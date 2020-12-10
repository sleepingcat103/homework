var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/senddata',function(req,res){
  var username=req.query.username;   
  var phone=req.query.phone;
  var email=req.query.email;

  //接收參數設定//

  MongoClient.connect("mongodb://127.0.0.1",function(err,client){
    if(!err){
      //insert mongodb
      var db=client.db('myDemo').collection('userlist')
      db.insertOne({username:username,phone:phone,email:email},function(err,result){
        if(err){throw err }
      })
      //find mongodb
    }else{
      console.log('error');
    }
    res.end();//結束call back//
  })
  //connect with mongoDB test//
})

const url = "mongodb://localhost:27017/";
// Connect to the db
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("myDemo");
    dbo.collection("userlist").findOne({username : "tr5566tre"}, function(err, result) {
    if (err) throw err;
    console.log(result.phone);
    db.close();
  });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
