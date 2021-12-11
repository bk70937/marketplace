const mongoose = require('mongoose')

const WizardDataSchema = mongoose.Schema({
    buyer: { type: String },
    entTimeStamp: { type: String },
    highestBid: { type: String },
    highestBidder: { type: String },
    id: { type: Number },
    isAuction: { type: Boolean },
    lister: { type: String },
    nftAdr: { type: String },
    nftTokenId: { type:  String },
    nftTokenPrice: { type: String },
    openTimeStamp: { type: String },
    priceTokenAdr: { type: String },
    title: { type: String },
},
{
    timestamps: true
})

module.exports = mongoose.model('WizardData', WizardDataSchema)