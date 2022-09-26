const db = require("./db");
const helper = require("../helper");
const mysql = require("mysql2/promise");
const config = require("../config/config");

async function create(menuList,runningOrderId,guid) {
  let message,statusCode;
  const pool = mysql.createPool(config.db);

  await pool.getConnection()
    .then(async connection => {
        try {
          await connection.query('START TRANSACTION');
          for(var menuListVal of menuList){
            await connection.query('INSERT INTO Orders (ItemId,Quantity,CommentForKOT,runningOrderId,clientId) VALUES (?,?,?,?,?)', [
              menuListVal.ItemID, menuListVal.Quantity, menuListVal.CommentForKOT, runningOrderId, guid]);
          }
          await connection.commit();
          connection.release();
          message = 'success';
          statusCode=200;
      } catch (error) {
        message = "Error in creating order";
        statusCode=403;
        connection.release();
      }
    });
  return {statusCode:statusCode,message:message };
}

async function update(id, runningOrder) {
  const result = await db.query(
    `UPDATE RunningOrder 
    SET 
    Name= '${runningOrder.Name}' ,
    MobileNo= '${runningOrder.MobileNo}' ,
    SalePointType= '${runningOrder.SalePointType}' ,
    SalePointName= '${runningOrder.SalePointName}',
    WaiterName= '${runningOrder.WaiterName}',
    Amount= '${runningOrder.Amount}',
    PAX= ${runningOrder.PAX},
    ActiveSince= '${runningOrder.ActiveSince}',
    BillPrinted= ${runningOrder.BillPrinted},
    OutletName= '${runningOrder.OutletName}'
    WHERE id = '${id}'`
  );

  let message = "Error in updating user Details";

  if (result.affectedRows) {
    message = "User Details updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM RunningOrder WHERE id='${id}'`
  );

  let message = "Error in deleting running order";

  if (result.affectedRows) {
    message = "Running order deleted successfully";
  }

  return { message };
}

module.exports = {
  create,
  update,
  remove,
};
