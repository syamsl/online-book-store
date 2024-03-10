const User = require("../models/user")
const Product = require("../models/product")
const Order = require("../models/order")

exports.userCount = async(req, res)=>{
   try{
        const data = await User.find({}).count().exec();
        res.json(data);
   }catch(err){
    res.status(400).send(err)
   }
}

exports.productSold = async(req,res) =>{
    try{
        const data = await Product.aggregate([
            {
                $project:{sold:1}
            }
        ])
        let total = 0;
        data.map(s =>{
            total+=s.sold
        })
        res.json(total)
    }catch(err){
        res.status(400).send(err)
    }
}

exports.orderCount = async(req,res) =>{
    try{
        const data = await Order.aggregate([
            {
                $match:{orderStatus:{$ne:"Cancelled"}}
            },
            {
                $group:{_id:null,count:{$sum:1}}
            },
        ])
        res.json(data)
    }catch(err){
        res.status(400).send(err)
    }
}

exports.totalRevenue = async(req,res) =>{
    try{
        const data = await Order.aggregate([
            {
                $match:{orderStatus:{$ne:"Cancelled"}}
            },
            {
                $group:{_id:null, totalPrice: {$sum:"$paymentIntent.amount"}}
            }
        ])
        res.json(data)
    }catch(err){
        res.status(400).send(err)
    }
}

exports.weekOrders = async(req, res) =>{
    try{
    
                let data, dailySalesData = [], days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            
                for (let i = 1; i <= 7; i++) {
                  
                    // console.log(new Date().getMonth())
                    data = await Order.aggregate([
                        {
                            $match: {
                                orderStatus: { $ne: 'Cancelled' },
                                createdAt: {
                                    $gte: new Date(new Date().setDate(new Date().getDate() - i)),
                                    $lt: new Date(new Date().setDate(new Date().getDate() - i + 1))
                                }
                            }
                        },
                        { $group: { _id: null, totalRevenue: { $sum: '$paymentIntent.amount' } } }
                    ])
            
                    dailySalesData.push({
                        day: days[new Date(new Date().setDate(new Date().getDate() - i + 1)).getDay()],
                        revenue: data[0] ? data[0].totalRevenue : 0
                    })
                }
          
                dailySalesData = dailySalesData.reverse()
            
                res.json(dailySalesData)
  
    }catch(err){
        res.status(400).send(err)
    }
}

exports.paymentMethod = async(req, res) =>{
    try{
            const data = await Order.aggregate([
                {
                    $match:{ orderStatus: {$ne: "Cancelled"}},
                },
                {
                    $group:{_id:'$paymentIntent.status', count:{$sum:1}}
                },
                // {
                //     $project: { _id: 0, paymentIntent.status: '$_id', count: 1 },
                // }
            ])
            res.json(data)
    }catch(err){
        res.status(400).send(err)
    }
}