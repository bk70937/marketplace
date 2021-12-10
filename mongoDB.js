const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const url = process.env.MONGODB_URI
const connectDatabase = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`)
    }).catch ((err) => {
        console.log(err)
    })
}


module.exports = connectDatabase


