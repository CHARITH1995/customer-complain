const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Purchase = new schema({
    purchqty:{
        type:Number,
        default:0,
        require:[true,'this field is required']
    },
    item:{
        type:String,
        require:[true,'this field is required']
    },
    name:{
        type:String,
        require:[true,'this  field is required'] 
    },
    email:{
        type:String,
        require:[true,'this  field is required'] 
    },
    date:{
        type:Date,
        require:[true,'this field is required']
    },
    updateqty:{
        type:Number,
        default:0,
    },
    method:{
        type:String,
        require:[true,'this field is required'] 
    },
    is_delivered:{
        type:String,
        default:"no",
    },
    deliverd_by:{
        type:String,
        default:null
    },
    deliverd_date:{
        type:Date,
        default:null
    },
    text:{
        type:String,
        default:null
    }
});

const Purchdetails = mongoose.model('Purchase',Purchase);
module.exports=Purchdetails;