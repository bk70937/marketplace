require('make-runnable')

const router = require('express').Router();

const Web3 = require('web3');

// MongoDB
const mongoose = require('mongoose');
const Wizard = require('./models/wizard')
const WizardData = require('./models/wizarddata')

const Undead = require('./models/undead')
const UndeadData = require('./models/undeaddata')

const rpcUrl = 'https://rpc.ftm.tools:443/';

const RPC_URL = 'https://bsc-dataseed2.binance.org/'
const address_wizard = "0x7B1294C50758ed380C1ff9295fFB1797e33DE7E7"

const MARKETPLACE_ABI = require('./config/MARKETPLACE_ABI.json')
const address = "0x64eF011168188ccdA22b4d70D146Fb019906bAF6";

const WARRIOR_ABI = require('./config/WARRIOR_ABI.json');
const warrior_address = '0x752C62a41713BB8c95dE7e4551195059be3bDA63'

// Database Connection
const conn = require('./dbConnection.js').promise();

// Insert data using mongoDB
router.get('/api/marketplace/add/undead', async (req,res,next) => { 
    
    try {
        const web3 = new Web3(rpcUrl)
        const contract = new web3.eth.Contract(MARKETPLACE_ABI, address)
        let count = await contract.methods.getTradeCount().call()
        let onsale = [];
        let sold = [];
        let instant = [];
    
        for(let i = 0 ; i < count ; i++ ) {
    
        let _statusF =  await contract.methods.getFullTrade(i).call() ;
        if(_statusF[8]){
          let _status =  await contract.methods.getAuctionStatus(i).call() ;
          if(_status == 1){
            onsale.push(i);
          }
          else{
            if(_statusF.lister != _statusF.buyer){
              sold.push(i);
            }
          }
          
        }
        else if(_statusF[6] == '0x0000000000000000000000000000000000000000') {
          instant.push(i)
        }
        if(i == (count-1)) {
            let data = {
                onsale : onsale.join(','),
                sold : sold.join(','),
                instant : instant.join(','),
            };


            const wizard = await Wizard.create(data)

            res.status(201).json({
                message: 'Data Inserted Successfully'
            })
            
        }
        }
      } catch(err){
        next(err) 
      } 

})

router.get('/api/marketplace/undead', async (req, res, next) => {

    try {
        const undead = await Wizard.find().sort({_id:-1}).limit(1)
        if(undead.length > 0){
            return res.status(200).json(undead);
        }
    } catch(err){
        next(err);
    }   
         
})

router.get('/api/marketplace/add/wizard', async (req,res,next) => { 
    
    try {
        const web3 = new Web3(RPC_URL)
        const contract = new web3.eth.Contract(MARKETPLACE_ABI, address_wizard)
        let count = await contract.methods.getTradeCount().call()
        let onsale = [];
        let sold = [];
        let instant = [];
    
        for(let i = 0 ; i < count ; i++ ) {
    
        let _statusF =  await contract.methods.getFullTrade(i).call() ;
        if(_statusF[8]){
          let _status =  await contract.methods.getAuctionStatus(i).call() ;
          if(_status == 1){
            onsale.push(i);
          }
          else{
            if(_statusF.lister != _statusF.buyer){
              sold.push(i);
            }
          }
          
        }
        else if(_statusF[6] == '0x0000000000000000000000000000000000000000') {
          instant.push(i)
        }
        if(i == (count-1)) {
            let data = {
                onsale : onsale.join(','),
                sold : sold.join(','),
                instant : instant.join(','),
            };
            const undead = await Undead.create(data)

            res.status(201).json({
                message: 'Data Inserted Successfully'
            })
            
        }
        }
      } catch(err){
        next(err) 
      } 

})

router.get('/api/marketplace/wizard', async (req, res, next) => {

    try {
        const wizard = await Undead.find().sort({_id:-1}).limit(1)
        if(wizard.length > 0){
            return res.status(200).json(wizard);
        }
        // res.status(200).json(wizard)
    } catch(err){
        next(err);
    }    
         
})


