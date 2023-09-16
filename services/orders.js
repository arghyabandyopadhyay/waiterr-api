const db = require("./db");
const helper = require("../helper");
const mysql = require("mysql2/promise");
const config = require("../config/config");
const commentForKotSuggestions=require("../services/commentForKotSuggestions");
const runningOrder = require("../services/runningOrder");
const maxTakeAway= require("../services/maxTakeAway");
const favourites= require("../services/favourites");

async function create(menuList,runningOrderId,runningOrderKotNumber,guid,userId) {
  console.log(menuList, runningOrderId, runningOrderKotNumber, guid);
  let message,statusCode;
  const pool = mysql.createPool(config.db);

  await pool.getConnection()
    .then(async connection => {
        try {
          await connection.beginTransaction();
          for(var menuListVal of menuList){
            await connection.query('INSERT INTO Orders (ItemId,Quantity,CommentForKOT,runningOrderId,KotNumber,clientId) VALUES (?,?,?,?,?,?)', [
              menuListVal.ItemID, menuListVal.Quantity, menuListVal.CommentForKOT,  runningOrderId,runningOrderKotNumber, guid]);
            if(menuListVal.CommentForKOTId==null){
              await commentForKotSuggestions.create({comment:menuListVal.CommentForKOT,menuItemId:menuListVal.ItemID});
            }
            await favourites.create(userId,menuListVal.ItemID);
          }
          await connection.commit();
          connection.release();
          message = 'success';
          statusCode=200;
      } catch (error) {
        await connection.rollback();
        connection.release();
        console.log(error);
        message = "Error in creating order";
        statusCode=403;
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

async function Calculation(res,req, requestJson){
  const responseBody=(JSON.parse(requestJson.RequestBody));
      const lastId=await runningOrder.create(responseBody,req.body.GUID);
      const result=await create(responseBody.menuList,lastId.message,lastId.kotNumber,req.body.GUID, responseBody.CustomerId);
      if(result['statusCode']==200&&responseBody.SalePointType=="TAKE-AWAY"){
        await maxTakeAway.updateLastTakeAway(parseInt(responseBody.SalePointName),responseBody.OutletId);
      }
      res.status(result['statusCode']).json(result['message']);
}
module.exports = {
  create,
  update,
  remove,
  Calculation
};
