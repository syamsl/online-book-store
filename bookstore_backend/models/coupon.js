const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        required: true,
        minlength: [6,"Too short"],
        maxlength: [12, "Too long"]
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
    }
  },
  { timestamps: true }
);
couponSchema.index({expiry:1},{expireAfterSeconds:0});
module.exports = mongoose.model("Coupon", couponSchema)