const express = require('express')
const router = express.Router()

const vendor = require("./../../controller/b2b/vendor.controller")

router.route("/add-vendor").post(vendor.AddVendors, vendor.sendingAllVendors)
router.route("/vendors").get(vendor.sendingAllVendors)
router.route("/update-vendor").post(vendor.updatingVendor, vendor.sendingAllVendors)
router.route("/delete-vendor").post(vendor.deleteVendors, vendor.sendingAllVendors)


module.exports = router