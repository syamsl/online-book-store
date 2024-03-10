const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const { aggregation} = require("../controllers/chart");
const {expiryCheck} = require("../controllers/offer")

//routes

router.get("/order-aggre",expiryCheck);


module.exports = router;
