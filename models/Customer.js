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
        unique:true,
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
        unique:true,
        require:[true,'account number field is required']
    },
    Id:{
        type:String,
        unique:true,
        require:[true,'Id field is require']
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
    deviceOne:{
        type:String,
        require:[true,'this field is required']
    },
    deviceTwo:{
        type:String
    },
    deviceThird:{
        type:String
    }

});

Customers.path('email').validate((val) =>{
    emailRegx=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegx.test(val);
},'Ivalid e-mail');

const Customerdetails = mongoose.model('Customers',Customers);//'details' is mongodb name Details is the schema name;
module.exports=Customerdetails;