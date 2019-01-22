const express = require('express');
var passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
var ObjectID = require('mongoose').Types.ObjectId;
var jwt = require('jsonwebtoken');
const Details = require('../models/details');
const Complain = require('../models/Complains');
var lowerCase = require('lower-case');
const Stores = require('../models/stores');

module.exports.complainreport = (req, res, next) => {
    var today = new Date();
    var num;
    var thismonth = today.getMonth()+1; //January is 0!
    console.log(thismonth)
    var thisyear = today.getFullYear();
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
          Complain.aggregate([{$match:{month:thismonth,year:thisyear}},{$group:{_id:{subarea:"$subarea",color:"$color"},total:{$sum:1}}}]).then(function(details){
            res.json(details);
          })
             }
        });
}
module.exports.salesreport = (req, res, next) => {
    var today = new Date();
    var num;
    var thismonth = today.getMonth()+1; //January is 0!
    var thisyear = today.getFullYear();
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            res.send({success:false,msg:'please log again'});
        } else {
            Stores.aggregate([{$group:{_id:{item:"$item",color:"$identifier",soldqty:"$soldqty"}}}]).then(function(details){
                 res.json(details);
            })
                 }
            });
    }
    module.exports.manualreports=(req, res, next) => {
    var reqmonth = parseInt(req.params.month);
    var reqyear = parseInt(req.params.year);
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            res.send({success:false,msg:'please log again'});
        } else {
        Complain.aggregate([{$match:{month:reqmonth,year:reqyear}},{$group:{_id:{subarea:"$subarea",color:"$color"},total:{$sum:1}}}]).then(function(details){
            res.json(details)
        })
           
             }
        });
}

    module.exports.manualsubareareports = (req, res, next) => {
        jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
            if(err){
                console.log('ERROR: Could not connect to the protected route');
                res.send({success:false,msg:'please log again'});
            } else {
                Complain.aggregate([{$match:{subarea:req.params.subarea}},{$group:{_id:{status:"$status"},total:{$sum:1}}}]).then(function(details){
                    res.json(details);
                  })
                     }
                });
        }