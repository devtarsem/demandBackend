const jwt = require("jsonwebtoken")

class tokenization{
    maketoken(Content){
        return jwt.sign({id : Content}, process.env.SECRET)
    }
}
const instance = new tokenization();


module.exports = instance