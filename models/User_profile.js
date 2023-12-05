const mongoose = require("mongoose");

const schema = mongoose.Schema({
    address:{
        type:String,
        // required:true,
    },
    username:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    }, 
    bio:{
        type:String,
        // required:true
    }, 
    image:{
        type:String,
       
    },
    Cover_image:{
        type:String,
       
    },
     
    
})



const User_Profile = mongoose.model("user_profile", schema);
module.exports = User_Profile;