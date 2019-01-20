const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Customers = new schema({
    firstname:{
        type:String,
        require:[true,'first Name field is required']
    },
    lastname:{
        type:String,
        require:[true,'last Name field is required']
    },
    email:{
        type:String,
        require:[true,'email field is required']
    },
    Id:{
        type:String,
        require:[true,'Id field is require']
    },
    Tp:{
        type:String,
        require:[true,'email field is required']
    },
    address:{
        type:String,
        require:[true,'address field is required']
       
    },
    subarea:{
        type:String,
        require:[true,'subarea field is required']
    },
    accountNumber:{
        type:String,
        require:[true,'account number field is required']
    },
    address:{
        laneone:{
            type:String,
            require:[true,'Id field is require']
        },lanetwo:{
            type:String,
            
        },city:{
            type:String,
            require:[true,'Id field is require']
        },
        postalcode:{
            type:Number,
            require:[true,'Id field is require']
        }      
    },
    authorizedby:{
        type:String,
        require:[true,'Id field is require']
    },
    password:{
        type:String,
        require:[true,'Id field is require']
    }
});


const Customerdetails = mongoose.model('Customers',Customers);//'details' is mongodb name Details is the schema name;
module.exports=Customerdetails;