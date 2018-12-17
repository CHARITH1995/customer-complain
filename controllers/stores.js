const express = require('express');
var passport = require('passport');
const stores = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Stores = require('../models/stores');
const Items = require('../models/itemtypes');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

let imagename = '';
let number;
const storage = multer.diskStorage({
    destination: './client/public/stores',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
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
                    imagename = req.file.filename;
                }
            });
        }
    });
}
module.exports.addnewDetail = (req, res, next) => {

    //console.log(path)
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.findOne({
                serialnumber: req.body.serialnumber
            }, function (err, snum) {
                if (snum) {
                    console.log(snum)
                    res.status(401).send({ success: false, msg: 'check your serial number once again!!' });
                } else {
                    Stores.findOne({
                        imagepath: imagename
                    }, function (err, path) {
                        if (path) {
                            res.status(401).send({ success: false, msg: 'change your image name!!' });
                        } else {
                            var indenfier;
                            console.log(req.body.Item)
                            Items.findOne({
                                name: req.body.Item
                            }).then(function (doc) {
                                if (doc) {
                                    console.log(doc.identifier)
                                    var today = new Date();
                                    var month = today.getMonth() + 1;
                                    var year = today.getFullYear();
                                    const store = new Stores({
                                        brand: req.body.brand,
                                        color: req.body.color,
                                        price: req.body.price,
                                        item: req.body.Item,
                                        identifier: doc.identifier,
                                        imagepath:imagename,
                                        insertdate: Date.now(),
                                        authorize_by: req.body.authorize_by,
                                        description: req.body.description,
                                        serialnumber: req.body.serialnumber
                                    });
                                    console.log(imagename)
                                    store.save((err, doc) => {
                                        if (!err) {
                                            res.json({ success: true, msg: 'successfully inserted!!' });
                                        }
                                        else {
                                            res.json({ success: false, msg: 'check your inputs' });
                                        }
                                    });

                                }
                            });
                        }
                    })
                }
            })
        }
    });//store.viewitems
}
module.exports.updatedetails = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Items.findOne({
                name: req.body.Item
            }).then(function (doc) {
                if (doc) {
                    Stores.update({
                        brand: req.body.brand,
                        color: req.body.color,
                        price: req.body.price,
                        item: req.body.Item,
                        identifier: doc.identifier,
                        imagepath:imagename,
                        description: req.body.description,
                        serialnumber: req.body.serialnumber
                    }).then(function(data){
                        if(data){
                            return res.json({ success: true, msg: 'updated successfully' })
                        }else{
                            return res.json({ success: false, msg: 'ERROR' })
                        }
                    })
                }
            })

        }
    });//store.viewitems
}
module.exports.viewitems = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.aggregate([{ $match: { status: "unsold" } }]).then(function (details) {
                if (details.length === 0) {
                    return res.json({ success: false, msg: 'nothing to show' })
                } else {
                    //console.log(details)
                    return res.json({ success: true, data: details })
                }
            })
        }
    });
}
module.exports.getitemdetails = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.findOne({ _id: req.params.id }).then(function (details) {
                res.json(details)
            })
        }
    });
}//deleteitem
module.exports.editdetails = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.findById({ _id: req.params.id }).then(function (details) {
                res.json(details)
            })
        }
    });
}//editdetails
module.exports.deleteitem = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.findOneAndRemove({ serialnumber: req.params.serialnumber }).then(function (err) {
                if (!err) {
                    res.send({ success: false, msg: 'not success' });
                } else {
                    res.send({ success: true, msg: 'delete successfully' });
                }
            })
        }
    });
}//searchitems
module.exports.searchitems = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.aggregate([{ $match: { serialnumber: parseInt(req.body.searchfield) } }]).then(function (details) {
                if (details.length == 0) {
                    res.json({ success: false })
                } else {
                    res.json({ items: details, success: true })
                }

            })
        }
    });
}//searchitems
module.exports.showbyitem = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            console.log(req.params.item)
            Stores.aggregate([{
                $match: {
                    item: req.params.item
                }
            }]).then(function (details) {
                console.log(details)
                if (details.length == 0) {
                    return res.json({ success: false, msg: 'no items to show' })
                } else {
                    return res.json({ success: true, data: details })
                }
            })
        }
    });

}
