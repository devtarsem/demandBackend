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
    stock : 
        {
            M : {
                type : Number,
                default : 10,
            }
            ,
            L : {
                type : Number,
                default : 10,
            }
            ,
            S : {
                type : Number,
                default : 10,
            }
            ,
            XL : {
                type : Number,
                default : 10,
            }
            ,
            XXL : {
                type : Number,
                default : 10,
            }
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