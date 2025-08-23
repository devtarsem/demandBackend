const Order = require("./../model/orders.model")
const jwt  = require('jsonwebtoken')
const {promisify} = require("util")
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { stringify } = require("querystring");
const Prods = require("./../model/products.model")
function decodeJWT(token){
    return promisify(jwt.verify)(token, process.env.SECRET)
}

exports.Placing_order = async(req, res, next)=>{
    const {products, user_id, bill, tax} = req.body;
    const decode = await decodeJWT(user_id);
    
    const creatingOrder = await Order.create({order_items: products, user_id: decode.id, gross_bill : bill, tax : tax, total_bill : (Number(bill) + Number(tax)).toFixed(2), created_at : new Date().toLocaleString()})

    products.forEach(async el=>{
        console.log("asd")
        const prod = await Prods.findById(el.id);
        prod.stock[el.size] -= el.count;
        prod.save()
    })

    



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
        if(el.delivery_status == 'Not delivered'){
            orders.push(el)
        }
    })
    res.status(200).json({
        status : "success",
        data : {
            msg : "order placed successfully",
            orders : orders
        }
    })

}

exports.cancel_order = async(req, res, next)=>{
    const {token, order_id} = req.body;
    const order = await Order.findById(order_id);
    order.cancel_status = "cancelled"

    await order.save(); 
    next()
}



const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

exports.paymentViaOnline = async(req, res, next)=>{

    const { amount } = req.body; // rupees me aayega
    console.log(amount)

    // Razorpay paise me leta hai (100 = ₹1)
    const options = {
      amount: Math.round(Number(amount) * 100), // rupees → paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    console.log(options)

    const order = await razorpay.orders.create(options);
    JSON.stringify(order)

    res.status(200).json({
        status : "success",
        data : {
            
            order : order
        }
    })

}

exports.razorpaySignatureVerification = async(req, res, next)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature , products, user_id, bill, tax} = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(sign.toString()).digest("hex")

    if(razorpay_signature == expectedSign){
        const decode = await decodeJWT(user_id);
    
        const creatingOrder = await Order.create({order_items: products, user_id: decode.id, gross_bill : bill, tax : tax, total_bill : (Number(bill) + Number(tax)).toFixed(2), created_at : new Date().toLocaleString() , razorpay_order_id, razorpay_payment_id, razorpay_signature})
        products.forEach(async el=>{
            console.log("asd")
            const prod = await Prods.findById(el.id);
            prod.stock[el.size] -= el.count;
            prod.save()
        })
        res.status(200).json({
            status : "success",
            data : {
                msg : "Payment verified successfully"
            }
        })
    }else{
        res.status(200).json({
            status : "error",
            data : {
                msg : "Payment failed"
            }
        })
    }
}

exports.cancelSKU = async(req, res, next)=>{
    const {order_id, sku_id, token} = req.body

    const order = await Order.findById(order_id);

    order.order_items.forEach(el=>{
        if(JSON.stringify(el._id) == JSON.stringify(sku_id)){
            console.log("passed")
            el.return = true
            el.refund = 'Pending'
        }
    })

    let orderItems = order.order_items.length
    let countCheck = 0;
    order.order_items.forEach(el=>{
        if(el.return){
            countCheck++;
        }
    })

    if(orderItems==countCheck){
        order.cancel_status = 'cancelled'
    }else{
        order.cancel_status = 'partially cancelled'
    }

    await order.save();
    next()

}

exports.cancelSKUSending = async(req, res, next)=>{
    const {token} = req.body;
    const decode = await decodeJWT(token);
    const orders = await Order.find({user_id : decode.id})
    const order_sku = []
    orders.forEach(el=>{
        el.order_items.forEach(item=>{
            if(item.return){
                order_sku.push(item)
            }
        })
    })
    res.status(200).json({
        status : "success",
        data : {
            cancel_sku : order_sku
        }
    })

}