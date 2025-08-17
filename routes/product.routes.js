const express = require('express')
const router = express.Router()
const product = require('./../controller/product.controller')

router.route('/add-product').post(product.addProductToDB)
router.route('/fetch-product').post(product.fetchProducts)
router.route('/fetch-product-app').get(product.fetchProductstoAPp)

module.exports = router