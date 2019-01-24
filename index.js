const express=require('express');
const app=express();
const cors=require('cors');
const path=require("path");
const routes=require('./routes/api');
const routerComplain=require('./routes/api');
const routerstores=require('./routes/api');
const routerstock=require('./routes/api');
const routerreport=require('./routes/api');
const routeritem=require('./routes/api');
const bodyParser=require('body-parser');
const routerRegister=require('./routes/api');
const routerpurch=require('./routes/api');
const mongoose=require('mongoose');
var server = require('http').Server(app);
var io = require('socket.io')(server);
require("dotenv").config();
var multer = require( 'multer');
var upload = multer();


mongoose.connect('mongodb://admin:admin123@ds159273.mlab.com:59273/slt',{ useNewUrlParser: true },(err)=>{
    if(!err){
        console.log('db connected')
    }else{
        console.log('error in db')
    }
});

mongoose.Promise = global.Promise;
app.use(upload.array());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(express.static(path.join(__dirname, "client", "build")))

app.use('/reg',routes);
app.use('/complain',routerComplain);
app.use('/register',routerRegister);
app.use('/stores',routerstores);
app.use('/reports',routerreport);
app.use('/stock',routerstock);
app.use('/purch',routerpurch);
app.use('/items',routeritem);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  })

const port = process.env.port||4000;


server.listen(port,function(){
    console.log('now listening for request');
});




