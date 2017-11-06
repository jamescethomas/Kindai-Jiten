var express = require('express');
var https = require('https'); //require('tls');
var http = require('http');
var fs = require('fs');
var tls = require('tls');
var bodyParser = require('body-parser');
var path = require("path");

// Get .env variables
require('dotenv').config();

var mongoose = require('mongoose');

var auth = require('./auth.js');
var users = require('./users.js');
var profile = require('./app/module/profile.js');

var kuroshiro = require('kuroshiro');
var dictionary = require('./app/module/dictionary.js');
var like = require('./app/module/like.js');
var contact = require('./app/module/contact.js');
var comment = require('./app/module/comment.js');

var app = express();
var port = process.env.PORT || 80;
var env = process.env.NODE_ENV || 'dev';

var DBPathLocal = "mongodb://localhost:27017/kindaijiten"
var DBPathProd = "mongodb://localhost:27017/kindaijiten"

var clientDir = path.resolve(__dirname, 'client/build');

if (env === 'production') {
  mongoose.useMongoClient = DBPathProd;
} else {
  mongoose.useMongoClient = DBPathLocal;
}
mongoose.connect(DBPathLocal);

// Init kuroshiro for japanese text conversions
kuroshiro.init();

app.use(function(req, res, next) {
  if(!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

app.use(express.static(clientDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.all('/api/*', [require('./validateRequest')]);

http.createServer(app).listen(port);

var options = {};
if (env === 'production') {
  options.key = fs.readFileSync('/etc/ssl/private/domain.key');
  options.cert = fs.readFileSync('/etc/ssl/certs/domain.crt');
  options.ca = fs.readFileSync('/etc/ssl/certs/intermediate.pem');
} else {
  options.key = fs.readFileSync('key.pem');
  options.cert = fs.readFileSync('key-cert.pem');
}

https.createServer(options, app).listen(443);

// non-auth api
app.post('/addWord', dictionary.create);
app.get('/words', dictionary.readAll);
app.get('/word/:word', dictionary.read);
app.post('/contact', contact.sendContactEmail);

// search
app.get('/searchWords', dictionary.readSearch);

// auth level admin
app.post('/api/admin/deleteWord', dictionary.deleteAdmin);

// user api mappings
app.post('/createNewUser', users.create);
app.post('/createNewUserFB', users.create_fb);
app.post('/login', auth.login);
app.post('/api/loginTest', users.loginTest);
app.post('/api/updateUserName', users.updateUserName);
app.post('/api/deleteWord', dictionary.delete);
app.post('/api/edit', dictionary.edit);
app.post('/api/like', like.like);
app.get('/likes', like.fetchLikes);

// Comments
app.post('/api/comment', comment.comment);
app.post('/api/deleteComment', comment.delete);
app.get('/comments', comment.fetchComments);

// profile api mappings
app.get('/api/profile/:userid', profile.read);
app.post('/api/profile/update', profile.update);
app.post('/api/profile/cancel', profile.cancelUpdate);

app.post('/api/profile/uploadProfilePicture', profile.saveProfilePicture);
app.get('/api/profile/image/:userid', profile.getProfilePictureUrl);

app.get('/*', function(req, res){
  res.sendFile(clientDir + '/index.html');
});
