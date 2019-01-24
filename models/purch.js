const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Purchase = new schema({
    purchqty:{
        type:Number,
        default:0,
    },
    item:{
        type:String,
        require:[true,'item field is required']
    },
    name:{
        type:String,
        require:[true,'item field is required'] 
    },
    email:{
        type:String,
        require:[true,'item field is required'] 
    },
    date:{
        type:Date,
        require:[true,'date field is required']
    },
    updateqty:{
        type:Number,
        default:0,
    }
});

const Purchdetails = mongoose.model('Purchase',Purchase);//'details' is mongodb name Details is the schema name;
module.exports=Purchdetails;