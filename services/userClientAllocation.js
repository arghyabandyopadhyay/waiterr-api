const db = require("./db");
const helper = require("../helper");

async function get(id) {
  result = await db.query(
    `SELECT * FROM UserClientAllocation WHERE id='${id}'`
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0)return {statusCode:200,body:data[0]};
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
