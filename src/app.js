var path = require('path');
var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var RedisStore = require('connect-redis')(session);
var url = require('url');
var csrf = require('csurf');

var dbURL = process.env.MONGOLAB_URI || 'mongodb://localhost/DomoMaker';
var db = mongoose.connect(dbURL, function(err) {
    if (err) {
      console.error('Could not connect to db');
      throw err;
    }
  });

var redisPass;
var redisURL = {
  hostname: 'localhost',
  port: 6379,
};

if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPass = redisURL.auth.split(':')[1];
}

var router = require('./router.js');
var port = process.env.PORT || process.env.NODE_PORT || 3000;

var app = express();
app.use('/assets', express.static(path.resolve(__dirname + '../../client/')))
  .use(compression())
  .use(bodyParser.urlencoded({extended: true}))
  .use(session({
    key: 'sessionid',
    store: new RedisStore({
      host: redisURL.hostname,
      port: redisURL.port,
      pass: redisPass,
    }),
    secret: 'lol I\'m a secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  }))
  .set('view engine', 'jade')
  .set('views', __dirname + '/views')
  .disable('x-powered-by')
  .use(favicon(__dirname + '/../client/img/favicon.png'))
  .use(cookieParser())
  .use(csrf())
  .use(function(err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    return;
  })
  ;

router(app);

app.listen(port, function(err) {
  if (err) throw err;
  console.log('Listening on port: ', port);
});
