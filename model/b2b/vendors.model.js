const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    name : {
        type : String
    }
    ,
    catagory : {
        type : String
    }
    ,
    address : {
        type : String
    }
    ,
    phone : {
        type : String
    }
    ,
    receiable : {
        type : Number,
        default : 0
    }
    ,
    payable : {
        type : Number,
        default : 0

    }
})

const Vendor = new mongoose.model("Vendor", vendorSchema);

module.exports = Vendor