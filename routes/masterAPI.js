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
const userClientAllocation=require("../services/userClientAllocation");
const orders=require("../services/orders");
const userDetails = require("../services/userDetails");
const taxClasses=require("../services/taxClasses");
const config=require('../config/config');
const outlets=require('../services/outlets');
const { json } = require("body-parser");
const { request } = require("express");

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
        if(parameterList.length==2){
          var waiterId, includePastOrder;
          parameterList.forEach(element => {
            if(element.P_Key=='WaiterId')waiterId=element.P_Value;
            else if(element.P_Key=='IncludePastOrder')includePastOrder=element.P_Value;
          });
          res.json(await runningOrder.getForWaiterId(waiterId,includePastOrder));
        }
        else if(parameterList.length==1){
          var runningOrderId;
          parameterList.forEach(element=>{
            if(element.P_Key=='RunningOrderId')runningOrderId=element.P_Value;
          })
          res.json(await runningOrder.terminate(runningOrderId));
        }
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
      const parameterList=requestJson.ParameterList;
      if(parameterList==null){
        res.json(await waiterrMenu.getForMenuManagement(req.body.GUID));
      }
      else if(parameterList.length==1){
        var restaurantId;
        parameterList.forEach(element => {
          if(element.P_Key=='restaurantId')restaurantId=element.P_Value;
        });
        res.json(await waiterrMenu.get(req.body.GUID,restaurantId));
      }
      else if(parameterList.length==2){
        var userId,restaurantId;
        parameterList.forEach(element => {
          if(element.P_Key=='userId')userId=element.P_Value;
          else if(element.P_Key=='restaurantId')restaurantId=element.P_Value;
        });
        res.json(await waiterrMenu.getForClient(req.body.GUID,userId,restaurantId));
      }
    }
    else if(requestJson.RequestType=="Waiterr Menu Edit"){
      const parameterList=requestJson.ParameterList;
      console.log(parameterList.length);
      if(parameterList.length==1){
        var menuItem;
        parameterList.forEach(element => {
          if(element.P_Key=='menuItem')menuItem=JSON.parse(element.P_Value);
        });
        const result=await waiterrMenu.create(req.body.GUID,menuItem);
        res.json(result['message']);
      }
      else if(parameterList.length==2){
        var menuItem,id;
        parameterList.forEach(element => {
          if(element.P_Key=='menuItem')menuItem=JSON.parse(element.P_Value);
          if(element.P_Key=='id')id=element.P_Value;
        });
        const result=await waiterrMenu.update(menuItem,id);
        res.json(result['message']);
      }
    }
    else if(requestJson.RequestType=="Waiterr Menu Group"){
      const parameterList=requestJson.ParameterList;
      if(parameterList==null){
        res.json(await waiterrMenuGroup.get(req.body.GUID));
      }
      else if(parameterList.length==1){
        var outletId;
        parameterList.forEach(element => {
          if(element.P_Key=='OutletId')outletId=element.P_Value;
        });
        const result=await waiterrMenuGroup.getForOutlet(req.body.GUID,outletId);
        res.json(result);
      }
      else if(parameterList.length==5){
        var outletId,stockGroup,imageUrl,id,modificationType;
        parameterList.forEach(element => {
          if(element.P_Key=='OutletId')outletId=element.P_Value;
          else if(element.P_Key=='StockGroup')stockGroup=element.P_Value;
          else if(element.P_Key=='ImageUrl')imageUrl=element.P_Value;
          else if(element.P_Key=='id')id=element.P_Value;
          else if(element.P_Key=='ModificationType')modificationType=element.P_Value
        });
        if(modificationType=='Create'){
          const result=await waiterrMenuGroup.create(req.body.GUID,outletId,stockGroup,imageUrl);
        res.json(result['message']);
        }
        else if(modificationType=='Edit'){
          const result=await waiterrMenuGroup.update(id,outletId,stockGroup,imageUrl);
        res.json(result['message']);
        }
        else if(modificationType=='Delete'){
          const result=await waiterrMenuGroup.remove(id);
          res.json(result['message']);
        }
      }
    }
    else if(requestJson.RequestType=="Tax Class"){
      const parameterList=requestJson.ParameterList;
      if(parameterList==null){
        res.json(await taxClasses.get(req.body.GUID));
      }
      else if(parameterList.length==2){
        var taxClass,taxRate;
        parameterList.forEach(element => {
          if(element.P_Key=='TaxClass')taxClass=element.P_Value;
          else if(element.P_Key=='TaxRate')taxRate=element.P_Value;
        });
        const result=await taxClasses.create(req.body.GUID,taxClass,taxRate);
        res.json(result['message']);
      }
      else if(parameterList.length==3){
        var taxClass,taxRate,id;
        parameterList.forEach(element => {
          if(element.P_Key=='TaxClass')taxClass=element.P_Value;
          else if(element.P_Key=='TaxRate')taxRate=element.P_Value;
          else if(element.P_Key=='TaxId')id=element.P_Value;
        });
        const result=await taxClasses.update(id,taxClass,taxRate);
        res.json(result['message']);
      }
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
      if(parameterList!=null){
        if(parameterList.length==3){
          var salePointType, salePointName, outletId;
          parameterList.forEach(element => {
            if(element.P_Key=='SalePointType')salePointType=element.P_Value;
            else if(element.P_Key=='SalePointName')salePointName=element.P_Value;
            else if(element.P_Key=='OutletId')outletId=element.P_Value;
          });
          const result=await salePointHistory.get(salePointType,salePointName,outletId);
          res.status(result['statusCode']).json(result['body']);
        }
        else if(parameterList.length==1){
          var approvalType;
          parameterList.forEach(element => {
            if(element.P_Key=='ApprovalType')approvalType=element.P_Value;
          });

          const result=await salePointHistory.getForApproval(approvalType,req.body.GUID);
          res.status(result['statusCode']).json(result['body']);
        }
      }
      else{
        
      }
    }
    else if(requestJson.RequestType=="Order Approval"){
      const parameterList=requestJson.ParameterList;
        var forApproval, forAggregate, runningOrderId, kotNumber,approvalType,allProcessed;
        parameterList.forEach(element => {
          if(element.P_Key=='ForApproval')forApproval=element.P_Value;
          else if(element.P_Key=="ForAggregate")forAggregate=element.P_Value;
          else if(element.P_Key=='RunningOrderId')runningOrderId=element.P_Value;
          else if(element.P_Key=='KotNumber')kotNumber=element.P_Value;
          else if(element.P_Key=='ApprovalType')approvalType=element.P_Value;
          else if(element.P_Key=='AllProcessed')allProcessed=element.P_Value;
        });
        const result=await salePointHistory.approveOrders(forApproval,forAggregate,runningOrderId,req.body.GUID,kotNumber,approvalType,allProcessed);
        res.status(result['statusCode']).json(result['message']);
    }
    else if(requestJson.RequestType=="Waiters"){
      const parameterList=requestJson.ParameterList;
      //get all waiters
      if(parameterList==null){
        const result=await userClientAllocation.getAllWaiters(req.body.GUID);
        res.status(result['statusCode']).json(result['body']);  
      } 
      //get waiter detail
      else if(parameterList.length==1){
        var mobileNo;
        parameterList.forEach(element => {
          if(element.P_Key=='MobileNo')mobileNo=element.P_Value;
        });
        const result=await userDetails.getUsingMobileNoForWaiterRegistration(mobileNo);
        res.status(result['statusCode']).json(result['body']);  
      } 
      //create a new waiter  
      else if(parameterList.length==4){
        var id,ucaRoleId,outletId,modificationType;
        parameterList.forEach(element => {
          if(element.P_Key=='id')id=element.P_Value;
          else if(element.P_Key=='UCARoleId')ucaRoleId=element.P_Value;
          else if(element.P_Key=="OutletId")outletId=element.P_Value;
          else if(element.P_Key=="ModificationType")modificationType=element.P_Value;
        });
        if(modificationType=="Create"){
          //here the user id is the id
          const result=await userClientAllocation.create(id,outletId,ucaRoleId);
          res.status(result['statusCode']).json(result['body']);  
        }
        if(modificationType=="Edit"){
          //here the userClientAllocationid is the id
          const result=await userClientAllocation.update(id,outletId,ucaRoleId);
          res.status(result['statusCode']).json(result['body']);  
        }
        else if(modificationType=="Delete"){
          //here the userClientAllocation id is the id
          const result=await userClientAllocation.remove(id);
          res.status(result['statusCode']).json(result['body']);  
        }
      }
    }
    else if(requestJson.RequestType=="Outlet Configurations"){
      const parameterList=requestJson.ParameterList;
      //get all outlets
      if(parameterList==null){
        const result=await outlets.get(req.body.GUID);
        res.status(result['statusCode']).json(result['body']);  
      } 
      else if(parameterList.length==1){
        var id;
        parameterList.forEach(element => {
          if(element.P_Key=='id')id=element.P_Value;
        });
        const result=await outlets.remove(id);
        res.status(result['statusCode']).json(result['body']);  
      }
      else{
        var outletName,outletSalePoint,id,modificationType;
        parameterList.forEach(element => {
          if(element.P_Key=='OutletName')outletName=element.P_Value;
          else if(element.P_Key=='OutletSalePoint')outletSalePoint=element.P_Value;
          else if(element.P_Key=='id')id=element.P_Value;
          else if(element.P_Key=='ModificationType')modificationType=element.P_Value;
        });
        if(modificationType=='Create'){
          const result=await outlets.create(req.body.GUID,outletName,outletSalePoint,id);
          res.status(result['statusCode']).json(result['body']); 
        }
        else if(modificationType=='Update'){
          const result=await outlets.update(id,outletName,outletSalePoint);
          res.status(result['statusCode']).json(result['body']); 
        }
        else if(modificationType=="Delete"){
          const result=await outlets.remove(id);
          res.status(result['statusCode']).json(result['body']);  
        } 
      }
    }
    // res.json(await runningOrder.create(req.body));
  } catch (err) {
    res.status(401).json({message:'Unauthorised Access'});
  }
});

module.exports = router;
