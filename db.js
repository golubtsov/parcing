const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Website-Carabin'
}

const pool = mysql.createPool(config);

module.exports = pool;