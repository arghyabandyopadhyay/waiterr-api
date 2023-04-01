const db = require("./db");
const helper = require("../helper");
const userDetails=require("../services/userDetails");

async function get(userId) {
  result = await db.query(
    `SELECT Outlets.id, GUID, CompanyGUID, OutletName, OutletSalePoint, ClientName, LogoUrl, DataExchangeVia, DataExchangeUrl, UCARoleId FROM UserClientAllocation INNER JOIN Outlets ON UserClientAllocation.OutletId=Outlets.id INNER JOIN Clients ON Outlets.GUID = Clients.id WHERE UserId=?`,[userId]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0){
    var groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var groupedByGUID = groupBy(data, 'GUID');
    var resultJson=[];
    for(var key in groupedByGUID){
      const outletConfiguration=[];
      groupedByGUID[key].forEach(element => {
        outletConfiguration.push({id:element.id, OutletName:element.OutletName,OutletSalePoint:element.OutletSalePoint});
      });
      groupedByGUID[key][0]['outletConfiguration']=outletConfiguration;
      delete groupedByGUID[key][0].OutletName;
      delete groupedByGUID[key][0].OutletSalePoint;
      resultJson.push(groupedByGUID[key][0]);
    }

    return {statusCode:200,body:resultJson};
  }
  else return{statusCode:204,body:""};
}

async function getAllWaiters(guid) {
  result = await db.query(
    `SELECT UserDetails.id AS id, UserClientAllocation.id AS UserClientAllocationId, Name, MobileNumber, RoleId, IsActive, last_login, Outlets.id AS OutletId, OutletName, UCARoleId FROM Clients INNER JOIN Outlets ON Clients.id=Outlets.GUID INNER JOIN UserClientAllocation ON Outlets.id=UserClientAllocation.OutletId INNER JOIN UserDetails ON UserClientAllocation.UserId=UserDetails.id WHERE Clients.id=? ORDER BY UserClientAllocation.OutletId`,[guid]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0){
    return {statusCode:200,body:data};
  }
  else return{statusCode:204,body:""};
}

async function create(userId, outletId,ucaRoleId) {
  let message;
  let statusCode;
  try{
    const result = await db.query(
      `INSERT INTO UserClientAllocation (UserId, OutletId, UCARoleId) VALUES (?, ?, ?);`,[userId,outletId,ucaRoleId]
    );
    message = "Error in creating user client allocation";
    statusCode=500;
    if (result.affectedRows) {
      message = "user client allocation data inserted";
      statusCode=200;
    }
  }catch(err){
    message=err.message;
    statusCode=403;
  }
  return {statusCode:statusCode,body:message};
}
async function update(id, outletId,ucaRoleId){
  let message;
  let statusCode;
  try{
    const result = await db.query(
      `UPDATE UserClientAllocation 
      SET 
      OutletId=?,
      UCARoleId=?
      WHERE id =?`,[outletId,ucaRoleId,id]
    );
    message = "Error in creating user client allocation";
    statusCode=500;
    if (result.affectedRows) {
      message = "Success";
      statusCode=200;
    }
  }catch(err){
    message=err.message;
    statusCode=403;
  }
  return {statusCode:statusCode,body:message};
}

async function remove(id) {
  let message;
  let statusCode;
  try{
    const result = await db.query(
      `DELETE FROM UserClientAllocation WHERE id='${id}'`
    );
    message = "Error in deleting user client allocation";
    statusCode=500;
    if (result.affectedRows) {
      message = "User client allocation data deleted successfully";
      statusCode=200;
    }
  }catch(err){
      message=err.message;
      statusCode=403;
  }
  return {statusCode:statusCode,body:message};
}

async function Calculation(res,req, requestJson){
  const parameterList=requestJson.ParameterList;
      //get all waiters
      if(parameterList==null){
        const result=await getAllWaiters(req.body.GUID);
        res.status(result['statusCode']).json(result['body']);  
      } 
      //get waiter detail
      else if(parameterList.length==1){
        var mobileNo;
        parameterList.forEach(element => {
          if(element.P_Key=='MobileNo')mobileNo=element.P_Value;
        });
        const result=await userDetails.getUsingMobileNoForWaiterRegistration(mobileNo);
        res.status(result['statusCode']).json(result['body']);  
      } 
      //create a new waiter  
      else if(parameterList.length==4){
        var id,ucaRoleId,outletId,modificationType;
        parameterList.forEach(element => {
          if(element.P_Key=='id')id=element.P_Value;
          else if(element.P_Key=='UCARoleId')ucaRoleId=element.P_Value;
          else if(element.P_Key=="OutletId")outletId=element.P_Value;
          else if(element.P_Key=="ModificationType")modificationType=element.P_Value;
        });
        if(modificationType=="Create"){
          //here the user id is the id
          const result=await create(id,outletId,ucaRoleId);
          res.status(result['statusCode']).json(result['body']);  
        }
        if(modificationType=="Edit"){
          //here the userClientAllocationid is the id
          const result=await update(id,outletId,ucaRoleId);
          res.status(result['statusCode']).json(result['body']);  
        }
        else if(modificationType=="Delete"){
          //here the userClientAllocation id is the id
          const result=await remove(id);
          res.status(result['statusCode']).json(result['body']);  
        }
      }
}
module.exports = {
  get,
  getAllWaiters,
  create,
  update,
  remove,
  Calculation
};
