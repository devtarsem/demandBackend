const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({path : './config.env'});
const mongoose = require('mongoose')

const connect =  mongoose.connect(process.env.CONNECTION).then(el=>{
    console.log('DB connected')
})

app.listen(3003, ()=>{
    console.log('server on')
})

