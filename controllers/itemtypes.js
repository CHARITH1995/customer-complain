const express = require('express');
var passport = require('passport');
const routerComplain = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Items = require('../models/itemtypes');
var jwt = require('jsonwebtoken');


module.exports.additemtype = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            //console.log(req.body)
            Items.findOne({
                name: req.body.name
            }).then(function (doc) {
                if (doc) {
                    return res.json({ success: false, msg: 'Item type already exists!' })
                } else {
                    Items.findOne({
                        identifier: req.body.identifier
                    }).then(function (doc) {
                        if (doc) {
                            return res.json({ success: false, msg: 'Please select another color!' })
                        } else {
                            var today = new Date();
                            var det = new Items({
                                name: req.body.name,
                                identifier: req.body.identifier,
                                date: Date.now()
                            });
                            det.save((err, doc) => {
                                if (!err) {
                                    return res.json({ success: true, msg: 'new Item type inserted!!' })
                                }
                                else {
                                    return res.json({ success: false, msg: 'ERROR!!' })
                                }
                            })
                        }

                    })
                }
            })
        }
    });
}
module.exports.itemtypes = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Items.find().then(function (details) {
                //console.log(details)
                if (details.length == 0) {
                    res.send({ success: false, msg: 'no Items Types' });
                } else {
                    res.send({ success: true, data: details });
                }
            })

        }
    });
}//removeitemtypes
module.exports.removeitemtypes = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Items.findOneAndDelete({ _id: req.params.id }).then(function (err) {
                //console.log(err)
                if (!err) {
                    res.send({ success: false, msg: 'not success' });
                } else {
                    res.send({ success: true, msg: 'delete successfully' });
                }
            })

        }
    });

}//editcustomer