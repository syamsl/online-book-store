const express = require('express')
const router = express.Router()

const {createPaypalIntent} = require('../controllers/paypal')

//middleware
const {authCheck} = require('../middlewares/auth')

router.post('/create-paypal-intent', authCheck, createPaypalIntent);

module.exports = router;