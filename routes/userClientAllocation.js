const express = require("express");
const router = express.Router();
const userClientAllocation = require("../services/userClientAllocation");
const jwt = require('jsonwebtoken');
const config=require('../config/config');
/* GET user client allocation data. */

router.get("/", async function (req, res, next) {
  if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ){
    return res.status(422).json({
        message: "Please provide the token",
    });
  }

const theToken = req.headers.authorization.split(' ')[1];
  try {
    jwt.verify(theToken, config.secretCode);
    result=await userClientAllocation.get(req.query.id);
    res.status(result['statusCode']).json(result['body']);
  } catch (err) {
    res.status(401).json({message:'Unauthorised Access'});
  }
});

/* POST user details */
// router.post("/", async function (req, res, next) {
//   if(
//     !req.headers.authorization ||
//     !req.headers.authorization.startsWith('Bearer') ||
//     !req.headers.authorization.split(' ')[1]
//   ){
//     return res.status(422).json({
//         message: "Please provide the token",
//     });
//   }

// const theToken = req.headers.authorization.split(' ')[1];
//   try {
//     jwt.verify(theToken, config.secretCode);
//     result=await userClientAllocation.create(req.body);
//     res.status(result['statusCode']).json(result['body']);
//   } catch (err) {
//     logger.info(err);
//     res.status(401).json({message:'Unauthorised Access'});
//   }
// });

/* PUT user details */
router.put("/", async function (req, res, next) {
  if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ){
    return res.status(422).json({
        message: "Please provide the token",
    });
  }

const theToken = req.headers.authorization.split(' ')[1];
  try {
    jwt.verify(theToken, config.secretCode);
    res.json(await userClientAllocation.update(req.query.id, req.body));
  } catch (err) {
    res.status(401).json({message:'Unauthorised Access'});
  }
});

/* DELETE user details */
router.delete("/", async function (req, res, next) {
  if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ){
    return res.status(422).json({
        message: "Please provide the token",
    });
  }

const theToken = req.headers.authorization.split(' ')[1];
  try {
    jwt.verify(theToken, config.secretCode);
    res.json(await userClientAllocation.remove(req.query.id));
  } catch (err) {
    res.status(401).json({message:'Unauthorised Access'});
  }
});

module.exports = router;
