const mysql = require('mysql2/promise');

const database = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // ajuste conforme seu ambiente
  database: 'loja_roupas'
});

module.exports = database;
