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


module.exports.addnewDetail = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stock.findOne({
                serialnumber:req.body.serialnumber
            }).then(function(data){
                if((data == null)){
                    Items.findOne({
                        name: req.body.item
                    }).then(function (doc){
                        const stock = new Stock({
                            serialnumber:req.body.serialnumber,
                            brand: req.body.brand,
                            color: req.body.color,
                            item: req.body.item,
                            inserteddate:Date.now(),
                            identifier: doc.identifier,
                            warrenty:req.body.warrenty,
                            authorizedby: req.body.authorize_by,
                        });
                        stock.save((err,doc) => {
                            if (!err) {
                               return res.json({ success: true, msg: 'successfully inserted!!' });
                            }
                            else {
                               return res.json({ success: false, msg: 'ERROR' });
                            }
                        });
                    })
                }else{
                  return  res.json({ success: false, msg: 'Serial Number already in system' });
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
            console.log(req.params.id)
            var condition = {_id:req.params.id}
            Stock.findOne({
                serialnumber:req.body.serialnumber
            }).then(function (docs) {
                if ((docs == null)||(docs._id == req.params.id)) {
                    Stock.updateOne(condition,req.body).then(doc =>{    
                        if(doc){
                          return res.json({ success: true, msg:'successfully updated!' });
                        }else{
                          return res.json({ success: false, msg:'cannot finish your request!!' }); 
                        }
                    })
                }else{
                    return res.json({ success: false, msg: 'serial number already taken' })
                }
            })
        }
    });
}
module.exports.viewitems = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stock.find().then(function (details) {
                if (details.length === 0) {
                    return res.json({ success: false, msg: 'nothing to show' })
                } else {
                    return res.json({success:true,data:details })
                }
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
            Stock.findOneAndRemove({ _id:req.params.id }).then(function (doc) {
                if (!doc) {
                    res.send({ success:false,msg: 'not success'});
                } else {
                    res.send({ success:true, msg: 'delete successfully'});
                }
            })
        }
    });
}
module.exports.getitem = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Stock.findOne({ _id: req.params.id }).then(function(details) {
               return res.json(details);
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
            Stock.findById({ _id: req.params.id }).then(function (details) {
                return res.json(details)
            })
        }
    });
}
module.exports.items= (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
           Stock.aggregate([{$match:{status:"unsold"}},{$group:{_id:{item:"$item"},total:{$sum:1}}}]).then(function(details){
               return res.json(details);
           });
        }
    });
}
module.exports.sold= (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            var condition = {_id:req.params.id}
            Purchase.findOne({
                _id:req.body.purchid
            }).then(docs=>{
                if(docs == null){
                    return res.json({success:false ,msg:'purchase id is incorrect'})
                }
                if((docs.item == req.body.item)){
                    if(docs.purchqty == 0){
                        return res.json({success:false , msg:'invalid Purchase Id'})
                    }
                    Stock.updateOne(condition,req.body).then(doc =>{    
                        if(doc){
                            var con = {_id:req.body.purchid}
                            var a = docs.purchqty-1;
                            var b = docs.updateqty+1
                            const body={
                                purchqty:a,
                                updateqty:b
                            }
                            Purchase.updateOne(con,body).then(function (det) {
                                if (det) {
                                    return res.json({ success: true, msg: 'updated successfully' })
                                } else {
                                    return res.json({ success: false, msg: 'ERROR!' })
                                }
                            })
                        }else{
                          return res.json({ success: false, msg:'cannot finish your request!!' }); 
                        }
                    })
                }else{
                    return res.json({success:false , msg:'Please check the purchase Id again'})
                }
            })
        }
    });
}
