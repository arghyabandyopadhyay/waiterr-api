const db = require("./db");
const helper = require("../helper");

async function get(guid) {
  const result = await db.query(
    `SELECT MenuGroup.id as id, ImageUrl, StockGroup, OutletId, OutletName FROM MenuGroup INNER JOIN Outlets ON MenuGroup.OutletId=Outlets.id WHERE ClientId=?`,[guid]
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}
async function getForOutlet(guid,outletId) {
  const result = await db.query(
    `SELECT MenuGroup.id as id, ImageUrl, StockGroup, OutletId, OutletName FROM MenuGroup INNER JOIN Outlets ON MenuGroup.OutletId=Outlets.id WHERE ClientId=? AND OutletId=?`,[guid,outletId]
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

  let message = "Error in creating stock group";

  if (result.affectedRows) {
    message = "Success";
  }

  return { message };
}

async function update(id,outletId,stockGroup,imageUrl) {
  const result = await db.query(
    `UPDATE MenuGroup 
    SET 
    ImageUrl=?,
    StockGroup=?,
    OutletId=?
    WHERE id = ?`,[imageUrl,stockGroup,outletId,id]
  );

  let message = "Error in updating stock group";

  if (result.affectedRows) {
    message = "Success";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM MenuGroup WHERE id='${id}'`
  );

  let message = "Error in deleting stock group";

  if (result.affectedRows) {
    message = "Success";
  }

  return { message };
}

async function waiterMenuGroupCalculation(res, requestJson){
  const parameterList=requestJson.ParameterList;
      if(parameterList==null){
        res.json(await get(req.body.GUID));
      }
      else if(parameterList.length==1){
        var outletId;
        parameterList.forEach(element => {
          if(element.P_Key=='OutletId')outletId=element.P_Value;
        });
        const result=await getForOutlet(req.body.GUID,outletId);
        res.json(result);
      }
      else if(parameterList.length==5){
        var outletId,stockGroup,imageUrl,id,modificationType;
        parameterList.forEach(element => {
          if(element.P_Key=='OutletId')outletId=element.P_Value;
          else if(element.P_Key=='StockGroup')stockGroup=element.P_Value;
          else if(element.P_Key=='ImageUrl')imageUrl=element.P_Value;
          else if(element.P_Key=='id')id=element.P_Value;
          else if(element.P_Key=='ModificationType')modificationType=element.P_Value
        });
        if(modificationType=='Create'){
          const result=await create(req.body.GUID,outletId,stockGroup,imageUrl);
        res.json(result['message']);
        }
        else if(modificationType=='Edit'){
          const result=await update(id,outletId,stockGroup,imageUrl);
        res.json(result['message']);
        }
        else if(modificationType=='Delete'){
          const result=await remove(id);
          res.json(result['message']);
        }
      }
}

module.exports = {
  get,
  getForOutlet,
  create,
  update,
  remove,
  waiterMenuGroupCalculation
};
