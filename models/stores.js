const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Stores = new schema({
    serialnumber:{
        type:Number,
        unique:false,
        require:[true,'serial number field is required']
    },
    brand:{
        type:String,
        unique:false,
        require:[true,'brand field is required']
    },
    status:{
        type:String,
        default:'unsold',
        require:[true,'status field is require']
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
        unique:false,
        require:[true,'item field is required']
    },
    imagepath:{
        type:String,
        unique:true,
        require:[true,'path field is required']
    },
    insertdate:{
        type:Date,
        unique:true,
        require:[true,'date field is required']
    },
    description:{
        type:String,
        require:[true,'description field is required']
    },
    solddate:{
        type:Date,
        default:null,
        require:[true,'date field is required']
    },
    soldmonth:{
        type:Number,
        default:null,
        require:[true,'month field is required']
    },
    soldyear:{
        type:Number,
        default:null,
        require:[true,'month field is required']
    },
    price:{
        type:Number,
        unique:false,
        require:[true,'price field is require']
    }
});

const Storesdetails = mongoose.model('Stores',Stores);//'details' is mongodb name Details is the schema name;
module.exports=Storesdetails;