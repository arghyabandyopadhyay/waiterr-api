const db = require("./db");
const helper = require("../helper");

async function create(userId, menuItemId) {
    var statusCode, body;

    body = "Error in creating favourites";
    statusCode=500;

    if(helper.emptyOrRows(await db.query(`Select * from Favourites where userId=? AND menuId=?;`,[userId,menuItemId])).length==0)
    {
        result = await db.query(
            `Insert into Favourites(userId, menuId) values (?,?);`,[userId,menuItemId]
        );
        if (result.affectedRows) {
            body = "Success";
            statusCode=200;
        }
    }
    return {statusCode:statusCode,body:body};    
}

module.exports = {
    create
  };