const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
   
    
})



const Newsletter = mongoose.model("Newsletter", schema);
module.exports = Newsletter;