const router = require('express').Router();

const Web3 = require('web3');
const rpcUrl = 'https://rpc.ftm.tools:443/';

const MARKETPLACE_ABI = require('./config/MARKETPLACE_ABI.json')
const address = "0x64eF011168188ccdA22b4d70D146Fb019906bAF6";

// Database Connection
const conn = require('./dbConnection.js').promise();


router.get('/api/marketplace', async (req,res,next) => {

    try {

        const [row] = await conn.execute(
            "SELECT `id`, `onsale`, `sold`, `instant` FROM `marketplace` ORDER BY id DESC LIMIT 1"
        );
    
        if(row.length > 0){
            return res.json(row);
        }

        res.json({
            message:"No user found"
        });
        
      } catch(err){
        next(err);
      }

});

module.exports = router;