const express = require('express');
const router = express.Router();
const db  = require('../services/db');
const user = require('../services/users')
const { signupValidation, loginValidation } = require('../validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config=require('../config/config')

router.post('/register', signupValidation,async function (req, res, next) {
  try {
    result=await user.create(req.body);
    res.status(result['statusCode']).json(result['body']);
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

router.post('/login', loginValidation, async function(req, res, next) {
  try {
    result=await user.login(req.body);
    res.status(result['statusCode']).json(result['body']);
  } catch (err) {
    console.error(`Error while creating user details`, err.message);
    next(err);
  }
});

// router.post('/get-user', signupValidation, async function (req, res, next) {
//     if(
//         !req.headers.authorization ||
//         !req.headers.authorization.startsWith('Bearer') ||
//         !req.headers.authorization.split(' ')[1]
//     ){
//         return res.status(422).json({
//             message: "Please provide the token",
//         });
//     }

//     const theToken = req.headers.authorization.split(' ')[1];
//     try{
//       const decoded = jwt.verify(theToken, config.secretCode);
//       results= await db.query(`SELECT * FROM Users where id='${decoded.id}';`);
//       res.json({ error: false, data: results[0], message: 'Fetch Successfully.' });
//     }
//     catch(err){res.status(401).json({message:'Unauthorised Access'});}
//   }
// );


module.exports = router;