const mongoose = require("mongoose");

const schema = mongoose.Schema({
    useraddress:{
        type:String,
    
    },
    itemId:{
        type:String,
        required:true
    },
    nftContract:{
        type:String,
       
    }, 
     tokenId:{
        type:String,
        required:true
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
        required:true
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
    Favorite_Address: {
        type: String,
    },
     favorite: {
        type: String,
    },
})



const Favorite_Items = mongoose.model("Favorite_Items", schema);
module.exports = Favorite_Items;