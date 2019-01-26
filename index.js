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
const Stores = require('./models/stores');
var nodemailer = require('nodemailer');


mongoose.connect(process.env.MONGOLAB_URI,{ useNewUrlParser: true },(err)=>{
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

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
      () => getApiAndEmit(socket),
      10000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  const getApiAndEmit = async socket => {
    try {
      Stores.aggregate([{$match:{qty:{$lt:2}}}]).then(data=>{
          if(data.length != 0){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: "charithprasanna009@gmail.com",
                  pass: '0771034162'
                }
              });
             var mailOptions = {
                to:"prasanna.charith32@gmail.com",
                from: "charithprasanna009@gmail.com",
                subject: 'Sending Email using Node.js',
                text:`please update the stock ${data._id}`
              }; 
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  return res.json({ success: false, msg: 'message sending fail!!' })
                } else {
                  return res.json({ success: true, msg: 'check your inbox and reset the pwd' })
                }
              });
          }
      })
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };

const port = process.env.port||4000;


server.listen(port,function(){
    console.log('now listening for request');
});




