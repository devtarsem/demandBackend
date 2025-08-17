const express = require('express')
const router = express.Router()

const PO = require("./../../controller/b2b/po.controller")

router.route("/PO").post(PO.addPO)

module.exports = router