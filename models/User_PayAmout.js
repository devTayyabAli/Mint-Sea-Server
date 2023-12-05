const mongoose = require("mongoose");

const schema = mongoose.Schema({
    Eth_Cost:{
        type:String,
        required:true,
    },
    BNB_Cost:{
        type:String,
        required:true
    },
    Metic_Cost:{
        type:String,
        required:true
    }, 
    Address:{
        type:String,
        required:true
    }, 
    
     
    
})



const User_Payment = mongoose.model("User_Payment", schema);
module.exports = User_Payment;