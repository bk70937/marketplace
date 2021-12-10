const mongoose = require('mongoose')

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

const connectDatabase = () => {
    mongoose.connect('mongodb+srv://bk70937:Bip%2370937@marketplace.cy4ct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/marketplace', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`)
    }).catch ((err) => {
        console.log(err)
    })
}


module.exports = connectDatabase


