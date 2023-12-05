const {
    query
} = require('express');
const userSchema = require('../models/userModel')
const User_Profile = require('../models/User_profile');
const { default: axios } = require('axios');
const Favorite_Items = require('../models/Favorite_Items');


exports.getUser = async (req, res) => {
    try {
        res.status(200).send("user is herer ðŸ‘¥")

    } catch (error) {
        console.error("error while get user", error);
    }
}


exports.open_marketplace = async (req, res) => {
    try {
        let { name,Blockchain,ownerAddress } = req.body
        // console.log("Owner_Image",req.body.Owner_Image ==undefined && req.body.Owner_Image ==null ? "Tayyab":"ali");
        let find_data = await userSchema.findOne({ name: name,Blockchain:Blockchain })

        console.log("find_data", find_data);

        if (find_data == null) {
            const data = new userSchema(req.body);
            await data.save();
            res.status(201).send({
                success: true,
                msg: "Data Store Successfuly"
            })
        } else {
            let update = {
                useraddress: req.body.useraddress,
                itemId: req.body.itemId,
                nftContract:req.body.nftContract,
                tokenId: req.body.tokenId,
                owner: req.body.owner,
                price: req.body.price,
                sold: req.body.sold,
                isOnAuction:find_data.isOnAuction ,
                bidEndTime:find_data.bidEndTime ,
                name: req.body.name,
                url: req.body.url,
                txn: req.body.txn,
                category: req.body.category,
                Owner_Name: req.body.Owner_Name ==undefined && req.body.Owner_Name ==null ? find_data.Owner_Name:req.body.Owner_Name,
                Owner_Image:req.body.Owner_Image ==undefined && req.body.Owner_Image ==null ? find_data.Owner_Image:req.body.Owner_Image,
                edate: req.body.edate,
                Blockchain:req.body.Blockchain,
                 Owner_Address:ownerAddress
            }
            const updatedDocument = await userSchema.findOneAndUpdate({
                name: name,Blockchain:Blockchain
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


    } catch (error) {
        console.error("error while get user", error);
    }
}
exports.Update_Owner = async (req, res) => {
    try {
        let { id,ownerAddress } = req.body
        // console.log("Owner_Image",req.body.Owner_Image ==undefined && req.body.Owner_Image ==null ? "Tayyab":"ali");
        let find_data = await userSchema.findOne({ _id: id })

        console.log("find_data", find_data);

        if (find_data == null) {
            
            res.status(201).send({
                success: false,
                msg: "NFT data No exist"
            })
        } else {
            let update = {
                useraddress: find_data.useraddress,
                itemId: find_data.itemId,
                nftContract:find_data.nftContract,
                tokenId: find_data.tokenId,
                owner: find_data.owner,
                price: find_data.price,
                sold: find_data.sold,
                isOnAuction:find_data.isOnAuction ,
                bidEndTime:find_data.bidEndTime ,
                name: find_data.name,
                url: find_data.url,
                txn: find_data.txn,
                category: find_data.category,
                Owner_Name: find_data.Owner_Name ==undefined && find_data.Owner_Name ==null ? find_data.Owner_Name:find_data.Owner_Name,
                Owner_Image:find_data.Owner_Image ==undefined && find_data.Owner_Image ==null ? find_data.Owner_Image:find_data.Owner_Image,
                edate: find_data.edate,
                Blockchain:find_data.Blockchain,
                Owner_Address:ownerAddress
            }
            const updatedDocument = await userSchema.findOneAndUpdate({
                _id: id
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


    } catch (error) {
        console.error("error while get user", error);
    }
}


exports.sell_marketplace_history = async (req, res) => {
    try {
        let {
            category
        } = req.query
        if (category == "All") {
            const data = await userSchema.find({
                isOnAuction: 0
            });

            if (Object.keys(data).length !== 0) {
                res.status(201).send({
                    data: data,
                    success: true,

                })
            } else {
                res.status(200).send({
                    data: [],
                    success: false,

                })
            }
        } else {
            const data = await userSchema.find({
                category: category,
                isOnAuction: 0
            });

            if (Object.keys(data).length !== 0) {
                res.status(201).send({
                    data: data,
                    success: true,

                })
            } else {
                res.status(200).send({
                    data: [],
                    success: false,

                })
            }
        }


    } catch (error) {
        console.error("error while get user", error);
    }
}

exports.OnAuction_marketplace_history = async (req, res) => {
    try {
        let Array = ["Cartoon", "3D"]
        let {
            category
        } = req.query;
        if (category == "All") {


            const data = await userSchema.find({
                isOnAuction: 1
            });
            console.log("category", data);

            if (Object.keys(data).length !== 0) {
                res.status(201).send({
                    data: data,
                    success: true,

                })
            } else {
                res.status(200).send({
                    data: [],
                    success: false,

                })
            }
        } else {
            console.log("category", Array);
            let OnAuctionArray = []

            // Array.forEach(async (items, index) => {
            //     const data = await userSchema.find({
            //         category: items,
            //         isOnAuction: 1
            //     });


            // });

            // console.log("category", OnAuctionArray);

            for (let i = 0; i <= Array.length; i++) {
                let data = await userSchema.find({
                    category: Array[i],
                    isOnAuction: 1
                });
                console.log("DAta", data);

                // if (sellCondition == 1) {
                OnAuctionArray = [...OnAuctionArray, data[i]]
                // }
            }

            console.log("OnAuctionArray", OnAuctionArray);

            // if (Object.keys(data).length !== 0) {
            //     res.status(201).send({
            //         data: data,
            //         success: true,

            //     })
            // } else {
            //     res.status(200).send({
            //         data: [],
            //         success: false,

            //     })
            // }
        }

    } catch (error) {
        console.error("error while get user", error);
    }
}

exports.sell_and_auction_history = async (req, res) => {
    try {

        let {
            category
        } = req.query


        if (category == "All") {

            const data = await userSchema.find();


            if (Object.keys(data).length !== 0) {
                res.status(201).send({
                    data: data,
                    success: true,

                })
            } else {
                res.status(200).send({
                    data: [],
                    success: false,

                })
            }
        } else {
            const data = await userSchema.find({
                category: category
            });


            if (Object.keys(data).length !== 0) {
                res.status(201).send({
                    data: data,
                    success: true,
                })
            } else {
                res.status(200).send({
                    data: [],
                    success: false,

                })
            }
        }


    } catch (error) {
        console.error("error while get user", error);
    }
}

exports.sell_and_auction_history_address = async (req, res) => {
    try {
        let {
            useraddress
        } = req.query

        const data = await userSchema.find({
            useraddress: useraddress
        });


        if (Object.keys(data).length !== 0) {
            res.status(201).send({
                data: data,
                success: true,

            })
        } else {
            res.status(200).send({
                data: [],
                success: false,

            })
        }

    } catch (error) {
        console.error("error while get user", error);
    }
}


exports.Get_New_NFTs = async (req, res) => {
    try {
        let {
            category
        } = req.query
        if (category == "All") {
            const data = await userSchema.find();
            // console.log("Data",data);
            let SellArray = []


            for (let i = 0; i < data.length; i++) {
                let sellCondition = data[i].edate
                let CurrentDate = new Date()
                if (sellCondition == undefined) {

                } else {
                    // console.log("Data", sellCondition);

                    // console.log("sellCondition", CurrentDate.getMonth() == sellCondition.getMonth() && CurrentDate.getDate() == sellCondition.getDate());
                    if (CurrentDate.getMonth() == sellCondition.getMonth() && CurrentDate.getDate() == sellCondition.getDate()) {

                        SellArray = [...SellArray, data[i]]

                        // console.log("SellArray");
                    }

                }
            }

            if (Object.keys(SellArray).length !== 0) {
                res.status(201).send({
                    data: SellArray,
                    success: true,

                })
            } else {
                res.status(200).send({
                    data: [],
                    success: false,

                })
            }
        } else {
            const data = await userSchema.find({
                category: category
            });
            let SellArray = []
            for (let i = 0; i < data.length; i++) {
                let sellCondition = data[i].edate
                let CurrentDate = new Date()
                // console.log("sellCondition", CurrentDate.getMonth()==sellCondition.getMonth() && CurrentDate.getDate()==sellCondition.getDate());
                if (CurrentDate.getMonth() == sellCondition.getMonth() && CurrentDate.getDate() == sellCondition.getDate()) {

                    SellArray = [...SellArray, data[i]]

                    // console.log("SellArray");
                }

            }

            if (Object.keys(SellArray).length !== 0) {
                res.status(201).send({
                    data: SellArray,
                    success: true,

                })
            } else {
                res.status(200).send({
                    data: [],
                    success: false,

                })
            }
        }


    } catch (error) {
        console.error("error while get user", error);
    }
}

exports.get_NFT_On_Favorite = async (req, res) => {
    try {

        let {
            tokenId
        } = req.query



        const data = await userSchema.find({
            tokenId: tokenId
        });


        if (Object.keys(data).length !== 0) {
            res.status(201).send({
                data: data,
                success: true,
            })
        } else {
            res.status(200).send({
                data: [],
                success: false,

            })
        }



    } catch (error) {
        console.error("error while get user", error);
    }
}

async function fetchNFTAPI(id,chainid) {
    try {
        const data = await userSchema.findOne({ name:id,Blockchain:chainid });

        // const response = await axios.get(`https://sanjhavehra.womenempowerment.online/sell_and_auction_history?category=${category}`);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch data from the first API');
    }
}


async function fetchProfileAPI(element) {
    try {
        let data = await User_Profile.findOne({
            address: element.toUpperCase()
        })
        // const response = await axios.get(`https://sanjhavehra.womenempowerment.online/get_user_profile?address=${element.toUpperCase()}`);
        // return response.data?.data;
        return data;

    } catch (error) {
        throw new Error('Failed to fetch data from the second API');
    }
}



exports.get_one_NFT = async (req, res) => {
    try {

        let {
            id,chainid
        } = req.query
        const data = await userSchema.findOne({ name:id,Blockchain:chainid });
        if (data.length !== 0) {
            res.status(201).send({
                data: data,
                success: true,

            })
        } else {
            res.status(200).send({
                data: [],
                success: false,

            })
        }


    } catch (error) {
        console.error("error while get user", error);
    }
}




async function fetchFirstAPI(category) {
    try {
        try {
        if(category=="All"){

            const data = await userSchema.find();
    
            // const response = await axios.get(`https://sanjhavehra.womenempowerment.online/sell_and_auction_history?category=${category}`);
            return data;
        }else{
            const data = await userSchema.find({ category: category});
    
            // const response = await axios.get(`https://sanjhavehra.womenempowerment.online/sell_and_auction_history?category=${category}`);
            return data;
        }
    } catch (error) {
        throw new Error('Failed to fetch data from the first API');
    }
    } catch (error) {
        throw new Error('Failed to fetch data from the first API');
    }
}


async function fetchSecondAPI(element) {
    try {
        let data = await User_Profile.findOne({
            address:element.toUpperCase()
        })
        // const response = await axios.get(`https://aduit.betterlogics.tech/get_user_profile?address=${element.toUpperCase()}`);
        // return response.data?.data;
        return data;

    } catch (error) {
        throw new Error('Failed to fetch data from the second API');
    }
}

async function fetchfavoriteAPI(element, address) {
    try {
        let Data = await Favorite_Items.findOne({ Favorite_Address: address,name:element.name })
        return Data;
        // const response = await axios.get(`https://aduit.betterlogics.tech/get_One_Favorite?useraddress=${address}&&name=${element.name}`);
        // return response.data?.data;

    } catch (error) {
        throw new Error('Failed to fetch data from the second API');
    }
}


// exports.NFT_History = async (req, res) => {
//     try {
//         let {
//             category, address
//         } = req.query

//         if (category == "All") {
//             const firstAPIResponse = await fetchFirstAPI(category);
//             const userName = firstAPIResponse;
//             const secondAPIPromises = userName.map(async (Items) => {
//                 try {
//                     let OwnerResponse
//                     let CreaterResponse
//                     if (Items.Owner_Address) {
//                         OwnerResponse = await fetchSecondAPI(Items.Owner_Address);
//                     }
//                     CreaterResponse = await fetchSecondAPI(Items.useraddress);
//                     let favoriteAPI = await fetchfavoriteAPI(Items,address);

//                     // console.log("favoriteAPI",favoriteAPI);
//                     let API_Merge = {
//                         "_id": Items._id,
//                         "useraddress": Items.useraddress,
//                         "itemId": Items.itemId,
//                         "nftContract": Items.nftContract,
//                         "tokenId": Items.tokenId,
//                         "owner": Items.owner,
//                         "price": Items.price,
//                         "sold": Items.sold,
//                         "isOnAuction": CreaterResponse?.username,
//                         "bidEndTime": CreaterResponse?.image,
//                         "name": Items.name,
//                         "url": Items.url,
//                         "txn": Items.txn,
//                         "category": Items.category,
//                         "edate": Items.edate,
//                         "Blockchain": Items.Blockchain,
//                         "Owner_Name": OwnerResponse == undefined ? null : OwnerResponse?.username,
//                         "Owner_Image": OwnerResponse == undefined ? null : OwnerResponse?.image,
//                         "__v": 0,
//                         "Description": Items.Description,
//                         "Owner_Address": Items.Owner_Address,
//                         "favorite":favoriteAPI?.length !=0 ? true : false 
//                     }
//                     return API_Merge;
//                 } catch (error) {
//                     console.error(`Error calling the second API for user: ${Items}`);
//                     return null;
//                 }
//             });

//             const secondAPIResponses = await Promise.all(secondAPIPromises);


//             if (secondAPIResponses.length !== 0) {
//                 res.status(201).send({
//                     data: secondAPIResponses,
//                     success: true,

//                 })
//             } else {
//                 res.status(200).send({
//                     data: [],
//                     success: false,

//                 })
//             }
//         } else {
//             const firstAPIResponse = await fetchFirstAPI(category);
//             const userName = firstAPIResponse;
//             const secondAPIPromises = userName.map(async (Items) => {
//                 try {
//                     let OwnerResponse
//                     let CreaterResponse
//                     if (Items.Owner_Address) {
//                         OwnerResponse = await fetchSecondAPI(Items.Owner_Address);
//                     }
//                     CreaterResponse = await fetchSecondAPI(Items.useraddress);
//                     let favoriteAPI = await fetchfavoriteAPI(Items,address);

//                     // console.log("favoriteAPI",favoriteAPI);
//                     let API_Merge = {
//                         "_id": Items._id,
//                         "useraddress": Items.useraddress,
//                         "itemId": Items.itemId,
//                         "nftContract": Items.nftContract,
//                         "tokenId": Items.tokenId,
//                         "owner": Items.owner,
//                         "price": Items.price,
//                         "sold": Items.sold,
//                         "isOnAuction": CreaterResponse?.username,
//                         "bidEndTime": CreaterResponse?.image,
//                         "name": Items.name,
//                         "url": Items.url,
//                         "txn": Items.txn,
//                         "category": Items.category,
//                         "edate": Items.edate,
//                         "Blockchain": Items.Blockchain,
//                         "Owner_Name": OwnerResponse == undefined ? null : OwnerResponse?.username,
//                         "Owner_Image": OwnerResponse == undefined ? null : OwnerResponse?.image,
//                         "__v": 0,
//                         "Description": Items.Description,
//                         "Owner_Address": Items.Owner_Address,
//                         "favorite":favoriteAPI?.length !=0 ? true : false 
//                     }
//                     return API_Merge;
//                 } catch (error) {
//                     console.error(`Error calling the second API for user: ${Items}`);
//                     return null;
//                 }
//             });

//             const secondAPIResponses = await Promise.all(secondAPIPromises);


//             if (secondAPIResponses.length !== 0) {
//                 res.status(201).send({
//                     data: secondAPIResponses,
//                     success: true,

//                 })
//             } else {
//                 res.status(200).send({
//                     data: [],
//                     success: false,

//                 })
//             }
//         }


//     } catch (error) {
//         console.error("error while get user", error);
//     }
// }





