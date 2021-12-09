const mysql = require('mysql2');

const db_connection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'address',
        password: '',
        waitForConnections: true,
        connectionLimit: 100,
        queueLimit: 0,
        port: 3306
    })
    .on("error", (err) => {
        console.log("Failed to connect to Database - ", err);
    });

module.exports = db_connection;