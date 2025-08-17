const mongoose = require("mongoose")

const PoSchema = new mongoose.Schema({
    vendor_id : {
        type : mongoose.Schema.ObjectId,
        ref : 'Vendor'
    }
    ,
    SKU : [{
        sku : {
            type : String
        }
        ,
        _id : {
            type : String
        }
        ,
        units : {
            type : String
        }
        ,
        cp : {
            type : String
        }
    }]
    ,
    total_bill : {
        type : Number
    }
    ,
    tax : {
        type : Number
    }
    ,
    created_at : {
        type : Date,
        default : new Date().toDateString()
    }

})

const PO  = new mongoose.model("PO", PoSchema)

module.exports = PO