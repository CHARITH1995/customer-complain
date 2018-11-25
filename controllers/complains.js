const express= require('express');
var passport = require('passport');
const routerComplain = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Complain = require('../models/Complains');
var jwt = require('jsonwebtoken');

module.exports.view=(req,res,next)=>{
    var today = new Date();
    var num;
    var month = today.getMonth()+1; //January is 0!
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            Complain.find({"month":{ $month: "$date" }}).countDocuments().then(function(total){//{$match:{thismonth:{ $month: "$date" } , thisyear:{ $year: "$date" }}}
                num=total
            });
            Complain.find({"month":{ $month: "$date" } }).then(function(details){
                    res.json({complains:details,count:num});
            });
           
             }
        });
}

module.exports.addcomplain=(req,res,next)=>{
             var today = new Date();
             var month = today.getMonth()+1;
             var year = today.getFullYear();
             var det = new Complain({
                name: req.body.name,
                email:req.body.email,
                description:req.body.description,
                subarea:req.body.subarea,
                status:req.body.status,
                address:req.body.address,
                month:month,
                year:year,
                date:Date.now()
               
            });
            det.save((err,doc)=>{
                if(!err){
                    res.send(doc);
                }
                else{
                    console.log('Error in sending Employees :'+ JSON.stringify(err,undefined,2));
                }
            });  
           
             
        
}

module.exports.removecomplain=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            Details.findByIdAndRemove({_id:req.params.id}).then(function(details){
                res.send(details);
            });  
           
             }
        });   
}
module.exports.viewcomplain=(req, res, next)=> {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            Complain.findById(req.params.id,function(err,info){
                if(!err){
                   res.json(info);
                }else{
                    res.json({success:false});
                }
            })
             }
        });   
  
  }
module.exports.substatcomplains=(req, res, next)=> {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            Complain.find({
                status:req.params.status,
                subarea:req.params.subarea
            },function(err,info){
                if(err){
                    res.json({success:false})
                }else{
                    res.json(info)
                }
            })
             }
        });   
  

  }
module.exports.subcomplains=(req, res, next)=> {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            Complain.find({
                subarea:req.params.subarea
            },function(err,info){
                if(!err){
                    res.json(info)
                }else{
                    res.json({success:false})
                }
            })
             }
        });   
  
  }


