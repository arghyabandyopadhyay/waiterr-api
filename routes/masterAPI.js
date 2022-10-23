const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const jwt = require('jsonwebtoken');
const runningOrder = require("../services/runningOrder");
const waiterrMenu=require("../services/waiterrMenu");
const waiterrMenuGroup=require("../services/waiterrMenuGroup");
const maxTakeAway=require("../services/maxTakeAway");
const commentForKotSuggestions=require("../services/commentForKotSuggestions");
const salePointHistory=require("../services/salePointHistory");
const orders=require("../services/orders");
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
        res.json(await runningOrder.getForWaiterId(waiterId));
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
        res.json(await runningOrder.getForAddOrder(req.body.GUID,outlet,salePointName,salePointType));
      }
    }
    else if(requestJson.RequestType=="Waiterr Menu"){
      if(requestJson.ParameterList==null){
        res.json(await waiterrMenu.get(req.body.GUID));
      }
      else{
        const parameterList=requestJson.ParameterList;
        var clientMobile,restaurantId;
        parameterList.forEach(element => {
          if(element.P_Key=='clientMobile')clientMobile=element.P_Value;
          else if(element.P_Key=='restaurantId')restaurantId=element.P_Value;
        });
        res.json(await waiterrMenu.get(req.body.GUID,restaurantId));
      }
    }
    else if(requestJson.RequestType=="Waiterr Menu Group"){
      res.json(await waiterrMenuGroup.get(req.body.GUID));
    }
    else if(requestJson.RequestType=="Place Order"){
      const responseBody=(JSON.parse(requestJson.RequestBody));
      const lastId=await runningOrder.create(responseBody,req.body.GUID);
      const result=await orders.create(responseBody.menuList,lastId.message,lastId.kotNumber,req.body.GUID);
      if(result['statusCode']==200&&responseBody.SalePointType=="TAKE-AWAY"){
        await maxTakeAway.updateLastTakeAway(parseInt(responseBody.SalePointName),responseBody.OutletId);
      }
      res.status(result['statusCode']).json(result['message']);
    }
    else if(requestJson.RequestType=="Max TakeAway"){
      const parameterList=requestJson.ParameterList;
        var outletId,date;
        parameterList.forEach(element => {
          if(element.P_Key=='outletId')outletId=element.P_Value;
          else if(element.P_Key=='currentDate')date=element.P_Value;
        });
        res.json(await maxTakeAway.getLastTakeAway(outletId,date));
    }
    else if(requestJson.RequestType=="Comment For KOT"){
      const parameterList=requestJson.ParameterList;
        var menuItemId;
        parameterList.forEach(element => {
          if(element.P_Key=='menuItemId')menuItemId=element.P_Value;
        });
        const result=await commentForKotSuggestions.getUsingMenuItemId(menuItemId);
      res.status(result['statusCode']).json(result['body']);
    }
    else if(requestJson.RequestType=="Sale Point History"){
      const parameterList=requestJson.ParameterList;
        var salePointType, salePointName, outletId;
        parameterList.forEach(element => {
          if(element.P_Key=='SalePointType')salePointType=element.P_Value;
          else if(element.P_Key=='SalePointName')salePointName=element.P_Value;
          else if(element.P_Key=='OutletId')outletId=element.P_Value;
        });
        const result=await salePointHistory.get(salePointType,salePointName,outletId);
      res.status(result['statusCode']).json(result['body']);
    }

    // res.json(await runningOrder.create(req.body));
  } catch (err) {
    console.log(err);
    res.status(401).json({message:'Unauthorised Access'});
  }
});

module.exports = router;
