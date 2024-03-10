const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");

exports.createPaypalIntent = async (req, res) => {
try{

  const { couponApplied } = req.body;

  // console.log(req.body)
  //later apply coupon
  //later calculate price

  //1 find User
  const user = await User.findOne({ email: req.user.email }).exec();

  //2 get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  // console.log(
  //   "CART TOTAL CHARGED--->",
  //   cartTotal,
  //   "TOTAL AFTER DIS%--->",
  //   totalAfterDiscount
  // );

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount;
  } else {
    finalAmount = cartTotal;
  }

// console.log("FINAL AMOUNT--->",finalAmount);

//create payment intent with order amount and currency
  res.send({
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
}catch(err){
  res.status(400).send(err)
}
};
