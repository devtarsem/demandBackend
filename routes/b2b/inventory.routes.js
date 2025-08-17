const express = require('express')
const router = express.Router()
const inventory = require("./../../controller/b2b/inventory.controller")

router.route('/products').get(inventory.fetchProducts)
router.route("/update-product").post(inventory.updateProducts, inventory.sendingUpdatedProductsAfterUpdation)
router.route('/delete-products').post(inventory.deleteProducts)
router.route('/add-products').post(inventory.addProducts, inventory.sendingUpdatedProductsAfterUpdation)



module.exports = router