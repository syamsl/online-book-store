const Order = require("../models/order");
const User = require("../models/user")
const Product = require("../models/product")

// exports.userCount = async (req, res) => {
//     try {
//         const data = await User.find({}).count().exec()
//         res.json(data)
//     } catch (err) {
//         console.log(err)
//     }
// // }
// exports.aggregation = async(req, res) =>{
//     try{
//         const data = await Product.aggregate([
        
//              {
//                  $project:{sold:1}
//              }
//              ])
//     }catch(err){
//         console.log(err)
//     }
// }

exports.aggregation = async (req, res) => {
        try {
            const data = await Product.aggregate([
                {
                    $project:{sold:1}
                }
            ])
            let total=0
            data.map(i => {
                total+=(i.sold)
            });
            res.json(total);
        } catch (err) { 
            console.log(err)
        }
    }

// exports.aggregation = async (req, res) => {
//     try {
//         const data = await Order.aggregate([
//             {
//                 $project: { orderStatus: 1, _id: 0 }
//             },
//             {
//                 $group: { _id: '$orderStatus', count: { $sum: 1 } }
//             }
//         ])
//         res.json(data);
//     } catch (err) {
//         console.log(err)
//     }
// }

// exports.cancelled =  async (req, res) =>{
//     try{
//         const data = async()
//     }
// }