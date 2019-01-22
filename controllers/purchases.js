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
               // console.log(details)
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
}//getpurch