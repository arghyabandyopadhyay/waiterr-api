const db = require("./db");
const helper = require("../helper");

async function get(id) {
  result = await db.query(
    `SELECT * FROM CustomerDetails WHERE id='${id}'`
  );
  const data = helper.emptyOrRows(result);
  return data[0];
}
async function getUsingMobileNo(mobile) {
  result = await db.query(
    `SELECT * FROM CustomerDetails WHERE mobileNumber='${mobile}'`
  );
  const data = helper.emptyOrRows(result);
  return data[0];
}

async function create(customerDetail) {
  let message;
  let statusCode;
  try{
    const result = await db.query(
      `INSERT INTO CustomerDetails (Name, MobileNumber) VALUES ("${customerDetail.Name}", "${customerDetail.MobileNumber}");`
    );
    

    message = "Error in creating customer details";
    statusCode=500;
    if (result.affectedRows) {
      let customerDetail1=await getUsingMobileNo(customerDetail.MobileNumber);
      message = customerDetail1;
      statusCode=200;
    }
  }catch(err){
    message=err.message;
    statusCode=403;
  }
  return {statusCode:statusCode,body:message};
}

async function update(id, customerDetail) {
    let message,statusCode;
    try{
        const result = await db.query(
            `UPDATE CustomerDetails 
            SET 
            Name= '${customerDetail.Name}' ,
            MobileNumber= '${customerDetail.MobileNumber}'
            WHERE id = '${id}'`
        );

    message = "Error in updating customer details";

    if (result.affectedRows) {
        statusCode=200;
        message = "User Details updated successfully";
}}catch(err){
    console.log(err);
    message=err.message;
    statusCode=403;
  }

  return {statusCode:statusCode,body:message};
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM CustomerDetails WHERE id='${id}'`
  );

  let message = "Error in deleting user detail";

  if (result.affectedRows) {
    message = "User detail deleted successfully";
  }

  return { message };
}

module.exports = {
  get,
  getUsingMobileNo,
  create,
  update,
  remove,
};
