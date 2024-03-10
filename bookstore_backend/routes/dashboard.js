const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const { userCount, productSold, orderCount, totalRevenue, weekOrders,paymentMethod} = require("../controllers/dashboard");

//routes
router.get("/dashboard-users", authCheck, adminCheck, userCount);
router.get("/dashboard-sold", authCheck, adminCheck, productSold);
router.get("/dashboard-orders", authCheck, adminCheck, orderCount);
router.get("/dashboard-revenue", authCheck, adminCheck, totalRevenue);

router.get("/dashboard-weekorders", authCheck, adminCheck, weekOrders);
router.get("/dashboard-payment", authCheck, adminCheck, paymentMethod);


module.exports = router;