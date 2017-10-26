var async = require('async');
var config = require('../../config');
var util = require('../../util.js');
var HttpStatus = require('http-status-codes');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kindaijiten@gmail.com',
    pass: 'kindaijitenEmail'
  }
});

var contact = {
  sendContactEmail: function (req, res) {
    var data = {};

    data.name = req.body.name || 'no name';
    data.email = req.body.email || 'no email';
    data.message = req.body.message ||'';

    var mailOptions = {
      to: 'kindaijiten+contact@gmail.com',
      subject: 'Contact from ' + data.name + ', ' + data.email,
      text: data.name + "\n\xA0\n\xA0" + data.email + "\n\xA0\n\xA0" + data.message
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        util.returnError(res, error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(HttpStatus.OK);
        res.send();
        return;
      }
    });
  }
}

module.exports = contact;
