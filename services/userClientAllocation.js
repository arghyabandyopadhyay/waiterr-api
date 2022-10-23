const db = require("./db");
const helper = require("../helper");

async function get(userId) {
  result = await db.query(
    `SELECT UserClientAllocation.id, GUID, CompanyGUID, OutletName, OutletSalePoint, ClientName, LogoUrl, DataExchangeVia, DataExchangeUrl FROM UserClientAllocation LEFT JOIN Clients ON UserClientAllocation.GUID = Clients.id WHERE UserId='${userId}'`
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

async function create(userClientAllocation) {
  let message;
  let statusCode;
  try{
    const result = await db.query(
      `INSERT INTO UserClientAllocation (ClientName, LogoUrl, DataExchangeVia, DataExchangeUrl, GUID, CompanyGUID, OutletName, OutletSalePoint) VALUES ("${userClientAllocation.ClientName}", "${userClientAllocation.LogoUrl}", "${userClientAllocation.DataExchangeVia}", "${userClientAllocation.DataExchangeUrl}", "${userClientAllocation.GUID}", "${userClientAllocation.CompanyGUID}", "${userClientAllocation.OutletName}", "${userClientAllocation.OutletSalePoint}");`
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
  create,
  update,
  remove,
};
