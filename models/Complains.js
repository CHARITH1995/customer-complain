const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Complains = new schema({
    name:{
        type:String,
        require:[true,'Name field is required']
    },
    color:{
        type:String,
        require:[true,'color field is required']
    },
    email:{
        type:String,
        unique:false,
    },
    description:{
        type:String,
        require:[true,'description field is required']
       
    },
    subarea:{
        type:String,
        require:[true,'sub area field is required']
    },
    date:{
        type:Date,
        require:[true,'date field is required']
    },
    month:{
        type:Number,
        require:[true,'month field is required']
    },
    year:{
        type:Number,
        require:[true,'month field is required']
    },
    status:{
        type:String,
        default:'notdone',
        require:[true,'status field is require']
    },
    address:{
        type:String,
        require:[true,'address field is required']
    },
    doneDate:{
        type:Date,
        default:null,
        require:[true,'doneDate field is required']
    }

});

const ComplainItem = mongoose.model('complain',Complains);//'details' is mongodb name Details is the schema name;
module.exports=ComplainItem;