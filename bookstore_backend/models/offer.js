const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const offerSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        trim: true,
        uppercase:true,
        unique: true,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type:Number,
        required: true,
        min:1,
        max:100,
    },
    offerType:{
        type: String,
        enum: [
        "Product",
        "Category",
      ],
    },
    offerDetail:{
        type:String
    },
    product :{
        type:ObjectId,
        ref: "Product",
    },
    category: {
        type: ObjectId,
        ref: "Category",
      },
  },
  { timestamps: true }
);
// offerSchema.index({expiry: 1}, {expireAfterSeconds:0});
// offerSchema.index({expiry: 1}, {expireAfterSeconds:0});
module.exports = mongoose.model("Offer", offerSchema)