const mysql = require('mysql');

const db = mysql.createConnection({
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    password: process.env.DB_PASS || '',
    user: process.env.DB_USER || '',
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected!');
});

module.exports = db;
