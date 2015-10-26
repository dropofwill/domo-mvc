var path = require('path');
var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose-bird')();

var dbURL = process.env.MONGOLAB_URI || 'mongodb://localhost/DomoMaker';
var db = mongoose.connect(dbURL, function(err) {
    if (err) {
      console.error('Could not connect to db');
      throw err;
    }
  });

var router = require('./router.js');
var port = process.env.PORT || process.env.NODE_PORT || 3000;

var app = express();
app.use('/assets', express.static(path.resolve(__dirname + '../../client/')))
  .use(compression())
  .use(bodyParser.urlencoded({extended: true}))
  .use(session({
    key: 'sessionid',
    secret: 'lol I\'m a secret',
    resave: true,
    saveUninitialized: true,
  }))
  .set('view engine', 'jade')
  .set('views', __dirname + '/views')
  .use(favicon(__dirname + '/../client/img/favicon.png'))
  .use(cookieParser())
  ;

router(app);

app.listen(port, function(err) {
  if (err) throw err;
  console.log('Listening on port: ', port);
});
