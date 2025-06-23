const mongoose = require("mongoose")

const productScheam = new mongoose.Schema({
    name : {
        type : String
    }
    ,
    description : {
        type : String
    }
    ,
    brand : {
        type : String
    }
    ,
    category : {
        type : String
    }
    ,
    price : {
        type : Number
    }
    ,
    discount : {
        type : Number
    }
    ,
    sizes : {
        type : Array
    }
    ,
    colors : {
        type : Array
    }
    ,
    rating : {
        type : Number
    }
    ,
    review_count : {
        type : Number
    }
    ,
    stock : {
        type : Number
    }
    ,
    Images : {
        type : Array
    }
    ,
    tags : {
        type : Array
    }
    ,
    sku : {
        type : String
    }
    ,
    created_at : {
        type : String
    }
    ,
    updated_at : {
        type : String
    }
     
})

const Product = new mongoose.model("Product", productScheam)

module.exports = Product;