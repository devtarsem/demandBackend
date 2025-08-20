const express = require('express')
const router = express.Router()

const orders = require("./../../controller/b2b/orders.controllers")

router.route("/orders").post(orders.fetchOrders)
router.route("/status-change").post(orders.changeStatus ,orders.fetchOrders)
router.route("/returns").post(orders.returnOrders)



module.exports = router
