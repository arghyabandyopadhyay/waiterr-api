const db = require("./db");
const helper = require("../helper");

async function get(id) {
  result = await db.query(
    `SELECT * FROM UserDetails WHERE id='${id}'`
  );
  const data = helper.emptyOrRows(result);
  return data[0];
}
async function getUsingMobileNo(mobile) {
  console.log(mobile);
  result = await db.query(
    `SELECT * FROM UserDetails WHERE MobileNumber=?`,[mobile]
  );
  const data = helper.emptyOrRows(result);
  return data[0];
}

async function getUsingMobileNoForWaiterRegistration(mobile) {
  let statusCode=204;
  let message={};
  result = await db.query(
    `SELECT * FROM UserDetails WHERE mobileNumber=?`,[mobile]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0){
    message=data[0];
    statusCode=200;
  }
  return {statusCode:statusCode,body:message};
}

async function create(userDetails) {
  let message;
  let statusCode;
  try{
    const result = await db.query(
      `INSERT INTO UserDetails (Name, MobileNumber, IsActive, RoleId) VALUES ("${userDetails.Name}", "${userDetails.MobileNumber}", ${userDetails.IsActive}, ${userDetails.RoleId});`
    );
    

    message = "Error in creating user Details";
    statusCode=500;
    if (result.affectedRows) {
      let userDetailData=await getUsingMobileNo(userDetails.MobileNumber);
      await db.query(
        `UPDATE Users SET UID='${userDetailData['id']}' WHERE id = ${userDetails.id}`
      );
      message = userDetailData;
      statusCode=200;
    }
  }catch(err){
    message=err.message;
    statusCode=403;
  }
  return {statusCode:statusCode,body:message};
}

async function update(id, userDetails) {
  const result = await db.query(
    `UPDATE UserDetails 
    SET 
    Name= '${userDetails.Name}' ,
    MobileNumber= '${userDetails.MobileNumber}' ,
    RoleId= ${userDetails.RoleId} ,
    IsActive= ${userDetails.IsActive},
    ProfileURL= '${userDetails.ProfileUrl}',
    deviceToken= '${userDetails.DeviceToken}'
    WHERE id = '${id}'`
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
  getUsingMobileNoForWaiterRegistration,
  getUsingMobileNo,
  create,
  update,
  remove,
};
