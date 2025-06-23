const express = require('express')
const router = express.Router()
const auth = require('./../controller/auth.controller')

router.route('/signup').post(auth.UserSignUp)
router.route('/change-username').post(auth.changeuserName)


module.exports = router