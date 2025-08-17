const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const authRouter = require('./routes/auth.routes')
app.use("/api/v1/auth/", authRouter)
const productRouter = require('./routes/product.routes')
app.use("/api/v1/product/", productRouter)
const OrderRouter = require('./routes/order.routes')
app.use("/api/v1/order/", OrderRouter)
const TicketRouter = require('./routes/ticket.routes')
app.use("/api/v1/ticket/", TicketRouter)


/////////////////////////////////b2b////////////////////////////////
const InventoryRouter = require('./routes/b2b/inventory.routes')
app.use("/api/v1/b2b/", InventoryRouter)
const VendorsRouter = require('./routes/b2b/vendor.routes')
app.use("/api/v1/b2b_vendor/", VendorsRouter)
const OrdersRouter = require('./routes/b2b/orders.routes')
app.use("/api/v1/b2b_order/", OrdersRouter)
const PORouter = require('./routes/b2b/po.routes')
app.use("/api/v1/b2b_po/", PORouter)
module.exports = app;
