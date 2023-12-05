const mongoose = require("mongoose");

const schema = mongoose.Schema({
    useraddress:{
        type:String,
       
    },
    itemId:{
        type:String,
    },
    nftContract:{
        type:String,
    }, 
     tokenId:{
        type:String,
    }, 
     owner:{
        type:String,
        
    },
      price:{
        type:String,
    },  
    sold:{
        type:String,
    }, 
    isOnAuction:{
        type:String,
       
    }, 
     bidEndTime:{
        type:String,
 
    }, 
     name:{
        type:String,
    },
    url:{
        type:String,
    },
    txn:{
        type:String,
        
    },
    category:{
        type:String,
    },
    count:{
        type:String,
      
    },
    edate:{
        type:Date,
      
    },
    Blockchain:{
        type:String,
      
    },
    Description:{
        type:String,
      
    },
    Owner_Name: {
        type: String,

    }, Owner_Image: {
        type: String,

    },
    Owner_Address: {
        type: String,
    },

})



const userSchema = mongoose.model("Market_Place", schema);
module.exports = userSchema;