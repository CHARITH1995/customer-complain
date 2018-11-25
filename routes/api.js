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
router.post('/Customerreg',jwtHelper.verifyJwtToken, register.customerreg);
router.post('/Employeereg' ,jwtHelper.verifyJwtToken, register.employeereg);
router.post('/newid' ,jwtHelper.verifyJwtToken, register.newadmin);
router.post('/comp',jwtHelper.verifyJwtToken,complain.view);
router.post('/complains',complain.addcomplain);
router.delete('/del/:id' ,jwtHelper.verifyJwtToken, complain.removecomplain);
router.get('/Complainview/:id' , jwtHelper.verifyJwtToken,complain.viewcomplain);
router.get('/Status/:status/:subarea' ,jwtHelper.verifyJwtToken,complain.substatcomplains);
router.get('/Subarea/:subarea' , jwtHelper.verifyJwtToken,complain.subcomplains);
router.post('/newitem',jwtHelper.verifyJwtToken,store.addnewItem);
router.post('/newdetails',jwtHelper.verifyJwtToken,store.addnewDetail);
router.post('/complainreports',jwtHelper.verifyJwtToken,reports.complainreport);
router.post('/salesreports',jwtHelper.verifyJwtToken,reports.salesreport);




module.exports=router;