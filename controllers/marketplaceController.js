const Web3 = require('web3');
const rpcUrl = 'https://rpc.ftm.tools:443/';

const MARKETPLACE_ABI = require('../config/MARKETPLACE_ABI.json')
const address = "0x64eF011168188ccdA22b4d70D146Fb019906bAF6";

// Database Connection
const conn = require('../dbConnection.js').promise();
const init1 = async (req, res, next) => {

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

      const [rows] = await conn.execute('INSERT INTO `marketplace`(`onsale`,`sold`,`instant`) VALUES(?,?,?)',[
        onsale.join(','),
        sold.join(','),
        instant.join(',')
      ]);

      return rows

    }
    }
  } catch(err){
    next(err) 
  }
}

// const init2 = async (req, res, next) => {
  
//   try {
//     const web3 = new Web3(rpcUrl)
//     const contract = new web3.eth.Contract(MARKETPLACE_ABI, address)
//     let count = await contract.methods.getTradeCount().call()

//     let onsale = [];
//     let sold = [];
//     let instant = [];

//     for(let i = 0 ; i < count ; i++ ) {

//     let _statusF =  await contract.methods.getFullTrade(i).call() ;
//     if(_statusF[8]){
//       let _status =  await contract.methods.getAuctionStatus(i).call() ;
//       if(_status == 1){
//         onsale.push(i);
//       }
//       else{
//         if(_statusF.lister != _statusF.buyer){
//           sold.push(i);
//         }
//       }
      
//     }
//     else if(_statusF[6] == '0x0000000000000000000000000000000000000000') {
//       instant.push(i)
//     }
//     if(i == (count-1)) {

//       const [rows] = await conn.execute("UPDATE marketplace set onsale = ? , sold = ?, instant = ?  WHERE id = ?",[
//         onsale.join(','),
//         sold.join(','),
//         instant.join(',')
//       ]);

//       console.log(rows)
//     }
//     }
//   } catch(err){
//     next(err) 
//   }
// }

const init3 = async (req, res, next) => {
  try {

    const [row] = await conn.execute(
        "SELECT `id`, `onsale`, `sold`, `instant` FROM `marketplace`"
    );

    if(row.length > 0){
        console.log(row)
    }
    
  } catch(err){
    next(err);
  }
}

module.exports = init1()

