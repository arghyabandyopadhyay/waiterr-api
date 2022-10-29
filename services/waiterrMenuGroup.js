const db = require("./db");
const helper = require("../helper");

async function get(guid) {
  const result = await db.query(
    `SELECT * FROM MenuGroup WHERE ClientId=?`,[guid]
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}
async function getForOutlet(guid,outletId) {
  const result = await db.query(
    `SELECT * FROM MenuGroup WHERE ClientId=? AND OutletId=?`,[guid,outletId]
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}

async function create(guid,outletId,stockGroup,imageUrl) {
  const result = await db.query(
    `INSERT INTO MenuGroup 
    (ImageUrl,StockGroup,ClientId,OutletId)
    VALUES 
    (?,?,?,?);`,[imageUrl,stockGroup,guid,outletId]
  );

  let message = "Error in creating running order";

  if (result.affectedRows) {
    message = "Success";
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
  getForOutlet,
  create,
  update,
  remove,
};
