const express = require("express");
const bodyParser = require("body-parser");
const upload = require("../middleware/multer")
// import router 
const {getUser,open_marketplace,sell_marketplace_history,OnAuction_marketplace_history,sell_and_auction_history,sell_and_auction_history_address,Get_New_NFTs, get_NFT_On_Favorite, get_one_NFT, Update_Owner} = require("../controller/userController")
const {create_user_profile,get_user_profile,update_user_profile, get_All_user_profile} = require('../controller/User_Profile_controller')
const {trending_address_marketplace,trending_NFTs,get_trending_NFTs,update_tranding} =require('../controller/trending_NFTs')
const {update_auction_status,update_sell_status,update_Tranding} =require('../controller/update_status');
const { User_payment_controler, Get_User_payment_controler, Get_User_payment_Address } = require("../controller/User_Payment");
const { Add_Favorite, get_Favorite, get_One_Favorite, update_Favorite, searchNFT } = require("../controller/Favorite_Controler");
const { Contact_Email_send } = require("../controller/Contract_Mail");
const { Newsletter_mail } = require("../controller/Newsletter_Controller");

const router = express.Router();
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.route("/getUser").get(getUser)
router.route("/sell_marketplace_history").get(sell_marketplace_history)
router.route("/OnAuction_marketplace_history").get(OnAuction_marketplace_history)
router.route("/open_marketplace").post(open_marketplace)
router.route("/Update_Owner").post(Update_Owner)

router.route("/sell_and_auction_history").get(sell_and_auction_history)
router.route("/sell_and_auction_history_address").get(sell_and_auction_history_address)
router.route("/Get_New_NFTs").get(Get_New_NFTs)
router.route("/get_NFT_On_Favorite").get(get_NFT_On_Favorite)
router.route("/get_one_NFT").get(get_one_NFT)






//--------------  update_user_profile----------------------------------------

router.route("/create_user_profile").post(upload.single("profile"),create_user_profile)
router.route("/update_user_profile").post(upload.single("profile"),update_user_profile)

router.route("/get_user_profile").get(get_user_profile)
router.route("/get_All_user_profile").get(get_All_user_profile)

router.route("/trending_address_marketplace").get(trending_address_marketplace)
router.route("/trending_NFTs").post(trending_NFTs)
router.route("/update_tranding").post(update_tranding)


router.route("/get_trending_NFTs").get(get_trending_NFTs)
// router.route("/get_top_Seller").get(top_Seller)
// router.route("/NFT_History").get(NFT_History)








// /------------  update_status----------------------------------------------------

router.route("/update_auction_status").post(update_auction_status)
router.route("/update_sell_status").post(update_sell_status)
router.route("/update_Tranding").post(update_Tranding)




// ----------------------User_payment-------------------------------------------


router.route("/User_payment").post(User_payment_controler)
router.route("/Get_User_payment").get(Get_User_payment_controler)
router.route("/Get_User_payment_Address").get(Get_User_payment_Address)


// ---------------- IsFavorite --------------------------
router.route("/Add_Favorite").post(Add_Favorite)
router.route("/get_Favorite").get(get_Favorite)
router.route("/get_One_Favorite").get(get_One_Favorite)
router.route("/update_Favorite").post(update_Favorite)

router.route("/searchNFT").get(searchNFT)




// -------------Newsletter---------------

router.route("/Newsletter_mail").post(Newsletter_mail)

router.route("/Contact_Email_send").post(Contact_Email_send)





module.exports = router;