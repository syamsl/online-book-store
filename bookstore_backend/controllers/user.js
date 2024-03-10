const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const uniqueid = require("uniqueid");
const { v4: uuidv4 } = require('uuid');

exports.userCart = async (req, res) => {
  //   console.log(req.body); // {cart:[]}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  //check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    // console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    //get price for creating total
    let productFromDb = await Product.findById(cart[i]._id)
      .select("offerPrice")
      .select("price")
      .exec();
      if(productFromDb.offerPrice){
        object.price = productFromDb.offerPrice
      }else{
        object.price = productFromDb.price
      }

    products.push(object);

  }
  // console.log('products===>', products)
  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal===>", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();

  // console.log("new cart===>", newCart);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount offerPrice offer")
    .exec();

  // const products = cart.products
  // const cartTotal = cart.cartTotal
  // const totalAfterDiscount = cart.totalAfterDiscount

  const { products, cartTotal, totalAfterDiscount } = cart;
  // console.log("cart at backend ===>", cart);
  res.json({ products, cartTotal, totalAfterDiscount }); //req.data
};

//

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
  res.json({ cart });
};

//

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();
  res.json({ ok: true });
};

//

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  // console.log("COUPON===>", coupon);
  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  // console.log("VALID COUPON at backend ===>", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  // console.log(
  //   "cartTotal at backend ===>",
  //   cartTotal,
  //   "discount% at backend ===>",
  //   validCoupon.discount
  // );

  // calculate total after discount
// let offerTotal = 0, couponTotal=0
// products.map(item=>{
//   if (item.product.offer) {
//     offerTotal = offerTotal + item.product.offerPrice * item.count
//   } else  {
//     couponTotal = couponTotal + ((item.product.price * item.count) * validCoupon.discount) / 100
//   }
// })
//   let totalAfterDiscount = offerTotal + couponTotal;


  totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  console.log("total after dis% ----->", totalAfterDiscount);

  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec(); await User.findOneAndUpdate({ email: req.user.email },)

  res.json(totalAfterDiscount);
};

//

exports.createOrder = async (req, res) => {
  // console.log("RES AT BACK--->",req.body.stripeResponse)
  const {deliverAddress} = req.body
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    deliveryAddress:deliverAddress,
    orderedBy: user._id,
  }).save();

  //decrement quantity , increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, //IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  // console.log('PRODUCT QUANTITY-- AND SOLD++', updated)

  // console.log("NEW ORDER SAVED AT BACK--->", newOrder)
  res.json({ ok: true });
};

//

exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    .sort('-createdAt')
    .exec();

  res.json(userOrders);
};

//addToWishlist wishlist removeFromWishlist

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } },
    { new: true }
  ).exec();

  res.json({ ok: true });
};

//

exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();
  res.json(list);
};

//

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

//

exports.createCashOrder = async (req, res) => {
  // console.log("RES AT BACK--->",req.body.stripeResponse)
  const { COD, couponApplied ,deliverAddress} = req.body;

  //if COD is true, create order with status of Cash On Delivery
  if (!COD) return res.status(400).send("Create Cash On Delivery Failed");

  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderedBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uuidv4(),
      amount: finalAmount/100,
      currency: "inr",
      status: "Cash On Delivery",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    deliveryAddress:deliverAddress,
    orderedBy: user._id,
    orderStatus: "Cash On Delivery",
  }).save();

  //decrement quantity , increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, //IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  // console.log('PRODUCT QUANTITY-- AND SOLD++', updated)

  // console.log("NEW ORDER SAVED AT BACK--->", newOrder)
  res.json({ ok: true });
};

exports.createPaypalOrder = async (req, res) => {
  // console.log("RES AT BACK--->",req.body.stripeResponse)
  const {couponApplied, paymentId, deliverAddress } = req.body;

  // console.log("PAYMENT ID--->",paymentId);

  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderedBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: paymentId,
      amount: finalAmount/100,
      currency: "INR",
      status: "Paypal",
      created: Date.now(),
      payment_method_types: ["paypal"],
    },
    deliveryAddress:deliverAddress,
    orderedBy: user._id,
    orderStatus: "Not Processed",
  }).save();

  //decrement quantity , increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, //IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  // console.log('PRODUCT QUANTITY-- AND SOLD++', updated)

  // console.log("NEW ORDER SAVED AT BACK--->", newOrder)
  res.json({ ok: true });
};

exports.addUserImage = async (req, res) => {
  // console.log(req.body)
  const { image } = req.body;
  await User.findOneAndUpdate({ email: req.user.email }, { image })

  res.json({ ok: true })
};

exports.editUserDetails = async (req, res) => {
  // console.log("At backend--->", req.body)
  const { newAddress, street, city, pincode, addressName } = req.body.address
  if(newAddress && street && city && pincode && addressName){
    
    let new_Address = {
      id: uuidv4(),
      name: addressName,
      address: newAddress,
      street,
      city,
      pincode,
  
    }
    await User.findOneAndUpdate({ email: req.user.email }, { name: req.body.name, mobile: req.body.mobile, $push: { address: new_Address } }).exec()
  } else{
    await User.findOneAndUpdate({ email: req.user.email }, { name: req.body.name, mobile: req.body.mobile}).exec()

  }
  res.json({ ok: true })


  // if(req.body.mobile){
  //   await User.findOneAndUpdate({email:req.user.email},{mobile:req.body.mobile}).exec()

  // }

  // if(req.body.address){
  //   const {address, street, city,  pincode, name} = req.body.address
  //   let newAddress = {

  //     id : uuidv4(),
  //     name,
  //     address,
  //     street, 
  //     city,
  //     pincode,

  //   }
  //   await User.findOneAndUpdate(
  //     {email:req.user.email},
  //     {$push:{address:newAdddress}}).exec()


  // }


}

exports.getUserDetails = async (req, res) => {
  const details = await User.findOne({ email: req.user.email }).exec();
  res.json(details);
};

exports.deleteUserAddress = async (req, res) => {
  await User.findOneAndUpdate({ email: req.user.email }, { $pull: { address: { id: req.body.id } } }).exec();
  res.json({ok:true})
}


exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;
  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();
  res.json(updated);
};

