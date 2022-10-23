const db = require("./db");
const helper = require("../helper");

async function get(guid) {
  const result = await db.query(
    `SELECT RunningOrder.id, RunningOrder.name as Name, MobileNo, SalePointType, SalePointName, Amount, PAX, ActiveSince, BillPrinted, OutletName, MobileNumber as WaiterMoblieNo, UserDetails.Name as WaiterName FROM RunningOrder LEFT JOIN UserDetails On RunningOrder.WaiterId=UserDetails.id WHERE ClientId='${guid}'`
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}

async function get1(guid,waiterId) {
  const result = await db.query(
    `SELECT RunningOrder.id, RunningOrder.name as Name, MobileNo, SalePointType, SalePointName, Amount, PAX, ActiveSince, BillPrinted, OutletName, MobileNumber as WaiterMoblieNo, UserDetails.Name as WaiterName FROM RunningOrder LEFT JOIN UserDetails On RunningOrder.WaiterId=UserDetails.id WHERE ClientId='${guid}' AND WaiterId='${waiterId}'`
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}

async function get2(guid,outlet,salePointName,salePointType) {
  const result = await db.query(
    `SELECT RunningOrder.id, RunningOrder.name as Name, MobileNo, SalePointType, SalePointName, Amount, PAX, ActiveSince, BillPrinted, OutletName, MobileNumber as WaiterMoblieNo, UserDetails.Name as WaiterName FROM RunningOrder LEFT JOIN UserDetails On RunningOrder.WaiterId=UserDetails.id WHERE ClientId='${guid}' AND OutletName='${outlet}' AND SalePointType='${salePointType}' AND SalePointName='${salePointName}'`
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}

async function create(runningOrder,guid) {
  let amount=0;
  for(var menuListVal of runningOrder.menuList){
    amount+=(menuListVal.Rate*menuListVal.Quantity)*(1+menuListVal.TaxRate*0.01)
  }
  const result = await db.query(
    `INSERT INTO RunningOrder 
    (Name,MobileNo,SalePointType,SalePointName,WaiterId,Amount,PAX,BillPrinted,OutletName,ClientId)
    VALUES 
    (?,?,?,?,?,?,?,?,?,?);`,[runningOrder.CustomerName,runningOrder.MobileNumber,runningOrder.SalePointType,runningOrder.SalePointName,runningOrder.WaiterId,amount,runningOrder.PAX,0,runningOrder.OutletName,guid]
  );

  let message = "Error in creating running order";

  if (result.affectedRows) {
    const lastId=await db.query('SELECT @last_uuid;');
    message = lastId[0]['@last_uuid'];
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
  get1,
  get2,
  create,
  update,
  remove,
};
