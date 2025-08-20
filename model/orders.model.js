const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    order_items : [{
        id : {
            type : String
        }
        ,
        name : {
            type : String
        }
        ,
        brand : {
            type : String
        }
        ,
        price : {
            type : Number
        }
        ,
        image : {
            type : Array
        }
        ,
        color : {
            type : String
        }
        ,
        count : {
            type : Number
        }
        ,
        size : {
            type : String
        }
        ,
        return : {
            type : Boolean,
            default : false  
        }
    }]
    ,
    user_id : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }
    ,
    delivery_status : {
        type : String,
        enum : ["Not delivered", "Delivered", "Out of delivery"],
        default : "Not delivered"
    }
    ,
    transit_status : {
        type : String,
        enum : ["Dispatched", "Not dispatched"],
        default : "Not dispatched"

    }
    ,
    payment_status : {
        type : String,
        enum : ["pending", "success"],
        default : "success"
    }
    ,
    cancel_status : {
        type : String,
        enum : ["persist", "cancelled"],
        default : "persist"
    }
    ,
    send_to_vendor : {
        type : String,
        enum : ["sended", "not send"],
        default : "not send"
    }
    ,
    return_status : {
        type : String,
        enum : ["no return", "return"],
        default : "no return"
    }
    ,
    refund_status : {
        type : String,
        enum : ["accepted", "refund"],
        default : "accepted"
    }
    ,
    gross_bill : {
        type : Number
    }
    ,
    tax : {
        type : Number
    }
    ,
    total_bill : {
        type : Number
    }
    ,
    coupon_used : {
        type : String,
        default : "None"
    }
    ,
    created_at : {
        type : String,

    }
    ,
    razorpay_order_id : {
        type : String
    }
    ,
    razorpay_payment_id : {
        type : String,
        default : ''
    }
    ,
    razorpay_signature : {
        type : String
    }
})

const Order = new mongoose.model("Order", OrderSchema)

module.exports = Order;
