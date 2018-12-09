const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Itemtypes = new schema({
    name:{
        type:String,
        require:[true,'Name field is required']
    },
    date:{
        type:Date,
        require:[true,'date field is required']
    },
});

const Itemtypesdetails = mongoose.model('Itemtypes',Itemtypes);//'details' is mongodb name Details is the schema name;
module.exports=Itemtypesdetails;