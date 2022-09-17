const db = require("./db");
const helper = require("../helper");

async function get(id) {
  const result = await db.query(
    `SELECT * FROM RunningOrder WHERE id='${id}'`
  );
  const data = helper.emptyOrRows(result);

  return data[0];
}

async function create(runningOrder) {
  const result = await db.query(
    `INSERT INTO RunningOrder 
    (Name,MobileNo,SalePointType,SalePointName,WaiterName,Amount,PAX,BillPrinted,OutletName)
    VALUES 
    ('${runningOrder.Name}' ,'${runningOrder.MobileNo}' ,'${runningOrder.SalePointType}' ,'${runningOrder.SalePointName}','${runningOrder.WaiterName}','${runningOrder.Amount}',${runningOrder.PAX},${runningOrder.BillPrinted},'${runningOrder.OutletName}');`
  );

  let message = "Error in creating running order";

  if (result.affectedRows) {
    message = "Running order created successfully";
  }

  return { message };
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
  get,
  create,
  update,
  remove,
};
