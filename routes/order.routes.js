const express = require('express')
const router = express.Router()
const order = require('./../controller/order.controller')

router.route('/place').post(order.Placing_order)
router.route('/track-orders').post(order.Track_orders)



module.exports = router