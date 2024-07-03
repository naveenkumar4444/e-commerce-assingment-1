const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'alt',
    password: 'Abcd@1234',
    database: 'e_commerce_assignment'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = connection;
