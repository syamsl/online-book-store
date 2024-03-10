const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const { orders, orderStatus, getUsers, userManage, weeklyReport, monthlyReport, yearlyReport, customReport } = require("../controllers/admin")

//routes
router.get('/admin/orders', authCheck, adminCheck, orders)
router.put('/admin/order-status', authCheck, adminCheck, orderStatus)

//users
router.get('/admin/get-users', authCheck, adminCheck, getUsers)

//user-manage
router.post('/admin/user-manage', authCheck, adminCheck, userManage)

//sales-report
router.get('/admin/weekly-report', authCheck, adminCheck, weeklyReport)
router.get('/admin/monthly-report', authCheck, adminCheck, monthlyReport)
router.get('/admin/yearly-report', authCheck, adminCheck, yearlyReport)
router.get('/admin/custom-report/:startDate/:endDate', authCheck, adminCheck, customReport)

router.get('/pling',yearlyReport)

module.exports = router;