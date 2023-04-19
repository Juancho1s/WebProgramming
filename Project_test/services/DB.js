const mysql = require("mysql2/promise");
const config = require("../Configurations");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results,] = await connection.execute(sql, params);

  return results;
}

async function insert(sql, params){
  const connection = await mysql.createConnection(config.db);
  await connection.execute(sql, params);
}

async function update(sql, params){
  const connection = await mysql.createConnection(config.db);
  await connection.execute(sql, params);
}

module.exports = {
  query,
  insert,
  update
}
