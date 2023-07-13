const mysql = require('mysql2/promise');
require('dotenv').config();

const options = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

async function queryDB<T = any>(query: string, params?: any[]): Promise<T> {
  const connection = await mysql.createConnection(options);
  const [rows] = await connection.execute(query, params);
  return rows;
}

module.exports = queryDB;