// wizard data
router.get('/api/marketplace/add/wizarddata', async (req, res, next) => {
    try {
        const web3 = new Web3(rpcUrl)
        const contract = new web3.eth.Contract(MARKETPLACE_ABI, address)
        let count = await contract.methods.getTradeCount().call()
    
        for(let i = 0 ; i < count ; i++ ) {
    
            let _statusF =  await contract.methods.getFullTrade(i).call() ;

            let data = {
                buyer : _statusF.buyer,
                entTimeStamp : _statusF.entTimeStamp,
                highestBid : _statusF.highestBid,
                highestBidder : _statusF.highestBidder,
                id : _statusF.id,
                isAuction : _statusF.isAuction,
                lister : _statusF.lister,
                nftAdr : _statusF.nftAdr,
                nftTokenId : _statusF.nftTokenId,
                nftTokenPrice : _statusF.nftTokenPrice,
                nftTokenPrice : _statusF.nftTokenPrice,
                openTimeStamp : _statusF.openTimeStamp,
                priceTokenAdr : _statusF.priceTokenAdr,
                title : _statusF.title,
            }
            WizardData.find( {  "id" : { $eq : parseInt(_statusF.id)} }, async (err, object) => {
                if (object.length > 0 ) {
                    let _result = await WizardData.updateOne( {"id": object[0].id} , { $set:data}, { multi: true }, );
                } else {
                   await WizardData.create (data)
                }
            });
        }
        res.json({ message: 'Data Updated Successfully' })

      } catch(err){
        next(err) 
      } 

})

router.get('/api/marketplace/list/wizarddata', async (req, res, next) => {
    try {
        const wizard = await WizardData.find()
        if(wizard.length > 0){
            return res.status(200).json(wizard);
        }
    } catch(err){
        next(err);
    }   
})

router.get('/api/marketplace/listerwizard/:address', async (req, res, next) => {
    try {
        const wizard = await WizardData.find({ "lister": req.params.address })
        if(wizard.length > 0){
            return res.status(200).json(wizard);
        }
    } catch(err){
        next(err);
    } 
})


// undead data
router.get('/api/marketplace/add/undeaddata', async (req, res, next) => {
    try {
        const web3 = new Web3(RPC_URL)
        const contract = new web3.eth.Contract(MARKETPLACE_ABI, address_wizard)
        let count = await contract.methods.getTradeCount().call()
    
        for(let i = 0 ; i < count ; i++ ) {
    
            let _statusF =  await contract.methods.getFullTrade(i).call() ;

            let data = {
                buyer : _statusF.buyer,
                entTimeStamp : _statusF.entTimeStamp,
                highestBid : _statusF.highestBid,
                highestBidder : _statusF.highestBidder,
                id : _statusF.id,
                isAuction : _statusF.isAuction,
                lister : _statusF.lister,
                nftAdr : _statusF.nftAdr,
                nftTokenId : _statusF.nftTokenId,
                nftTokenPrice : _statusF.nftTokenPrice,
                nftTokenPrice : _statusF.nftTokenPrice,
                openTimeStamp : _statusF.openTimeStamp,
                priceTokenAdr : _statusF.priceTokenAdr,
                title : _statusF.title,
            }
            UndeadData.find( {  "id" : { $eq : parseInt(_statusF.id)} }, async (err, object) => {
                if (object.length > 0 ) {
                    let _result = await UndeadData.updateOne( {"id": object[0].id} , { $set:data}, { multi: true }, );
                } else {
                   await UndeadData.create (data)
                }
            });
        }
        res.json({ message: 'Data Updated Successfully' })

      } catch(err){
        next(err) 
      } 
})

router.get('/api/marketplace/list/undeaddata', async (req, res, next) => {
    try {
        const undead = await UndeadData.find()
        if(undead.length > 0){
            return res.status(200).json(undead);
        }
    } catch(err){
        next(err);
    }   
})

router.get('/api/marketplace/listerundead/:address', async (req, res, next) => {
    try {
        const undead = await UndeadData.find({ "lister": req.params.address })
        if(undead.length > 0){
            return res.status(200).json(undead);
        }
    } catch(err){
        next(err);
    } 
})



router.get('/api/test/:start/:end', async  (req, res, next) => {
        let _web3 = new Web3(RPC_URL);
        const _warriorContract = new _web3.eth.Contract(WARRIOR_ABI, warrior_address);
       
          _warriorContract.getPastEvents("allEvents", {
            fromBlock: req.params.start,
            toBlock: req.params.end,
       }, function(error, events){ 
        //   return events;
          return res.json(events)
       })
})

module.exports = router;