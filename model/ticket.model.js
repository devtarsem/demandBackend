const mongoose = require('mongoose')


const ticketSchema = new mongoose.Schema({
    order_id : {
        type : mongoose.Schema.ObjectId
    }
    ,
    user_id : {
        type : mongoose.Schema.ObjectId
    }
    ,
    title : {
        type : String
    }
    ,
    description : {
        type : String
    }
    ,
    ticket_status : {
        type : String,
        enum : ["open", "closed", "waiting for response"],
        default : "open"
    }
    ,
    attachments : [{
        images : {
            type : String
        }
    }]
})


const Ticket = new mongoose.model("Ticket", ticketSchema)

module.exports = Ticket