const express = require('express');
var passport = require('passport');
const stores = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Stores = require('../models/stores');
const Stock = require('../models/stock');
const Purchase = require('../models/purch');
const Items = require('../models/itemtypes');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

module.exports.viewpurch = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Purchase.aggregate([{$match:{purchqty:{$gt:0}}}]).then(details=>{
                if (details.length === 0) {
                    return res.json({ success: false, msg: 'No purchases' })
                } else {
                    return res.json({success:true,data:details })
                }
            })
        }
    });
}

module.exports.getpurch = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Purchase.findOne({
                _id:req.params.id
            }).then(details=>{
                return res.json(details)
            })
        }
    });
}
module.exports.item = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Purchase.aggregate([{$match:{item:req.params.item,purchqty:{$gt:0}}}]).then(details=>{
                if(details.length !=0){
                    return res.json({success:true , data:details[0]})
                }else{
                    return res.json({success:false , msg:'No purchases suggested to this item'})
                }
            })
        }
    });
}
module.exports.purchases = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Purchase.find().then(function (details) {
                if (details.length == 0) {
                    res.send({ success: false, msg: 'no purchases to show' });
                } else {
                    res.send({ success: true, data:details });
                }
            })
        }
    });
}
module.exports.update = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            var condition = {_id:req.params.id}
            Purchase.updateOne(condition,req.body).then(doc =>{    
                if(doc){
                  return res.json({ success: true, msg:'Delivery updated!' });
                }else{
                  return res.json({ success: false, msg:'cannot finish your request!!' }); 
                }
            })
        }
    });
}