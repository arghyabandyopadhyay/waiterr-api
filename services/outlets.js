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

async function Calculation(res,req, requestJson){
  const parameterList=requestJson.ParameterList;
      //get all outlets
      if(parameterList==null){
        const result=await get(req.body.GUID);
        res.status(result['statusCode']).json(result['body']);  
      } 
      else if(parameterList.length==1){
        var id;
        parameterList.forEach(element => {
          if(element.P_Key=='id')id=element.P_Value;
        });
        const result=await remove(id);
        res.status(result['statusCode']).json(result['body']);  
      }
      else{
        var outletName,outletSalePoint,id,modificationType;
        parameterList.forEach(element => {
          if(element.P_Key=='OutletName')outletName=element.P_Value;
          else if(element.P_Key=='OutletSalePoint')outletSalePoint=element.P_Value;
          else if(element.P_Key=='id')id=element.P_Value;
          else if(element.P_Key=='ModificationType')modificationType=element.P_Value;
        });
        if(modificationType=='Create'){
          const result=await create(req.body.GUID,outletName,outletSalePoint,id);
          res.status(result['statusCode']).json(result['body']); 
        }
        else if(modificationType=='Update'){
          const result=await update(id,outletName,outletSalePoint);
          res.status(result['statusCode']).json(result['body']); 
        }
        else if(modificationType=="Delete"){
          const result=await remove(id);
          res.status(result['statusCode']).json(result['body']);  
        } 
      }
}
module.exports = {
  get,
  create,
  update,
  remove,
  Calculation
};
