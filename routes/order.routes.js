const express = require('express')
const router = express.Router()
const order = require('./../controller/order.controller')

router.route('/place').post(order.Placing_order)
router.route('/track-orders').post(order.Track_orders)
router.route('/cancel').post(order.cancel_order, order.Track_orders)
router.route('/online').post(order.paymentViaOnline)
router.route('/verify').post(order.razorpaySignatureVerification)
router.route('/cancel-sku').post(order.cancelSKU, order.Track_orders)

module.exports = router