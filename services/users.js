const db = require("./db");
const helper = require("../helper");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config=require('../config/config')
async function get(id) {
  result = await db.query(
    `SELECT * FROM Users WHERE id='${id}'`
  );
  const data = helper.emptyOrRows(result);
  return data[0];
}
async function login(user) {
  let message='';
  result = await db.query(
    `SELECT * FROM Users WHERE MobileNumber='${user.MobileNumber}'`
  );
  if (!result.length) {
    if(user.Password!=config.loginPassword)return {'statusCode':401,'body':'Mobile number not registered!'};
    else {
      await create(user);
      let message1='';
      result1 = await db.query(
        `SELECT * FROM Users WHERE MobileNumber='${user.MobileNumber}'`
      );
      resultCompare= await bcrypt.compare(
        user.Password,
        result1[0]['Password']
      );
      // correct password
      if (resultCompare) {
        const token = jwt.sign({id:result1[0].id},config.secretCode,{ expiresIn: '1h' });
        result2=await db.query(
          `UPDATE Users SET last_login = now() WHERE id = '${result1[0].id}'`
        );
        message=result1[0];
        message['token']=token;
        message['Password']="";
        return {'statusCode':200,'body':message};
      }
      else return {'statusCode':401,'body':'Incorrect Password!'};
    }
  }
  else{
  // check password
    resultCompare= await bcrypt.compare(
      user.Password,
      result[0]['Password']
    );
    // correct password
    if (resultCompare) {
      const token = jwt.sign({id:result[0].id},config.secretCode,{ expiresIn: '1h' });
      result1=await db.query(
        `UPDATE Users SET last_login = now() WHERE id = '${result[0].id}'`
      );
      message=result[0];
      message['token']=token;
      message['Password']="";
      return {'statusCode':200,'body':message};
    }
    else return {'statusCode':401,'body':'Incorrect Password!'};
    
  }
}
async function create(user) {
    const result = await db.query(`SELECT * FROM Users WHERE MobileNumber = '${user.MobileNumber}';`);
      if (result.length) {
        return {statusCode:200,body:'This user is already in use!'};
      } else {
        // username is available
        const hash=await bcrypt.hash(config.loginPassword, 10);
        const result1=await db.query(
            `INSERT INTO Users (name, MobileNumber, password) VALUES ('${user.Name}', '${user.MobileNumber}', '${hash}')`,
        );
        statusCode1=500;
        message='Error while registering user';
        if(result1.affectedRows){
            message='The user has been registered with us';
            statusCode1=200;
        }
        return {statusCode:statusCode1,body:message};
      }
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
  login,
  create,
  update,
  remove,
};
