const Order = require("./../model/orders.model")
const jwt  = require('jsonwebtoken')
const {promisify} = require("util")
const Razorpay = require("razorpay");
const crypto = require("crypto")
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