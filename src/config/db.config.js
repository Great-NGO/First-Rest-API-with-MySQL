// const mysql = require('mysql2');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbUser',
    password: 'dbUser',
    database: 'sidehustle'

})

connection.connect(function(err){
    if (err) throw err
    console.log("Database Connected!");
})

module.exports = connection;