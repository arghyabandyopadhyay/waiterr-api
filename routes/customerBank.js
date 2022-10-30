const express = require("express");
const router = express.Router();
const customerDetail = require("../services/customerBank");
const jwt = require('jsonwebtoken');
const config=require('../config/config')
/* GET user detailss. */

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
    res.json(await customerDetail.getUsingMobileNo(req.query.mobile));
  } catch (err) {
    res.status(401).json({message:'Unauthorised Access'});
  }
});

/* POST user details */
router.post("/", async function (req, res, next) {
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
    result=await customerDetail.create(req.body);
    res.status(result['statusCode']).json(result['body']);
  } catch (err) {
    res.status(401).json({message:'Unauthorised Access'});
  }
});

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
    var result=await customerDetail.update(req.query.id, req.body);
    res.status(result['statusCode']).json(result['body']);
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
    res.json(await customerDetail.remove(req.query.id));
  } catch (err) {
    res.status(401).json({message:'Unauthorised Access'});
  }
});

module.exports = router;
