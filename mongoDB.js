const mongoose = require('mongoose')
require('dotenv').config()
// const connectDatabase = () => {
//     mongoose.connect('mongodb://localhost:27017/wizard', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then((data) => {
//         console.log(`MongoDB connected with server: ${data.connection.host}`)
//     }).catch ((err) => {
//         console.log(err)
//     })
// }

// mongodb+srv://bk70937:Bip#70937@marketplace.cy4ct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

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


