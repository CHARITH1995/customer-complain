const express = require('express');
var passport = require('passport');
const stores = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Stores = require('../models/stores');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

let imagepath = '';



const storage = multer.diskStorage({
    destination: './src/upload',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }

});

//Init Upload

const upload = multer({
    storage: storage

}).single('file');

module.exports.addnewItem = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            upload(req, res, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    imagepath = req.file.filename;

                }
            });
        }
    });

}
module.exports.addnewDetail = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.findOne({
                serialnumber: req.body.serialnumber
            }, function (err, snum) {
                if (snum) {
                    res.status(401).send({ success: false, msg: 'check your serial number once again!!' });
                } else {
                    var today = new Date();
                    var month = today.getMonth()+1;
                    var year = today.getFullYear();
                    const Store = new Stores({
                        brand: req.body.brand,
                        color: req.body.color,
                        price: req.body.price,
                        item: req.body.Item,
                        imagepath:imagepath,
                        insertdate:Date.now(),
                        description: req.body.description,
                        serialnumber: req.body.serialnumber
                    });
                    Store.save((err, doc) => {
                        if (!err) {
                            res.json({ success: true, msg: 'successfully inserted!!'});
                        }
                        else {
                            res.json({ success: false, msg: 'check your inputs'});
                        }
                    });
                }
            })
        }
    });

}