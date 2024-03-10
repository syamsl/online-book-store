const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const addressSchema = new mongoose.Schema(
  {
    address: [
      {
        name: {type:String, minlength:[2,"Name must contain more than 6 characters."]},
        city: String,
        street: String,
        pincode: { type: Number, maxlength: [6,"Pincode consist only 6 digits."]},
        address: {type: String, minlength:[10, "Address must contain characters more than 10."]},
      },
    ],
    orderedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
