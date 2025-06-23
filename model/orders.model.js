const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    order_items : [{
        id : {
            type : String
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
    }]
    ,
    user_id : {
        type : mongoose.Schema.ObjectId
    }
    ,
    delivery_status : {
        type : String,
        enum : ["pending", "Delivered"],
        default : "pending"
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
})

const Order = new mongoose.model("Order", OrderSchema)

module.exports = Order;
