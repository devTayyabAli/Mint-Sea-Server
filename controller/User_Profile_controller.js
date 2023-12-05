const User_profile = require('../models/User_profile')
const userSchema = require('../models/userModel')




exports.create_user_profile = async (req, res) => {
    try {

        let {
            address
        } = req.body;
        let userData = await User_profile.findOne({ 
            address
        });
        if (userData == null) {
            const data = new User_profile(req.body);
            await data.save();
            console.log("data",data);
            res.status(201).send({
                success: true,
                msg: "Thank you for registration"
            })
        } else {
            res.status(201).send({
                success: false,
                msg: "User already exist"
            })
        }

    } catch (error) {
        console.error("error while get user", error);
    }
}


exports.update_user_profile = async (req, res) => {


    const update = {
        username: req.body.username,
        email: req.body.email,
        bio: req.body.bio,
        image: req.body.image,
        address: req.body.address,
        Cover_image:req.body.Cover_image,
    }
    console.log("update",update);
    const {
        address
    } = req.query
    const updatedDocument = await User_profile.findOneAndUpdate({address:address}, {
        $set: update
    }, {
        new: true
    });
    console.log("updatedDocument", updatedDocument);
    return res.status(200).send(updatedDocument);


};

exports.get_user_profile = async (req, res) => {
    try {
       
        let {
            address
        } = req.query

        let data = await User_profile.findOne({
            address
        })
        if (data == null) {
            res.status(200).send({
                data: null,
                success: false,
                msg: "User Data not found"
            })
        } else {
            res.status(200).send({
                data: data,
                success: true,
                msg: "User Data found "
            })

        }

    } catch (error) {
        console.error("error while get user", error);
    }
}


exports.get_All_user_profile = async (req, res) => {
    try {
 
        let data = await User_profile.find()
        if (data == null) {
            res.status(200).send({
                data: null,
                success: false,
                msg: "User Data not found"
            })
        } else {
            res.status(200).send({
                data: data,
                success: true,
                msg: "User Data found "
            })

        }

    } catch (error) {
        console.error("error while get user", error);
    }
}



