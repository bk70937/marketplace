const mongoose = require('mongoose')

const WizardSchema = mongoose.Schema({
    id: {type: Number},
    onsale: { type: String },
    sold: { type: String },
    instant: { type: String },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Wizard', WizardSchema)