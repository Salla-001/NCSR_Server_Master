const mysql = require('mysql2');
const config = require('./config/config.json')

const mysqlConnection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database

});

mysqlConnection.connect((error)=>{
if(error) throw error;
console.log("Successfully connected to the database")
});

module.exports = mysqlConnection;