const express = require('express')
const router = express.Router()
const auth = require('./../controller/auth.controller')

router.route('/signup').post(auth.UserSignUp)
router.route('/login').post(auth.Login)
router.route('/change-username').post(auth.changeuserName)
router.route('/change-password').post(auth.changePassword)



module.exports = router