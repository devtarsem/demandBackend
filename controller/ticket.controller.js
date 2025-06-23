const Ticket = require("./../model/ticket.model")
const {promisify} = require('util')
const jwt = require('jsonwebtoken')

function decodeJWT(token){
    return promisify(jwt.verify)(token, process.env.SECRET)
}

exports.RaisingTicket = async(req, res, next)=>{
    const {token, title,description, attachments} = req.body;
    const user = await decodeJWT(token)
    const createTicket = await Ticket.create({user_id : user.id, title, description, attachments});

    res.status(200).json({
        status : "success",
        data : {
            msg : "Ticket raised"
        }
    })
}


exports.allTickets = async(req, res, next)=>{
    const {token} = req.body;
    console.log(token)
    const user = await decodeJWT(token)
    const tickets = await Ticket.find({user_id : user.id})
    res.status(200).json({
        status : "success",
        data : {
            tickets
        }
    })
}