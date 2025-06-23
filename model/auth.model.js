const mongoose = require("mongoose")

const AuthSchema = new mongoose.Schema({
    name : {
        type : String
    }
    ,
    email : {
        type : String
    }
    ,
    phone : {
        type : String
    }
    ,
    address : {
        type : String
    }
    ,
    city : {
        type : String
    }
    ,
    state : {
        type : String
    }
    ,
    pincode : {
        type : String
    }
    ,
    landmark : {
        type : String
    }
    ,
    password : {
        type : String
    }
})

const User = new mongoose.model("User", AuthSchema);

module.exports = User