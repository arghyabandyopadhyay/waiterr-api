const db = require("./db");
const helper = require("../helper");

async function getUsingMenuItemId(menuItemId) {
    let message;
    let statusCode;
    try{
        const result = await db.query(
            `SELECT * FROM CommentForKotSuggestions WHERE MenuItemId=?;`,[menuItemId]
            );
        const result1 = await db.query(
            `SELECT * FROM CommentForKotSuggestions WHERE MenuItemId!=?;`,[menuItemId]
            );
        const data=helper.emptyOrRows(result).concat(helper.emptyOrRows(result1));
        message = data;
        statusCode=200;
      }catch(err){
        message=err.message;
        statusCode=403;
      }
    return {statusCode:statusCode,body:message};
}

async function create(commentForKOT) {
  let message;
  let statusCode;
  try{
    const result = await db.query(
      `INSERT INTO CommentForKotSuggestions (CommentForKOT, MenuItemId) VALUES (?,?);`,[commentForKOT.comment, commentForKOT.menuItemId]
    );
        message = "Error in creating customer details";
    statusCode=500;
    if (result.affectedRows) {
      let commentForKOTFinal=await getUsingMenuItemId(customerDetail.menuItemId);
      message = commentForKOTFinal;
      statusCode=200;
    }
  }catch(err){
    message=err.message;
    statusCode=403;
  }
  return {statusCode:statusCode,body:message};
}


async function remove(id) {
  const result = await db.query(
    `DELETE FROM CommentForKotSuggestions WHERE id='${id}'`
  );
  let message = "Error in deleting user detail";
  let statusCode=404;
  if (result.affectedRows) {
    message = "User detail deleted successfully";
    statusCode=200;
  }
  return {statusCode:statusCode,body:message};
}

module.exports = {
  getUsingMenuItemId,
  create,
  remove,
};
