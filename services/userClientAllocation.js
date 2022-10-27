const db = require("./db");
const helper = require("../helper");

async function get(userId) {
  result = await db.query(
    `SELECT Outlets.id, GUID, CompanyGUID, OutletName, OutletSalePoint, ClientName, LogoUrl, DataExchangeVia, DataExchangeUrl FROM UserClientAllocation  LEFT JOIN Outlets ON UserClientAllocation.OutletId=Outlets.id LEFT JOIN Clients ON Outlets.GUID = Clients.id WHERE UserId='${userId}'`
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
    `SELECT UserDetails.id AS id, Name, MobileNumber, RoleId, IsActive, last_login, Outlets.id AS OutletId, OutletName FROM Clients LEFT JOIN Outlets ON Clients.id=Outlets.GUID LEFT JOIN UserClientAllocation ON Outlets.id=UserClientAllocation.OutletId LEFT JOIN UserDetails ON UserClientAllocation.UserId=UserDetails.id WHERE RoleId=1 AND Clients.id=?`,[guid]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0){
    return {statusCode:200,body:data};
  }
  else return{statusCode:204,body:""};
}

async function create(userId, outletId) {
  let message;
  let statusCode;
  try{
    const result = await db.query(
      `INSERT INTO UserClientAllocation (UserId, OutletId) VALUES (?, ?);`,[userId,outletId]
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

async function update(id, userClientAllocation) {
  const result = await db.query(
    `UPDATE UserClientAllocation 
    SET 
    ClientName= '${userClientAllocation.Name}' ,
    LogoUrl= '${userClientAllocation.LogoUrl}' ,
    DataExchangeVia= ${userClientAllocation.DataExchangeVia} ,
    DataExchangeUrl= ${userClientAllocation.DataExchangeUrl},
    GUID= '${userClientAllocation.GUID}',
    CompanyGUID= '${userClientAllocation.CompanyGUID}'
    OutletName= '${userClientAllocation.OutletName}'
    OutletSalePoint= '${userClientAllocation.OutletSalePoint}'
    WHERE id = '${id}'`
  );

  let message = "Error in updating user client allocation data";

  if (result.affectedRows) {
    message = "User client allocation data updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM UserClientAllocation WHERE id='${id}'`
  );

  let message = "Error in deleting user client allocation";

  if (result.affectedRows) {
    message = "User client allocation data deleted successfully";
  }

  return { message };
}

module.exports = {
  get,
  getAllWaiters,
  create,
  update,
  remove,
};
