const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const Stores = new schema({
    qty:{
        type:Number,
        default:0,
        require:[true,'available stock']
    },
    brand:{
        type:String,
        unique:false,
        text: true,
        require:[true,'brand field is required']
    },
    color:{
        type:String,
        unique:false,
        require:[true,'color field is required']
    },
    identifier:{
        type:String,
        require:[true,'identifier field is required']
    },
    item:{
        type:String,
        index: true,
        unique:false,
        text:true,
        require:[true,'item field is required']
    },
    imagepath:{
        type:String,
        unique:false,
        require:[true,'path field is required']
    },
    insertdate:{
        type:Date,
        unique:true,
        require:[true,'date field is required']
    },
    soldqty:{
        type:Number,
        default:0,
        require:[true,'sold quantity']
    },
    description:{
        type:String,
        index: true,
        text: true,
        require:[true,'description field is required']
    },
    warrenty:{
        type:Number,
        default:null,
        require:[true,'date field is required']
    },
    price:{
        type:Number,
        unique:false,
        require:[true,'price field is require']
    },
    rate:{
        type:Number,
        require:[true,'this field is require']
    },
    authorizedby:{
        type:String,
        text: true,
        require:[true,'Id field is require']
    }
});

const Storesdetails = mongoose.model('Stores',Stores);//'details' is mongodb name Details is the schema name;
module.exports=Storesdetails;