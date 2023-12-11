const mysql = require("mysql2/promise");
const config = require("../config/config");
const logger=require("../logger");

var connection=null;
async function query(sql, params) {
  if(connection==null)connection=await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);
  logger.info(sql, results);
  return results;
}


  

module.exports = {
  query
};
