const express = require('express');
var passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
var ObjectID = require('mongoose').Types.ObjectId;
var jwt = require('jsonwebtoken');
const Details = require('../models/details');

var lowerCase = require('lower-case');

module.exports.log = (req, res, next) => {
      Details.findOne({
        email: req.body.email
      }, function (err, user) {
        if (!user) {
          res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            var token = jwt.sign(user.toJSON(), 'secretkey', { expiresIn: '24h' });
            res.json({ success: true, token: 'JWT ' + token, fname: user.fname });
          } else {
            res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.', token: true });
          }
        }
      });
}


/*router.delete('/del/:id',function(req,res,next){
    Details.findByIdAndRemove({_id:req.params.id}).then(function(details){
        res.send(details);
    });   
});
*/