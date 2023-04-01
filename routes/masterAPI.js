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
const taxClasses=require("../services/taxClasses");
const config=require('../config/config');
const outlets=require('../services/outlets');
const { json } = require("body-parser");
const { request } = require("express");

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
    console.log(requestJson);
    if(requestJson.RequestType=="Running Orders"){
      await runningOrder.runningOrdersCalculation(res,requestJson);
    }
    else if(requestJson.RequestType=="Active Sale Point"){
      await runningOrder.activeSalePointCalculation(res,requestJson);
    }
    else if(requestJson.RequestType=="Waiterr Menu"){
      await waiterrMenu.waiterMenuCalculation(res, requestJson);
    }
    else if(requestJson.RequestType=="Waiterr Menu Edit"){
      await waiterrMenu.waiterMenuEditCalculation(res, requestJson);
    }
    else if(requestJson.RequestType=="Waiterr Menu Group"){
      await waiterrMenuGroup.waiterMenuGroupCalculation(res, requestJson);
    }
    else if(requestJson.RequestType=="Tax Class"){
      await taxClasses.TaxClassesCalculation(res, requestJson);
    }
    else if(requestJson.RequestType=="Place Order"){
      await orders.Calculation(res, requestJson);
    }
    else if(requestJson.RequestType=="Max TakeAway"){
      await maxTakeAway.Calculation(res, requestJson);
    }
    else if(requestJson.RequestType=="Comment For KOT"){
      await commentForKotSuggestions.Calculation(res, requestJson);
    }
    else if(requestJson.RequestType=="Sale Point History"){
      await salePointHistory.Calculation(res, requestJson);
    }
    else if(requestJson.RequestType=="Order Approval"){
      await salePointHistory.CalculationOrderApproval(res, requestJson);
    }
    else if(requestJson.RequestType=="Waiters"){
      await userClientAllocation.Calculation(res, requestJson);
    }
    else if(requestJson.RequestType=="Outlet Configurations"){
      await outlets.Calculation(res, requestJson);
    }
    // res.json(await runningOrder.create(req.body));
  } catch (err) {
    res.status(401).json({message:'Unauthorised Access'});
  }
});


module.exports = router;
