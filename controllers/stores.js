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
            Stores.findOne({
                imagepath: imagename
            }, function (err, path) {
                if (path) {
                    res.status(401).send({ success: false, msg: 'change your image name!!' });
                } else {
                    var indenfier;
                    // console.log(req.body.Item)
                    Items.findOne({
                        name: req.body.Item
                    }).then(function (doc) {
                        if (doc) {
                            //console.log(req.body.authorize_by)
                            var today = new Date();
                            var month = today.getMonth() + 1;
                            var year = today.getFullYear();
                            const store = new Stores({
                                brand: req.body.brand,
                                color: req.body.color,
                                price: req.body.price,
                                item: req.body.Item,
                                identifier: doc.identifier,
                                warrenty:req.body.warrenty,
                                imagepath: imagename,
                                qty: req.body.qty,
                                insertdate: Date.now(),
                                authorizedby: req.body.authorize_by,
                                description: req.body.description,
                            });
                            // console.log(store)
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
    });//store.viewitems
}
module.exports.imageupload = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            console.log(imagename)
            Stores.update({ _id: req.params.id }, {
                imagepath: imagename,
            }).then(function (det) {
                if (det) {
                    return res.json({ success:true, msg: 'updated successfully' })
                } else {
                    return res.json({ success:false, msg: 'ERROR' })
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
            Items.findOne({
                name: req.body.Item
            }).then(function (docs) {
                if (docs) {
                    Stores.update({ _id: req.params.id }, {
                        brand: req.body.brand,
                        color: req.body.color,
                        price: req.body.price,
                        item: req.body.Item,
                        identifier: docs.identifier,
                        qty: req.body.qty,
                        warrenty:req.body.warrenty,
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
        }
    });//store.viewitems
}
module.exports.viewitems = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stores.aggregate([{ $match: { qty: { $gt: 0 } } }]).then(function (details) {
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
            Stores.findOneAndRemove({ _id:req.params.id }).then(function (doc) {
                if (!doc) {
                    res.send({ success:false,msg: 'not success'});
                } else {
                    res.send({ success:true, msg: 'delete successfully'});
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

