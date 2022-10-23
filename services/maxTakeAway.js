const db = require("./db");
const helper = require("../helper");

async function getLastTakeAway(outletId,date) {
  result = await db.query(
    `SELECT LastTakeAway,CurrentDate FROM MaxTakeAway WHERE outletId=?`,[outletId]
  );
  const data = helper.emptyOrRows(result);
  if(data.length==0){
    await create(outletId,0,date);
    return 1;
  }
  else{
    if(data[0].CurrentDate.toISOString()!=new Date(date).toISOString()){
      await update(0,outletId,date);
      return 1;
    }
    else{
      return data[0].LastTakeAway+1;
    }
  }
}

async function create(outletId,lastTakeAway,date) {
  let message;
  let statusCode;
  try{
    const result = await db.query(
      `INSERT INTO MaxTakeAway (OutletId, LastTakeAway, CurrentDate) VALUES (?,?,?);`,[outletId,lastTakeAway,date]
    );
    message = "Error in creating maxTakeAway";
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
    LastTakeAway=?,
    CurrentDate=?
    WHERE outletId =?`,[lastTakeAway,date,outletId]
  );

  let message = "Error in updating user Details";

  if (result.affectedRows) {
    message = "User Details updated successfully";
  }

  return { message };
}
async function updateLastTakeAway(lastTakeAway,outletId) {
  const result = await db.query(
    `UPDATE MaxTakeAway 
    SET 
    LastTakeAway=?
    WHERE outletId =? `,[lastTakeAway,outletId]
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
  getLastTakeAway,
  create,
  update,
  updateLastTakeAway,
  remove,
};
