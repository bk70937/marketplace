const mysql = require('mysql2');

const db_connection = mysql
    .createConnection({
        host: 'us-cdbr-east-04.cleardb.com',
        user: 'ba1e7fc73b785d',
        database: 'heroku_100252bdc5a6a6f',
        password: '7cdbd463',
    })
    .on("error", (err) => {
        console.log("Failed to connect to Database - ", err);
    });

module.exports = db_connection;



