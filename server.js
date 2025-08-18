const dotenv = require('dotenv')
dotenv.config({path : __dirname + '/config.env'});
const app = require('./app')
const mongoose = require('mongoose')

console.log(process.env.RAZORPAY_KEY_ID)

const connect =  mongoose.connect(process.env.CONNECTION).then(el=>{
    console.log('DB connected')

})

app.listen(3003, ()=>{
    console.log('server on')
})

