var path = require('path');
var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
