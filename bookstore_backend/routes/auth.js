const express = require('express')


const router = express.Router();

//middlewares
const {authCheck, adminCheck, statusCheck} = require('../middlewares/auth')

//controller
const {createOrUpdateUser, currentUser } = require('../controllers/auth')

//route
router.post('/create-or-update-user',authCheck, statusCheck, createOrUpdateUser);
router.post('/current-user',authCheck, statusCheck, currentUser);
router.post('/current-admin',authCheck, adminCheck, statusCheck, currentUser);


module.exports = router