const User_Payment = require('../models/User_PayAmout')

exports.User_payment_controler = async (req, res) => {
    try {

        let {
            Address
        } = req.body;
        
        console.log("userData",Address);
        let userData = await User_Payment.findOne({ 
            Address:Address
        });


        if (userData == null) {
            const data = new User_Payment(req.body);
            await data.save();
            res.status(201).send({
                success: true,
                msg: "Your Payment Added"
            })
        } else {

            let {Metic_Cost,BNB_Cost,Eth_Cost}=req.body
            
            let update = {
                Metic_Cost: Number(userData.Metic_Cost)+Number(Metic_Cost),
                BNB_Cost: Number(userData.BNB_Cost)+Number(BNB_Cost),
                Eth_Cost: Number(userData.Eth_Cost)+Number(Eth_Cost),
            }
         
            const updatedDocument = await User_Payment.findOneAndUpdate({
                Address:Address
            }, {
                $set: update
            }, {
                new: true
            });            
            res.status(201).send({
                data:updatedDocument,
                success: true,
                msg: "Payment Updated"
            })
        }

    } catch (error) {
        console.error("error while get user", error);
    }
}
exports.Get_User_payment_controler = async (req, res) => {
    try {

        
        const Data = await User_Payment.find();

        //   console.log("Find_ID",tokenId);
        if (Data.length !== 0) {
          
            res.status(201).send({
                data: Data,
                success: true,
                msg: "Top saller Payments"
            })
        } else {
            res.status(200).send({
                data: [],
                success: false,
                msg: " Not Found"
            })
        }

    } catch (error) {
        console.error("error while get user", error);
    }
}


exports.Get_User_payment_Address = async (req, res) => {
    try {

        let {Address}=req.query
 
        const Data = await User_Payment.find({Address:Address});

        if (Data.length !== 0) {
          
            res.status(201).send({
                data: Data,
                success: true,
                msg: "Top saller Payments"
            })
        } else {
            res.status(200).send({
                data: [],
                success: false,
                msg: " Not Found"
            })
        }

    } catch (error) {
        console.error("error while get user", error);
    }
}
