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

module.exports = app;
