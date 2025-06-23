const Order = require("./../model/orders.model")
const jwt  = require('jsonwebtoken')
const {promisify} = require("util")

function decodeJWT(token){
    return promisify(jwt.verify)(token, process.env.SECRET)
}

exports.Placing_order = async(req, res, next)=>{
    const {products, user_id, bill, tax} = req.body;
    const decode = await decodeJWT(user_id);
    
    const creatingOrder = await Order.create({order_items: products, user_id: decode.id, gross_bill : bill, tax : tax, total_bill : (Number(bill) + Number(tax)).toFixed(2), created_at : new Date().toLocaleString()})

    res.status(200).json({
        status : "success",
        data : {
            msg : "order placed successfully",
            order_details : creatingOrder
        }
    })
}

exports.Track_orders = async(req, res, next)=>{
    const {token} = req.body;
    const decode = await decodeJWT(token);
    const user = await Order.find({user_id : decode.id})
    const orders = []
    user.forEach(el=>{
        if(el.delivery_status == 'pending'){
            orders.push(el)
        }
    })
    console.log("fetched")
    res.status(200).json({
        status : "success",
        data : {
            msg : "order placed successfully",
            orders : orders
        }
    })

}