const express = require('express');
var passport = require('passport');
const stores = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Stores = require('../models/stores');
const Stock = require('../models/stock');
const Items = require('../models/itemtypes');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

let imagename = '';
let number;
const storage = multer.diskStorage({
    destination: './client/public/stores',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
        // cb(null, file.originalname);
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
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            var indenfier;
            var count =0;
            Stores.findOne({
                item:req.body.Item
            }).then(store=>{
                if(store != null){
                    return res.json({success:false, msg:`this item type is already in store..please update the Store # : ${store._id}`})
                }else{
                    Stock.aggregate([{$match:{item:req.body.Item}}]).then(detail=> {
                        detail.map(d =>{
                            if(d.status == 'unsold'){
                                count++
                            }
                        })
                        if (count >= req.body.qty) {
                            Items.findOne({
                                name: req.body.Item
                            }).then(function (doc) {
                                if (doc) {
                                    var today = new Date();
                                    var month = today.getMonth() + 1;
                                    var year = today.getFullYear();
                                    const store = new Stores({
                                        brand: req.body.brand,
                                        color: req.body.color,
                                        price: req.body.price,
                                        item: req.body.Item,
                                        identifier: doc.identifier,
                                        warrenty: req.body.warrenty,
                                        imagepath: imagename,
                                        qty: req.body.qty,
                                        insertdate: Date.now(),
                                        authorizedby: req.body.authorize_by,
                                        description: req.body.description,
                                    });
                                    store.save((err, doc) => {
                                        if (!err) {
                                           return res.json({ success: true, msg: 'successfully inserted!!' });
                                        }
                                        else {
                                           return res.json({ success: false, msg: 'check your inputs' });
                                        }
                                    });
                                }
                            });
                        } else {
                           return res.json({ success: false, msg: 'Quantity cannot accept.E-Stock has insufficient quantity of this item type.' });
                        }
                    });
                }
            })
        }
    });//store.viewitems
}
module.exports.imageupload = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.update({ _id: req.params.id }, {
                imagepath: imagename,
            }).then(function (det) {
                if (det) {
                    return res.json({ success: true, msg: 'updated successfully' })
                } else {
                    return res.json({ success: false, msg: 'ERROR' })
                }
            })
        }
    });

}
module.exports.updatedetails = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            var count =0;  
            Stock.aggregate([{$match:{item:req.body.Item}}]).then(detail=> {
                detail.map(d =>{
                    if(d.status == 'unsold'){
                        count++
                    }
                })
                if (count >= req.body.qty) {
            Items.findOne({
                name: req.body.Item
            }).then(function (docs) {
                if (docs) {
                    Stores.updateOne({ _id: req.params.id }, {
                        brand: req.body.brand,
                        color: req.body.color,
                        price: req.body.price,
                        item: req.body.Item,
                        identifier: docs.identifier,
                        qty: req.body.qty,
                        warrenty: req.body.warrenty,
                        description: req.body.description,
                    }).then(function (det) {
                        if (det) {
                            return res.json({ success: true, msg: 'updated successfully' })
                        } else {
                            return res.json({ success: false, msg: 'ERROR' })
                        }
                    })
                }
            })
        }else{
            return res.json({ success: false, msg: 'Quantity cannot accept.Please check the E-Stock' })
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
            Stores.aggregate([{$match:{qty:{$gt:0}}}]).then(function (details) {
                if (details.length === 0) {
                    return res.json({ success: false, msg: 'nothing to show' })
                } else {
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
}
module.exports.editdetails = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.findById({ _id: req.params.id }).then(function (details) {
                return res.json(details)
            })
        }
    });
}
module.exports.deleteitem = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.findOneAndRemove({ _id: req.params.id }).then(function (doc) {
                if (!doc) {
                    res.send({ success: false, msg: 'not success' });
                } else {
                    res.send({ success: true, msg: 'delete successfully' });
                }
            })
        }
    });
}
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
                if (details.length == 0) {
                    return res.json({ success: false, msg: 'no items to show' })
                } else {
                    return res.json({ success: true, data: details })
                }
            })
        }
    });

}

