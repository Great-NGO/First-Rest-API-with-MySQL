console.log("hello ");

const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res, next) => {
    const mysql = require('mysql');
    // const mysql = require('mysql2');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'dbUser',
        password: 'dbUser',
        database: 'sidehustle'

    })
    
    connection.connect()

    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) throw err
        console.log("The solution is: ", rows[0].solutions)
    })

    connection.end()

    next()
}, (req, res) => {
    console.log("I connected to the database");
    res.send("I connected to the database");
})

app.listen(PORT, () => {
    console.log("Example app listening on PORT ", PORT);
})