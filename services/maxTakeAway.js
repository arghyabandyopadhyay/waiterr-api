const db = require("./db");
const helper = require("../helper");

async function get(outletId,date) {
  result = await db.query(
    `SELECT LastTakeAway FROM MaxTakeAway WHERE outletId='${outletId}' AND date='${date}`
  );
  const data = helper.emptyOrRows(result);
  return data[0];
}

async function create(outletId,gui) {
  let message;
  let statusCode;
  try{
    const result = await db.query(
      `INSERT INTO MaxTakeAway (OutletId) VALUES (?);`,[outletId]
    );
    

    message = "Error in creating user Details";
    statusCode=500;
    if (result.affectedRows) {
      message = 'success';
      statusCode=200;
    }
  }catch(err){
    message=err.message;
    statusCode=403;
  }
  return {statusCode:statusCode,body:message};
}

async function update(lastTakeAway,outletId,date) {
  const result = await db.query(
    `UPDATE MaxTakeAway 
    SET 
    LastTakeAway= '${lastTakeAway}'
    WHERE outletId = '${outletId}' AND date = '${date}'`
  );

  let message = "Error in updating user Details";

  if (result.affectedRows) {
    message = "User Details updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM UserDetails WHERE id='${id}'`
  );

  let message = "Error in deleting user detail";

  if (result.affectedRows) {
    message = "User detail deleted successfully";
  }

  return { message };
}

module.exports = {
  get,
  create,
  update,
  remove,
};
