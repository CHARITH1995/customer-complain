const express= require('express');
var passport = require('passport');
const routerRegister = express.Router();
const Details = require('../models/details');
const Customer = require('../models/Customer');
const Employee = require('../models/Employees');
var ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

module.exports.customerreg=(req,res,next) =>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            Customer.findOne({
                email:req.body.email
            },function(err,infor){
                if(infor){
                    return res.json({suceess:false,msg:'email already taken!'})
                }else{
                    Customer.findOne({
                        accountNumber:req.body.accountNumber
                    },function(err,infor){
                        if(infor){
                            return res.json({suceess:false,msg:'account number already taken!!'})
                        }else{
                            Customer.findOne({
                                Id:req.body.id
                            },function(err,infor){
                                if(infor){
                                    return res.json({suceess:false,msg:'id already taken!!'})
                                }else{
                                    var customer = new Customer({
                                        firstname: req.body.fname,
                                        lastname: req.body.lname,
                                        email:req.body.email,
                                        address:req.body.address,
                                        Id:req.body.id,
                                        Tp:req.body.Tp,
                                        authorize_by:req.body.authorize_by,
                                        address:{
                                            laneone:req.body.laneone,
                                            lanetwo:req.body.lanetwo,
                                            city:req.body.city,
                                            postalcode:parseInt(req.body.postalcode),
                                        },
                                        subarea:req.body.subarea,
                                        accountNumber:req.body.accountNumber,
                                        deviceOne:req.body.deviceOne,
                                        deviceTwo:req.body.deviceTwo,
                                        deviceThird:req.body.deviceThird
                                       
                                    });
                                    customer.save((err,doc)=>{
                                        //console.log(err)
                                        if(!err){
                                          return  res.json({success:true,msg:'successfully inserted'});
                                        }else{
                                            return  res.json({success:false,msg:'ERROR!'});
                                        }
                                    }); 
                                }
                            });
                        }
                    });
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
            var salt = bcrypt.genSaltSync(10);
            Employee.findOne({
                email:req.body.email
            }).then(function(data){
                if(data){
                    return res.json({success:false,msg:'email already taken'})
                }else{
                    Employee.findOne({
                        Id:req.body.Id
                    }).then(function(data){
                        //console.log(data)
                        if(data){
                            return res.json({success:false,msg:'Id already taken'})
                        }else{
                            var employee = new Employee({
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                email:req.body.email,
                                Id:req.body.Id,
                                Tp:req.body.Tp,
                                subarea:req.body.subarea,
                                authorize_by:req.body.authorize_by,
                                password:bcrypt.hashSync('test', salt) 
                            });
                            employee.save((err,doc)=>{
                                if(!err){
                                   return res.json({success:true ,msg:'successfully inserted'});
                                }
                                else{
                                   return res.json({success:false,msg:'error!'});
                                }
                            });
                        }
                    });
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
                Details.findOne({
                    Id:req.body.id
                }).then(function(data){
                    if(data){
                        return res.json({success:false , msg:'User id already in the System!'})
                    }else{
                        Details.findOne({
                            email:req.body.email
                        }).then(function(data){
                            if(data){
                                return res.json({success:false , msg:'email already exists'})
                            }else{
                                var salt = bcrypt.genSaltSync(10);
                                var hash = bcrypt.hashSync(req.body.password, salt);
                                var det = new Details({
                                    fname: req.body.fname,
                                    lname: req.body.lname,
                                    email:req.body.email,
                                    password:hash,
                                    Id:req.body.id,
                                    is_admin:req.body.is_admin,
                                    Tp:req.body.tp,
                                    isadmin:req.body.isadmin,
                                });
                                det.save((err,doc)=>{
                                    if(!err){
                                        link ='http://localhost:3000/editpassword/'+ doc._id +'/'+doc.password;
                                        var transporter = nodemailer.createTransport({
                                          service: 'gmail',
                                          auth: {
                                            user: "charithprasanna009@gmail.com",
                                            pass: '0771034162'
                                          }
                                        });
                                       var mailOptions = {
                                          to: doc.email,
                                          from: "charithprasanna009@gmail.com",
                                          subject: 'Sending Email using Node.js',
                                          text:link
                                        }; 
                                        transporter.sendMail(mailOptions, function (error, info) {
                                          if (error) {
                                                res.json({ success: false, msg: 'message sending fail!' })
                                          } else {
                                         return res.json({ success: true, msg: 'Join Link send to the new user!!' })
                                          }
                                        });
                                    }
                                    else{
                                       return res.json({success:false,msg:'ERROR!'});
                                    }
                                });
                            }
                        })
                    }
                })
            }  
             }
        });
   
}
module.exports.customerdata=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Customer.find().then(function(details) {
               //console.log(details)
                if(!details){
                    return res.json({success:false ,msg:'no customers to display'})
                }else{
                    return res.json({success:true , data:details})
                }
            })
           
             }
        });
  
} 
module.exports.employeedata=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Employee.find().then(function(details) {
                //console.log(details)
                if(!details){
                    return res.json({success:false ,msg:'no employees to display'})
                }else{
                    return res.json({success:true , data:details})
                }
            })
           
             }
        });
  
} //register.removeemployee
module.exports.removeemployee=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Employee.findOneAndDelete({_id:req.params.id}).then(function (err) {
                if(!err){
                    res.send({ success: false, msg: 'not success' });
                }else{
                    res.send({ success: true, msg: 'delete successfully' });
                }
            })
           
             }
        });
  
} //register.removeemployee
module.exports.removecustomer=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Customer.findOneAndDelete({_id:req.params.id}).then(function (err) {
                //console.log(err)
                if(!err){
                    res.send({ success: false, msg: 'not success' });
                }else{
                    res.send({ success: true, msg: 'delete successfully' });
                }
            })
           
             }
        });
  
}//editcustomer
module.exports.editcustomer=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Customer.findOne({_id:req.params.id}).then(function (details) {
                if(!details){
                    res.send({ success: false, msg: 'not success' });
                }else{
                    res.send(details );
                }
            })
           
             }
        });
  
}//editcustomer
module.exports.updatecustomer=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            var condition = {_id:req.params.id}
            Customer.findOne({
                email:req.body.email
            }).then(function(doc){
                if((doc == null)||(doc._id == req.params.id)){
                    Customer.findOne({
                        accountNumber:req.body.accountNumber
                    }).then(function(data){
                        if((data == null)||(data._id) == (req.params.id)){
                            Customer.findOne({
                                Id:req.body.Id
                            }).then(function(detail){
                                if((detail == null)||(detail._id == req.params.id)){
                                    Customer.updateOne(condition,req.body).then(doc =>{    
                                        if(doc){
                                          return res.json({ success: true, msg:'successfully updated!' });
                                        }else{
                                          return res.json({ success: false, msg:'cannot finish your request!!' }); 
                                        }
                                    })
                                }else{
                                    return res.json({success:false , msg:'NIC is already taken!'}) 
                                }
                            })
                        }else{
                            return res.json({success:false , msg:'Account Number is already taken!'})
                        }
                    })
                }else{
                    return res.json({success:false , msg:'email is already taken!'})
                }
            })
             }
        });
  
}//editcustomer
module.exports.editemployee=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Employee.findOne({_id:req.params.id}).then(function (details) {
                //console.log(details)
                if(!details){
                    res.send({ success: false, msg: 'no employees to show' });
                }else{
                    res.send(details);
                }
            })
           
             }
        });
  
}//updateemployee
module.exports.updateemployee=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            var condition = {_id:req.params.id}
           Employee.findOne({
               Id:req.body.Id
           }).then(function(data){
               if((data == null)||(data._id == req.params.id)){
                   Employee.findOne({
                       email:req.body.email
                   }).then(doc =>{
                       if((doc == null)||(doc._id == req.params.id)){
                        Employee.updateOne(condition,req.body).then(doc =>{    
                            if(doc){
                              return res.json({ success: true, msg:'successfully updated!' });
                            }else{
                              return res.json({ success: false, msg:'cannot finish your request!!' }); 
                            }
                        })
                       }else{
                        return res.json({success:false,msg:'check Technician email once again'}) 
                       }
                   })
               }else{
                    return res.json({success:false,msg:'check Technician NIC once again'}) 
               }
           })
             }
        }); 
}