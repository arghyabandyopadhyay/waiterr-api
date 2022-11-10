const db = require("./db");
const helper = require("../helper");

async function get(guid) {
    var statusCode, body;
  const result = await db.query(
    `SELECT * FROM Outlets WHERE GUID=?`,[guid]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0){
    statusCode=200;
    body=data;
}
  else {statusCode=204; body="No outlets present";}
  return {statusCode:statusCode,body:body};
}

async function create(guid, outletName, outletSalePoint, userId) {
    var statusCode, body;
  const result = await db.query(
    `CALL ADD_OUTLET(?,?,?,?);`,[outletName,outletSalePoint,guid,userId]
  );

  statusCode=404;
  body = "Error in creating outlet";

  if (result.affectedRows) {
    statusCode=200;
    body = "Success";
  }

  return {statusCode:statusCode,body:body};
}

async function update(id, outletName, outletSalePoint) {
  const result = await db.query(
    `UPDATE Outlets 
    SET 
    OutletName= ? ,
    OutletSalePoint= ?
    WHERE id = ?`,[outletName,outletSalePoint,id]
  );

  statusCode=404;
  body = "Error in updating outlet";

  if (result.affectedRows) {
    statusCode=200;
    body = "Success";
  }

  return {statusCode:statusCode,body:body};
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM Outlets WHERE id='${id}'`
  );

  statusCode=404;
  body = "Error in deleting outlet";

  if (result.affectedRows) {
    statusCode=200;
    body = "Success";
  }

  return {statusCode:statusCode,body:body};
}

module.exports = {
  get,
  create,
  update,
  remove,
};
