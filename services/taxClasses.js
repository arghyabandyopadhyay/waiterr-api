const db = require("./db");
const helper = require("../helper");

async function get(guid) {
  const result = await db.query(
    `SELECT * FROM TaxClasses WHERE ClientId=?`,[guid]
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}

async function create(guid, taxClass, taxRate) {
  const result = await db.query(
    `INSERT INTO TaxClasses 
    (TaxClass,TaxRate,ClientId,MasterFilter)
    VALUES 
    (?,?,?,?);`,[taxClass,taxRate,guid,(taxClass+taxRate)]
  );

  let message = "Error in creating running order";

  if (result.affectedRows) {
    message = "Success";
  }

  return { message };
}

async function update(id, taxClass,taxRate) {
  const result = await db.query(
    `UPDATE TaxClasses 
    SET 
    TaxClass= ? ,
    TaxRate= ?
    WHERE id = ?`,[taxClass,taxRate,id]
  );

  let message = "Error in updating tax class";

  if (result.affectedRows) {
    message = "Success";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM TaxClasses WHERE id='${id}'`
  );

  let message = "Error in deleting tax class";

  if (result.affectedRows) {
    message = "Success";
  }

  return { message };
}

module.exports = {
  get,
  create,
  update,
  remove,
};
