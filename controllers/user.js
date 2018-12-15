const express = require('express');
var passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
var ObjectID = require('mongoose').Types.ObjectId;
var jwt = require('jsonwebtoken');
const Details = require('../models/details');
var nodemailer = require('nodemailer');
var lowerCase = require('lower-case');



module.exports.log = (req, res, next) => {
  Details.findOne({
    email: req.body.email
  }, function (err, user) {
    if (!user) {
      res.status(401).send({ success: false, msg: '-Authentication failed.User not found.-' });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        var token = jwt.sign(user.toJSON(), 'secretkey', { expiresIn: '24h' });
        res.json({ success: true, token: 'JWT ' + token, fname: user.fname });
      } else {
        res.status(401).send({ success: false, msg: '-Authentication failed. wrong password-.', token: true });
      }
    }
  });
}

module.exports.editdetail = (req, res, next) => {
  jwt.verify(req.params.token.split(' ')[1], 'secretkey', (err, authorizedData) => {
    if (err) {
      console.log('ERROR: Could not connect to the protected route');
      res.send({ success: false, msg: 'please log again' });
    } else {
      //console.log(authorizedData)
      return res.json({ data: authorizedData });
    }
  })
}//resetpwd
module.exports.resetpwd = (req, res, next) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  var pwd = req.params.password;
  var myquery = { password: pwd }
  var newvalues = { $set: { _id: req.params.id, password: hash } };
  Details.updateOne(myquery, newvalues, function (err, doc) {
    if (doc) {
      return res.status(401).send({ success: true, msg: 'successfully updated!' });
    } else {
      return res.status(401).send({ success: false, msg: 'cannot finish your request!!' });
    }
  });
}//mailverify
module.exports.mailverify = (req, res, next) => {
  // console.log(req.body.email)
  Details.findOne({
    email: req.body.email
  }, function (err, infor) {
    if (infor) {   ///resetpwd/:id/:password
      link ='http://localhost:3000/editpassword/'+ infor._id +'/'+infor.password;
      console.log(link)
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "charithprasanna009@gmail.com",
          pass: '0771034162'
        }
      });

     var mailOptions = {
        to: infor.email,
        from: "charithprasanna009@gmail.com",
        subject: 'Sending Email using Node.js',
        text:link
      }; 
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.json({ success: false, msg: 'message sending fail!!' })
        } else {
          console.log('Email sent: ' + info.response);
          return res.json({ success: true, msg: 'check your inbox and reset the pwd' })
        }
      });

    } else {
      return res.json({ success: false, msg: 'email incorrect!!' })
    }
  })
}//resetpwd


