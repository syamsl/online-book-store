const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
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

  if (couponApplied && totalAfterDiscount*100) {
    finalAmount = totalAfterDiscount*100;
  } else {
    finalAmount = cartTotal*100;  
  }

    // console.log("FINAL AMOUNT--->",finalAmount);

  //create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount/100, 
    currency: "inr",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};
