const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type:String,
        required:true,
        index:true,

    },
    role:{
        type:String,
        default:"subscriber",

    },
    image:String,
    status:{
        type:String,
        enum:["blocked","active"],
        default:"active",
    },
    cart:{
        type:Array,
        default:[],
    },
    mobile:{type:Number, maxlength:[10,"Phone number must be 10 digits"]},
    address:[],
    wishlist:[{type:ObjectId, ref: "Product"}],
},
{timestamps:true}
);
module.exports = mongoose.model('User', userSchema)