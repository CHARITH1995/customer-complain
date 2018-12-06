const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const jwtHelper = require('../config/jwtHelper');
const user = require('../controllers/user');
const register = require('../controllers/register');
const complain = require('../controllers/complains');
const store = require('../controllers/stores');
const reports = require('../controllers/reports');



router.post('/log',user.log);
router.get('/editprofile/:token',jwtHelper.verifyJwtToken,user.editdetail);
router.post('/Customerreg',jwtHelper.verifyJwtToken, register.customerreg);
router.post('/Employeereg' ,jwtHelper.verifyJwtToken, register.employeereg);///resetpwd
router.put('/resetpwd/:id/:password',user.resetpwd);
router.post('/forgetpwd',user.mailverify);
router.post('/newid' ,jwtHelper.verifyJwtToken, register.newadmin);
router.post('/comp',jwtHelper.verifyJwtToken,complain.view);
router.post('/complains',complain.addcomplain);
router.delete('/del/:id' ,jwtHelper.verifyJwtToken, complain.removecomplain);
router.get('/Complainview/:id' , jwtHelper.verifyJwtToken,complain.viewcomplain);
router.get('/Status/:status/:subarea' ,jwtHelper.verifyJwtToken,complain.substatcomplains);
router.get('/Subarea/:subarea' , jwtHelper.verifyJwtToken,complain.subcomplains);
router.post('/newitem',jwtHelper.verifyJwtToken,store.addnewItem);
router.post('/newdetails',jwtHelper.verifyJwtToken,store.addnewDetail);
router.post('/onlinestore',jwtHelper.verifyJwtToken,store.viewitems);
router.post('/search',jwtHelper.verifyJwtToken,store.searchitems);
router.get('/getitemdetails/:id',jwtHelper.verifyJwtToken,store.getitemdetails);
router.get('/edititemdetails/:id',jwtHelper.verifyJwtToken,store.editdetails);
router.put('/edititem/:id',jwtHelper.verifyJwtToken,store.updatedetails);//removeitem viewitems
router.delete('/removeitem/:serialnumber',jwtHelper.verifyJwtToken,store.deleteitem);//removeitem
router.post('/complainreports',jwtHelper.verifyJwtToken,reports.complainreport);
router.post('/salesreports',jwtHelper.verifyJwtToken,reports.salesreport);
router.get('/manualreports/:year/:month',jwtHelper.verifyJwtToken,reports.manualreports);//
router.get('/manualsoldreports/:year/:month',jwtHelper.verifyJwtToken,reports.manualsalesreports);
router.get('/manualreports/:subarea',jwtHelper.verifyJwtToken,reports.manualsubareareports);//http://localhost:4000/stores/viewitems



module.exports=router;