const User = require('./../model/auth.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const instance = require("./../classes/tokenization")
const {promisify} = require('util')

function decodeJWT(token){
    return promisify(jwt.verify)(token, process.env.SECRET)
}

exports.UserSignUp = async(req, res, next)=>{
    const obj = req.body;
    const password = await bcrypt.hash(obj.data.password, 16);
    const createuser  = await User.create({name : obj.data.name, email : obj.data.email, phone : obj.data.phone, address : obj.data.address, city : obj.data.city, state : obj.data.state, landmark : obj.data.landmark, pincode : obj.data.pincode, password : password})
    const token = instance.maketoken(createuser._id)
    
    res.status(200).json({
        status : "success",
        data : { 
            token : token,
            name : obj.data.name,
            phone : obj.data.phone,
        }
    })
}

exports.changeuserName = async(req, res, next)=>{
    const {username , token} = req.body;
    const id = await decodeJWT(token)

    const user = await User.findById(id.id);
    user.name = username;

    user.save()

    res.status(200).json({
        status : "success",
        data : { 
            token : token,
            name : username,
        }
    })
}