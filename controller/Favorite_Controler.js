const Favorite_Items = require('../models/Favorite_Items');
const userSchema = require('../models/userModel');


exports.Add_Favorite = async (req, res) => {
    try {
        const data = new Favorite_Items(req.body);
        await data.save();
        res.status(201).send({
            success: true,
            msg: "Data Is Store Successfully"
        })

    } catch (error) {
        console.error("error while get user", error);
    }
}

exports.get_Favorite = async (req, res) => {
    try {
        let { useraddress } = req.query

        let Data = await Favorite_Items.find({ Favorite_Address: useraddress })

        if (Object.keys(Data)?.length != 0) {
            res.status(201).send({
                data: Data,
                success: true,
                msg: "Favorite Data"
            })
        } else {
            res.status(201).send({
                data: [],
                success: false,
                msg: "NO Favorite Data"
            })
        }
    } catch (error) {
        console.error("error while get user", error);
    }
}

exports.get_One_Favorite = async (req, res) => {
    try {
        let { useraddress, name } = req.query
        let Data = await Favorite_Items.findOne({ Favorite_Address: useraddress, name: name })
        if (Data != null) {
            res.status(201).send({
                data: Data,
                success: true,
                msg: "Favorite Data"
            })
        } else {
            res.status(201).send({
                data: [],
                success: false,
                msg: "NO Favorite Data"
            })
        }
    } catch (error) {
        console.error("error while get user", error);
    }
}

exports.update_Favorite = async (req, res) => {
    try {

        let { name,useraddress } = req.body
        const Find_ID = await Favorite_Items.find({Favorite_Address:useraddress, name: name });
        if (Find_ID.length !== 0) {
            const Delete_token_id = await Favorite_Items.deleteOne({Favorite_Address:useraddress, name: name });
            res.status(201).send({
                data: Delete_token_id,
                success: true,
                msg: "Data deleted"
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

exports.searchNFT = async (req, res) => {
    try {

        let { name } = req.query
        const Find_ID = await userSchema.find(

            {
                name: {
                    $regex: name,
                    $options: "i"
                }
            }
        );

        console.log("Find_ID", name);
        if (Find_ID.length !== 0) {

            res.status(201).send({
                data: Find_ID,
                success: true,
                msg: "your NFTs"
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