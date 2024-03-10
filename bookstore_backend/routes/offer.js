const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const { createCategoryOffer, getProductsForOffer ,createProductOffer, remove, list} = require("../controllers/offer");

//routes
router.get("/offer/products", authCheck, adminCheck, getProductsForOffer);
router.post("/offer/category", authCheck, adminCheck, createCategoryOffer);
router.post("/offer/product",  authCheck, adminCheck, createProductOffer)
router.get("/offers", list);
router.delete("/offer/:offerId", authCheck, adminCheck, remove);

module.exports = router;
