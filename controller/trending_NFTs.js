
const userSchema = require('../models/userModel')
const Tranding_Market_NFTs = require('../models/tranding_NFTS');
const { default: axios } = require('axios');
const User_Payment = require('../models/User_PayAmout');
const User_Profile = require('../models/User_profile');


exports.trending_address_marketplace = async (req, res) => {
    try {

        const Address_trending = await userSchema.find();
        let Seller_Address = []
        Address_trending.forEach((element) => {
            Seller_Address[element.useraddress] = (Seller_Address[element.useraddress] || 0) + 1
        });

        let TopSeller = []
        Object.keys(Seller_Address).forEach((key) => {
            TopSeller = [...TopSeller, {
                "User_Address": key,
                "trendcount": Seller_Address[key]
            }]

        });
        let Top_Seller_Array = TopSeller.sort((a, b) => a.trendcount - b.trendcount)
        Top_Seller_Array = Top_Seller_Array.reverse()
        console.log("Top_Seller_Array", Top_Seller_Array)
    
        if (Object.keys(Top_Seller_Array).length !== 0) {
            res.status(201).send({
                data: Top_Seller_Array,
                success: true,
                msg: "Top Seller"
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



exports.trending_NFTs = async (req, res) => {
    try {
        let { name, Blockchain } = req.body
        // console.log("Owner_Image",req.body.Owner_Image ==undefined && req.body.Owner_Image ==null ? "Tayyab":"ali");
        let find_data = await Tranding_Market_NFTs.findOne({ name: name, Blockchain: Blockchain })
        let find_data_market = await userSchema.findOne({ name: name, Blockchain: Blockchain })

        console.log("find_data", find_data);

        if (find_data == null) {
            const data = new Tranding_Market_NFTs(req.body);
            await data.save();
            res.status(201).send({
                success: true,
                msg: "Tranding Store Successfuly"
            })
        } else {
            let update = {
                useraddress: req.body.useraddress,
                itemId: req.body.itemId,
                nftContract: req.body.nftContract,
                tokenId: req.body.tokenId,
                owner: req.body.owner,
                price: req.body.price,
                sold: req.body.sold,
                isOnAuction: find_data.isOnAuction == undefined ? req.body.isOnAuction : find_data.isOnAuction,
                bidEndTime: find_data.bidEndTime == undefined ? req.body.bidEndTime : find_data.bidEndTime,
                name: req.body.name,
                url: req.body.url,
                txn: req.body.txn,
                category: req.body.category,
                Owner_Name: req.body.Owner_Name == undefined && req.body.Owner_Name == null ? find_data_market.Owner_Name : req.body.Owner_Name,
                Owner_Image: req.body.Owner_Image == undefined && req.body.Owner_Image == null ? find_data_market.Owner_Image : req.body.Owner_Image,
                edate: req.body.edate,
                Blockchain: req.body.Blockchain,

            }
            const updatedDocument = await Tranding_Market_NFTs.findOneAndUpdate({
                name: name
            }, {
                $set: update
            }, {
                new: true
            });
            res.status(201).send({
                data: updatedDocument,
                success: true,
                msg: "NFT Updated"
            })

        }

        // const data = new Tranding_Market_NFTs(req.body);
        // let {
        //     tokenId,
        //     nftContract,
        //     name,
        //     Blockchain
        // } = data;
        // const Address_trending = await Tranding_Market_NFTs.find({
        //     name: name, Blockchain: Blockchain
        // });

        // if (Address_trending.length) {
        //     let {
        //         count
        //     } = Address_trending[0]


        //     let update = {
        //         useraddress: data.useraddress,
        //         nftContract: data.nftContract,
        //         tokenId: data.tokenId,
        //         count: Number(count + 1)
        //     }
        //     const updatedDocument = await Tranding_Market_NFTs.findOneAndUpdate({
        //         nftContract: nftContract,
        //         tokenId: tokenId
        //     }, {
        //         $set: update
        //     }, {
        //         new: true
        //     });

        //     res.status(200).send({
        //         data: updatedDocument,
        //         success: true,
        //         msg: "Upadete Tranding"
        //     })

        // } else {
        //     await data.save();
        //     res.status(201).send({
        //         success: true,
        //         msg: "Tranding Store Successfuly"
        //     })

        // }


    } catch (error) {
        console.error("error while get user", error);
    }
}


exports.get_trending_NFTs = async (req, res) => {
    try {


        const Address_trending = await Tranding_Market_NFTs.find();

        if (Address_trending.length) {
            res.status(200).send({
                data: Address_trending,
                success: true,
                msg: "Upadete Tranding"
            })
        } else {
            res.status(200).send({
                data: [],
                success: false,
                msg: "No Found Tranding"
            })
        }



    } catch (error) {
        console.error("error while get user", error);
    }
}



exports.update_tranding = async (req, res) => {
    try {

        let { tokenId, Blockchain } = req.body
        const Find_ID = await Tranding_Market_NFTs.find({ tokenId: tokenId, Blockchain: Blockchain });

        //   console.log("Find_ID",tokenId);
        if (Find_ID.length !== 0) {
            const Delete_token_id = await Tranding_Market_NFTs.deleteOne({ tokenId: tokenId, Blockchain: Blockchain });
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



// exports.top_Seller = async (req, res) => {
//     try {

//         let Array_data = []
//         const Address_trending = await userSchema.find();
//         let Seller_Address = []
//         Address_trending.forEach((element) => {
//             Seller_Address[element.useraddress] = (Seller_Address[element.useraddress] || 0) + 1
//         });

//         let TopSeller = []
//         Object.keys(Seller_Address).forEach((key) => {
//             TopSeller = [...TopSeller, {
//                 "User_Address": key,
//                 "trendcount": Seller_Address[key]
//             }]

//         });
//         let Top_Seller_Array = TopSeller.sort((a, b) => a.trendcount - b.trendcount)
//         Top_Seller_Array = Top_Seller_Array.reverse()
//         let get_Length = Top_Seller_Array?.length;
//         for (let i = 0; i < get_Length; i++) {
//             let { User_Address } = Top_Seller_Array[i]
//             let profile_data = await User_Profile.findOne({
//                 address:User_Address?.toUpperCase()
//             })
//             let Payment_data = await User_Payment.find({Address:User_Address.toUpperCase()});
//             Array_data = [...Array_data, { name: profile_data?.username, image: profile_data?.image, address: profile_data?.address, Eth_const: Payment_data?.Eth_Cost, Metic_Cost: Payment_data?.Metic_Cost, BNB_Cost: Payment_data?.BNB_Cost }]
//         }
//         if (Array_data.length !== 0) {
//             res.status(201).send({
//                 data: Array_data,
//                 success: true,
//                 msg: "Top Seller"
//             })
//         } else {
//             res.status(200).send({
//                 data: [],
//                 success: false,
//                 msg: " Not Found"
//             })
//         }

//     } catch (error) {
//         console.error("error while get user", error);
//     }
// }