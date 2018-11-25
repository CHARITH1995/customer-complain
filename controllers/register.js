const express= require('express');
var passport = require('passport');
const routerRegister = express.Router();
const Details = require('../models/details');
const Customer = require('../models/Customer');
const Employee = require('../models/Employees');
var ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.customerreg=(req,res,next) =>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            var customer = new Customer({
                firstname: req.body.fname,
                lastname: req.body.lname,
                email:req.body.email,
                address:req.body.address,
                Id:req.body.id,
                subarea:req.body.subarea,
                accountNumber:req.body.accountNumber,
                deviceOne:req.body.deviceOne,
                deviceTwo:req.body.deviceTwo,
                deviceThird:req.body.deviceThird
               
            });
            customer.save((err,doc)=>{
                if(!err){
                    console.log("success")
                    res.json({success:true});
                }
                else{
                        if(Customer.find()=== req.body.id){
                            console.log("Id duplicate")
                            res.json({msg:"ID duplicate"})
                        }
                    console.log("err")
                    res.json({success:false});
                }
            });  
           
             }
        });
 
} 
module.exports.employeereg=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            var employee = new Employee({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email:req.body.email,
                Id:req.body.Id,
                subarea:req.body.subarea,   
            });
            employee.save((err,doc)=>{
                if(!err){
                    res.json({success:true});
                }
                else{
                    res.json({success:false});
                }
            });  
           
             }
        });
  
} 

module.exports.newadmin=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            if(!req.body.lname ||!req.body.fname || !req.body.password || !req.body.email){
                res.json({success:false,msg:'plz pass valid inputs'})
            }else{
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password, salt);
                var det = new Details({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email:req.body.email,
                    password:hash
                   
                });
                det.save((err,doc)=>{
                    if(!err){
                        res.json({success: true});
                    }
                    else{
                        res.json({success:false,msg:err});
                    }
                });
            }  
             }
        });
   
}
