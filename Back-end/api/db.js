const mysql = require('mysql2/promise');

const db = mysql.createPool({
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    password: process.env.DB_PASS || '',
    user: process.env.DB_USER || '',
});

module.exports = db;
