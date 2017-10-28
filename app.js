var express = require('express');
var https = require('https'); //require('tls');
var http = require('http');
var fs = require('fs');
var tls = require('tls');
var bodyParser = require('body-parser');
var path = require("path");

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
var port = process.env.PORT || 5000;

var DBPathLocal = "mongodb://localhost:27017/urbanjisho"
var DBPathProd = "mongodb://james:mongojames1@ds047752.mongolab.com:47752/heroku_wf7xgb1q"

if (!process.env.PORT) {
    mongoose.useMongoClient = DBPathLocal;
} else {
    mongoose.useMongoClient = DBPathProd;
}
mongoose.connect(DBPathLocal);

// Init kuroshiro for japanese text conversions
kuroshiro.init();

// app.use(require('less-middleware')('/less', {
//     dest: '/css',
//     pathRoot: path.join(__dirname, 'public')
// }));

app.use(express.static(__dirname + '/public'));
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

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('key-cert.pem')
};

// https.createServer(options, app).listen(8081);

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
app.post('/api/comment', comment.comment);

// profile api mappings
app.get('/api/profile/:userid', profile.read);
app.post('/api/profile/update', profile.update);
app.post('/api/profile/cancel', profile.cancelUpdate);

app.post('/api/profile/uploadProfilePicture', profile.saveProfilePicture);
app.get('/api/profile/image/:userid', profile.getProfilePictureUrl);

// CREATE
app.post('/users', function(req, res) {
    var user;
    console.log("POST: ");
    console.log(req.body);
    user = new UserModel({
        name: req.body.name
    });
    user.save(function(err) {
        if (!err) {
            console.log("created");
            return res.send("created");
        } else {
            console.log(err);
            return res.send("not created");
        }
    });
});

// READ
app.get('/users', function(req, res) {
    mongoose.model('users').find({}, function(err, users) {
        if (!err) {
            return res.send(users);
        } else {
            return console.log(err);
        }
    });
});

// UPDATE
app.post('/updateUser', function(req, res) {
    console.log(req.body);
    var oldName = req.body.oldName;
    var newName = req.body.newName;
    mongoose.model('users').update({
            name: oldName
        }, {
            name: newName
        },
        function(err, user) {
            if (!err) {
                return res.send({
                    "message": "Success",
                    "user": user
                });
            } else {
                return res.send("Error");
            }
        });
});

// DELETE
app.get('/deleteAllUsers', function(req, res) {
    mongoose.model('users').remove({}, function(err) {
        if (!err) {
            return res.send("All users deleted");
        } else {
            return res.send("error");
        }
    })
});

// use url in query exmaple
app.get('/posts/:userId', function(req, res) {
    mongoose.model('posts').find({
        user: req.params.userId
    }, function(err, posts) {
        res.send(posts);
    });
});
