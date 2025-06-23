const express = require('express')
const router = express.Router()
const tickets = require('./../controller/ticket.controller')

router.route('/raise-ticket').post(tickets.RaisingTicket);
router.route('/all-open-tickets').post(tickets.allTickets);


module.exports = router