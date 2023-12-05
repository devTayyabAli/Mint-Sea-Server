const Newsletter = require("../models/Newsletter");


exports.Newsletter_mail = async (req, res) => {
    try {

        let { email } = req.body
        let find_data = await Newsletter.find({ email: email })
        console.log("find_data", find_data);
        if (find_data.length == 0) {
            const data = new Newsletter(req.body);
            await data.save();
            res.status(201).send({
                success: true,
                msg: "Data Store Successfuly"
            })
        } else {
            res.status(201).send({
                data: [],
                success: false,
                msg: "This email is already exist"
            })

        }
    } catch (error) {
        console.error("error while get user", error);
    }
}