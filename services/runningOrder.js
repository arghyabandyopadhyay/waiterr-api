const db = require("./db");
const helper = require("../helper");

async function get(guid) {
  const result = await db.query(
    `SELECT RunningOrder.id, isTerminated, RunningOrder.name as Name, MobileNo, SalePointType, SalePointName, Amount, PAX, ActiveSince, BillPrinted, OutletName, OutletId, MobileNumber as WaiterMoblieNo, UserDetails.Name as WaiterName FROM RunningOrder INNER JOIN UserDetails On RunningOrder.WaiterId=UserDetails.id INNER JOIN Outlets ON RunningOrder.OutletId=Outlets.id WHERE ClientId='${guid}' AND isTerminated=0 ORDER BY ActiveSince Desc`
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}

async function getForWaiterId(waiterId,includePastOrder) {
  console.log(includePastOrder?'ORDER BY isTerminated':'isTerminated=0 ORDER BY ActiveSince Desc');
  const result = await db.query(
    `SELECT RunningOrder.id, 
    isTerminated, 
    RunningOrder.name as Name, 
    MobileNo, 
    SalePointType, 
    SalePointName, 
    Amount, 
    PAX, 
    ActiveSince, 
    BillPrinted, 
    OutletName, 
    OutletId, 
    MobileNumber as WaiterMoblieNo, 
    UserDetails.Name as WaiterName 
    FROM RunningOrder 
    INNER JOIN 
    UserDetails On RunningOrder.WaiterId=UserDetails.id 
    INNER JOIN 
    Outlets ON RunningOrder.OutletId=Outlets.id 
    WHERE WaiterId=? ${includePastOrder?'ORDER BY isTerminated':'AND isTerminated=0 ORDER BY ActiveSince Desc'}`,[waiterId]
  );
  const data = helper.emptyOrRows(result);
    console.log(result);
  if(data.length>0)return data;
  else return ;
}

async function getForAddOrder(guid,outlet,salePointName,salePointType) {
  const result = await db.query(
    `SELECT RunningOrder.id, isTerminated, RunningOrder.name as Name, MobileNo, SalePointType, SalePointName, Amount, PAX, ActiveSince, BillPrinted, OutletName, OutletId, MobileNumber as WaiterMoblieNo, UserDetails.Name as WaiterName, KotNumbers FROM RunningOrder INNER JOIN UserDetails On RunningOrder.WaiterId=UserDetails.id INNER JOIN Outlets ON RunningOrder.OutletId=Outlets.id WHERE ClientId=? AND OutletName=? AND SalePointType=? AND SalePointName=? AND isTerminated=0`,[guid,outlet,salePointType,salePointName]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0)return data;
  else return [];
}

async function create(runningOrder,guid) {
  const isAlreadyAnActiveTable=await getForAddOrder(guid,runningOrder.OutletName,runningOrder.SalePointName,runningOrder.SalePointType);
  if(isAlreadyAnActiveTable==null||isAlreadyAnActiveTable.length==0){
    let amount=0;
    for(var menuListVal of runningOrder.menuList){
      amount+=(menuListVal.Rate*menuListVal.Quantity)*(1+menuListVal.TaxRate*0.01)
    }
    const result = await db.query(
      `INSERT INTO RunningOrder 
      (Name,MobileNo,SalePointType,SalePointName,WaiterId,Amount,PAX,BillPrinted,OutletId,ClientId)
      VALUES 
      (?,?,?,?,?,?,?,?,?,?);`,[runningOrder.CustomerName,runningOrder.MobileNumber,runningOrder.SalePointType,runningOrder.SalePointName,runningOrder.WaiterId,amount,runningOrder.PAX,0,runningOrder.OutletId,guid]
    );

    let message = "Error in creating running order";
      let kotNumber;
    if (result.affectedRows) {
      const lastId=await db.query('SELECT @last_uuid;');
      message = lastId[0]['@last_uuid'];
      kotNumber=1;
    }
    return { message,kotNumber };
  }
  else{
    let amount=0;
    for(var menuListVal of runningOrder.menuList){
      amount+=(menuListVal.Rate*menuListVal.Quantity)*(1+menuListVal.TaxRate*0.01)
    }
    var activeTable=isAlreadyAnActiveTable[0];
    var lastKotNumber=parseInt(activeTable.KotNumbers.split(',').slice(-1));
    var kotNumber=lastKotNumber+1;
    activeTable.KotNumbers=activeTable.KotNumbers+","+(kotNumber);
    activeTable.Amount+=amount;
    let res=await update(activeTable.id,activeTable);
    let message = "Error in creating running order";

    if (res['message']=="User Details updated successfully") {
      message = activeTable.id;
    }

    return { message, kotNumber };
  }
  
}

async function terminate(id) {
  const result = await db.query(
    `UPDATE RunningOrder 
    SET 
    isTerminated= 1 
    WHERE id = '${id}'`
  );

  let message = "Error in terminating running order";

  if (result.affectedRows) {
    message = "Running order terminated successfully";
  }

  return message;
}

async function update(id, runningOrder) {
  const result = await db.query(
    `UPDATE RunningOrder 
    SET 
    Name= '${runningOrder.Name}' ,
    MobileNo= '${runningOrder.MobileNo}' ,
    SalePointType= '${runningOrder.SalePointType}' ,
    SalePointName= '${runningOrder.SalePointName}',
    Amount= '${runningOrder.Amount}',
    PAX= ${runningOrder.PAX},
    BillPrinted= ${runningOrder.BillPrinted},
    OutletId= '${runningOrder.OutletId}',
    KotNumbers= '${runningOrder.KotNumbers}'
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



async function runningOrdersCalculation(res,req,requestJson){
  if(requestJson.ParameterList==null){
        res.json(await runningOrder.get(req.body.GUID));
      }
      else{
        const parameterList=requestJson.ParameterList;
        if(parameterList.length==2){
          var waiterId, includePastOrder;
          parameterList.forEach(element => {
            if(element.P_Key=='WaiterId')waiterId=element.P_Value;
            else if(element.P_Key=='IncludePastOrder')includePastOrder=element.P_Value;
          });
          res.json(await getForWaiterId(waiterId,includePastOrder));
        }
        else if(parameterList.length==1){
          var runningOrderId;
          parameterList.forEach(element=>{
            if(element.P_Key=='RunningOrderId')runningOrderId=element.P_Value;
          })
          res.json(await terminate(runningOrderId));
        }
      }
}

async function activeSalePointCalculation(res, req, requestJson){
  if(requestJson.ParameterList==null){
    res.json(await runningOrder.get(req.body.GUID));
  }
  else{
    const parameterList=requestJson.ParameterList;
    var outlet;
    var salePointType;
    var salePointName;
    parameterList.forEach(element => {
      if(element.P_Key=='Outlet')outlet=element.P_Value;
      else if(element.P_Key=='SalePointName')salePointName=element.P_Value;
      else if(element.P_Key=='SalePointType')salePointType=element.P_Value;
    });
    res.json(await getForAddOrder(req.body.GUID,outlet,salePointName,salePointType));
  }
}

module.exports = {
  get,
  getForWaiterId,
  getForAddOrder,
  create,
  update,
  terminate,
  remove,
  runningOrdersCalculation,
  activeSalePointCalculation
};
