const mysql = require('mysql2');

const query = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'company_db'
});

module.export = query;