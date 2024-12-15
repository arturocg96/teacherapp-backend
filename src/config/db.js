const mysql = require("mysql2");
require("dotenv").config();

const { DB_HOST_ADDRESS, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST_ADDRESS,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
});

module.exports = pool.promise();