const express=require('express');
const app=express();
const cors=require('cors');
const path=require("path");
const routes=require('./routes/api');
const routerComplain=require('./routes/api');
const routerstores=require('./routes/api');
const routerreport=require('./routes/api');
const bodyParser=require('body-parser');
const routerRegister=require('./routes/api');
const mongoose=require('mongoose');
require("dotenv").config();

mongoose.connect('mongodb://admin:admin123@ds159273.mlab.com:59273/slt',{ useNewUrlParser: true },(err)=>{
    if(!err){
        console.log('db connected')
    }else{
        console.log('error in db')
    }
});

mongoose.Promise = global.Promise;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(express.static(path.join(__dirname, "client", "build")))



app.use('/reg',routes);
app.use('/complain',routerComplain);
app.use('/register',routerRegister);
app.use('/stores',routerstores);
app.use('/reports',routerreport);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const port = process.env.port||4000;
app.listen(port,function(){
    console.log('now listening for request');
});