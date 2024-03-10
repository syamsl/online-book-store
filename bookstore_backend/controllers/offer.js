const Offer = require('../models/offer')
const Product = require('../models/product')
//create remove list


exports.createCategoryOffer = async(req, res) => {
    try{
    
        // console.log(req.body);
        // return;
        const {name,expiry,category, discount, offerDetail} = req.body.offer
        let offer = await new Offer({name, expiry,category, discount,offerDetail, offerType:"Category"}).save()
        // console.log(offer)

        let products = await Product.find({category}).exec();
        let offerPrice 
        
        products.map(async(product) =>{
            offerPrice = Math.round(product.price * (100 - discount)/100)

            if(product.offerPrice){
                if(product.offerPrice > offerPrice){
                    await  Product.findOneAndUpdate({_id:product._id}, {offerPrice, offer:offer._id})
                }
            }
            else{
                await  Product.findOneAndUpdate({_id:product._id}, {offerPrice, offer:offer._id})
            }
        })

        res.json({ok:true});
    }catch (err) {
        res.status(400).send(err)
    }
}

    exports.createProductOffer = async(req, res) => {
        try{
            // console.log(req.body);
            // return;
            const {name,expiry,product, discount, offerDetail } = req.body.offer
            
            let offer = await new Offer({name, expiry,product, discount, offerDetail, offerType:"Product"}).save();

            let productOne = await Product.findOne({_id:product}).exec();

            let offerPrice =   Math.round(productOne.price * (100 - discount)/100)


            if(product.offerPrice){
                if(product.offerPrice > offerPrice){
                    await  Product.findOneAndUpdate({_id:productOne._id}, {offerPrice, offer:offer._id})
                    console.log('---~~~Done~~~---')
                }
            }
            else{
                await  Product.findOneAndUpdate({_id:productOne._id}, {offerPrice, offer:offer._id})
                console.log('---Done---')
            }

            res.json(offer);
            
        }catch (err) {
            res.status(400).send(err)
        }
    }

    exports.getProductsForOffer = async(req, res) =>{
        try{
            res.json(await Product.find({}).exec())
        }catch(err){
            res.status(400).send(err)
        }
    }


exports.remove = async(req, res) => {
    try{

        // console.log("REQ AT BACK--->", req.params)
        // return;
        await Offer.findByIdAndDelete(req.params.offerId).exec()
        res.json( await Product.updateMany({offer:req.params.offerId}, {$unset:{offerPrice:1, offer:1}}).exec());

    }catch (err) {
        res.status(400).send(err)
    }
}


exports.list = async(req, res) => {
    try{
        res.json(await Offer.find({}).sort({createdAt: -1}).exec())
    }catch (err) {
        res.status(400).send(err)
    }
}

exports.expiryCheck = async() =>{
    try{
        const deletedOffer = await Offer.findOneAndDelete({expiry:{$lt:Date.now()}}).exec()
        if(deletedOffer)
        await Product.updateMany({_id:deletedOffer._id},{$unset:{offerPrice:1,offer:1}}).exec()

        // console.log('deletedOffer --->', deletedOffer)
    }catch(err){
        res.status(400).send(err)
    }
}   