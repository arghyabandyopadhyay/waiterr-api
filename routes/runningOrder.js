const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const jwt = require('jsonwebtoken');
const runningOrder = require("../services/runningOrder");
const config=require('../config/config');
const { json } = require("body-parser");

/* GET user detailss. */

// router.get("/", async function (req, res, next) {
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
//     res.json(await runningOrder.get(req.query.id));
//   } catch (err) {
//     res.status(401).json({message:'Unauthorised Access'});
//   }
// });

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
    const requestJson=JSON.parse(req.body.RequestJSON);
    if(requestJson.RequestType=="Running Orders"){
      if(requestJson.ParameterList==null){
        res.json(await runningOrder.get(req.body.GUID));
      }
      else{
        const parameterList=requestJson.ParameterList;
        var waiterId;
        parameterList.forEach(element => {
          if(element.P_Key=='WaiterId')waiterId=element.P_Value;
        });
        res.json(await runningOrder.get1(req.body.GUID,waiterId));
      }
    }
    else if(requestJson.RequestType=="Active Sale Point"){
      if(requestJson.ParameterList==null){
        res.json(await runningOrder.get(req.body.GUID));
      }
      else{
        const parameterList=requestJson.ParameterList;
        var outlet;
        var salePointType;
        var salePointName;
        parameterList.forEach(element => {
          if(element.P_Key=='Outlet')outlet=element.P_Value;
          else if(element.P_Key=='SalePointName')salePointName=element.P_Value;
          else if(element.P_Key=='SalePointType')salePointType=element.P_Value;
        });
        res.json(await runningOrder.get2(req.body.GUID,outlet,salePointName,salePointType));
      }
    }

    // res.json(await runningOrder.create(req.body));
  } catch (err) {
    console.log(err);
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
    res.json(await runningOrder.update(req.query.id, req.body));
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
    res.json(await runningOrder.remove(req.query.id));
  } catch (err) {
    res.status(401).json({message:'Unauthorised Access'});
  }
});

module.exports = router;
