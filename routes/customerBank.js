const express = require("express");
const router = express.Router();
const customerDetail = require("../services/customerBank");
const userDetails=require("../services/userDetails");
const jwt = require('jsonwebtoken');
const logger=require("../logger");
const config=require('../config/config');
const { result } = require("lodash");
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
    var result=await userDetails.getUsingMobileNo(req.query.mobile);
    if(result==null){
      result=await customerDetail.getUsingMobileNo(req.query.mobile);
      if(result!=null){
        result["DataSource"]='CustomerBank';
      }
    }
    else result["DataSource"]='UserDetails';
    res.status(200).json(result);
  } catch (err) {
    logger.error(err)
    res.status(500).json({message:'Internal server error'});
  }
});

/* POST user details */
router.post("/", async function (req, res, next) {
  logger.info('requested post customerBank/');
  if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ){
    logger.info('Please provide the token')
    return res.status(422).json({
        message: "Please provide the token",
    });
  }

const theToken = req.headers.authorization.split(' ')[1];
  try {
    jwt.verify(theToken, config.secretCode);
    logger.info('jwt verified');
    var result=await customerDetail.create(req.body);
    result['body']["DataSource"]='CustomerBank';
    logger.info('response:', result);
    res.status(result['statusCode']).json(result['body']);
  } catch (err) {
    logger.info('error occured:', err);
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
