const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, statusCheck } = require("../middlewares/auth");

//controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  removeFromWishlist,
  wishlist,
  createCashOrder,
  addUserImage,
  editUserDetails,
  getUserDetails,
  deleteUserAddress,
  createPaypalOrder,
  orderStatus,
} = require("../controllers/user");

//route
router.post("/user/cart", authCheck,statusCheck, userCart); //save cart
router.get("/user/cart", authCheck, statusCheck,getUserCart); //get cart
router.put("/user/cart", authCheck,statusCheck, emptyCart); //empty cart
router.post("/user/address", authCheck,statusCheck, saveAddress);

//create order
router.post("/user/order", authCheck,statusCheck, createOrder);
router.post("/user/cash-order", authCheck,statusCheck, createCashOrder);
router.post("/user/paypal-order", authCheck, statusCheck, createPaypalOrder);
router.get("/user/orders", authCheck,statusCheck, orders);

//coupon
router.post("/user/cart/coupon", authCheck,statusCheck, applyCouponToUserCart);

//wishlist
router.post("/user/wishlist", authCheck,statusCheck, addToWishlist);
router.get("/user/wishlist", authCheck,statusCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck,statusCheck, removeFromWishlist);

//userprofile
router.post("/user/details", authCheck,statusCheck, editUserDetails);
router.get("/user/details",authCheck,statusCheck,getUserDetails);
router.post("/user/delete-address", authCheck,statusCheck, deleteUserAddress);

//changeStatus
router.put("/user/order-status", authCheck,statusCheck, orderStatus);

//image
router.post("/user/imageupload", authCheck,statusCheck, addUserImage);
// router.post("/user/imagedelete",authCheck, deleteUserImage);

// router.get("/user", (req, res) => {
//   res.json({
//     data: "Api is hit USER API!!!",
//   });
// });

module.exports = router;
