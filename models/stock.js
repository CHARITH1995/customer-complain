const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const Stock = new schema({
    serialnumber:{
        type:Number,
        require:[true,'serial number field is required']
    },
    brand:{
        type:String,
        require:[true,'brand field is required']
    },
    color:{
        type:String,
        require:[true,'color field is required']
    },
    identifier:{
        type:String,
        require:[true,'identifier field is required']
    },
    item:{
        type:String,
        require:[true,'item field is required']
    },
    solddate:{
        type:Date,
        default:null,
        require:[true,'date field is required']
    },
    inserteddate:{
        type:Date,
        default:null,
        require:[true,'date field is required']
    },
    warrenty:{
        type:Number,
        default:null,
        require:[true,'date field is required']
    },
    authorizedby:{
        type:String,
        text: true,
        require:[true,'Id field is require']
    }
});

const Stockdetails = mongoose.model('Stock',Stock);//'details' is mongodb name Details is the schema name;
module.exports=Stockdetails;