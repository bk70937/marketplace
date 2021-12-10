const mysql = require('mysql2');

const db_connection = mysql.createPool({
        host: 'us-cdbr-east-04.cleardb.com',
        user: 'b39b3b5e4e9da3',
        database: 'heroku_168e5173928ab8b',
        password: '434e51a6',
        waitForConnections: true,
        connectionLimit: 100,
        queueLimit: 0,
        port: 3306
    })
    .on("error", (err) => {
        console.log("Failed to connect to Database - ", err);
    });

module.exports = db_connection;