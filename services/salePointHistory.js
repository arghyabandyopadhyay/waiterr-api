const db = require("./db");
const helper = require("../helper");

async function get(salePointType, salePointName, outletId) {
  const result = await db.query(
    `SELECT KotNumber, SalePointType, SalePointName, Item, Quantity, Rate, isDiscountable AS Discountable, Discount AS DiscountPercent, TaxRate, OrderPlaced, OrderApproved, OrderPrepared, OrderProcessed From Orders INNER JOIN RunningOrder ON Orders.RunningOrderId=RunningOrder.id INNER JOIN MenuItem ON Orders.ItemId=MenuItem.id INNER JOIN TaxClasses ON TaxClasses.id=MenuItem.TaxClassId WHERE SalePointType=? AND SalePointName=? AND OutletId=? ORDER BY KotNumber`,[salePointType, salePointName, outletId]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0)return {statusCode:200,body:data};
  else return {statusCode:200, body:[]};
}

async function getForApproval(approvalType,guid) {
  var condition="";
  if(approvalType=="OrderApproved")condition="OrderApproved=0";
  else if(approvalType=="OrderPrepared")condition="OrderApproved=1 AND OrderPrepared=0";
  else if(approvalType=="OrderProcessed")condition="OrderApproved=1 AND OrderPrepared=1 AND OrderProcessed=0";
  const result = await db.query(
    `SELECT Orders.id AS OrderId, KotNumber, RunningOrderId, OutletName, SalePointType, SalePointName, Item, Quantity, Rate, isDiscountable AS Discountable, Discount AS DiscountPercent, TaxRate, OrderPlaced, OrderApproved, OrderPrepared, OrderProcessed From Orders INNER JOIN RunningOrder ON Orders.RunningOrderId=RunningOrder.id INNER JOIN Outlets ON RunningOrder.OutletId=Outlets.id INNER JOIN MenuItem ON Orders.ItemId=MenuItem.id INNER JOIN TaxClasses ON TaxClasses.id=MenuItem.TaxClassId WHERE Orders.ClientId=? AND ${condition} ORDER BY ActiveSince,KOTNumber`,[guid]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0)return {statusCode:200,body:data};
  else return {statusCode:200, body:[]};
}
async function approveOrders(forApproval,forAggregate,runningOrderId,guid,kotNumber,approvalType,allProcessed){
  if(forApproval){
    const result = await db.query(
      `UPDATE Orders 
      SET 
      ${approvalType}=?
      WHERE ${forAggregate?"ClientId=?":"runningOrderId=? AND KotNumber=?"}`,forAggregate?[1,guid]:[1,runningOrderId,kotNumber]
    );
    let message = "Error in approving orders";
    let statusCode=500;
    if (result.affectedRows) {
      message = "Success";
      statusCode=200;
      if(forAggregate){
        if(approvalType=="OrderProcessed"){
          //Generate bill now and send it as email to the individual user
          const result1=await db.query(
            `UPDATE RunningOrder
            SET 
            BillPrinted=1
            WHERE ClientId=?`,[guid]
          )
        }
      }
      else{
        if(approvalType=="OrderProcessed"&&allProcessed){
          //Generate bill now and send it as email to the user
          const result1=await db.query(
            `UPDATE RunningOrder
            SET 
            BillPrinted=1
            WHERE id=?`,[runningOrderId]
          )
        }
      }
    }
    return { statusCode:statusCode, message:message };
  }
  else{

  }
  
}

async function Calculation(res,req, requestJson){
  const parameterList=requestJson.ParameterList;
      if(parameterList!=null){
        if(parameterList.length==3){
          var salePointType, salePointName, outletId;
          parameterList.forEach(element => {
            if(element.P_Key=='SalePointType')salePointType=element.P_Value;
            else if(element.P_Key=='SalePointName')salePointName=element.P_Value;
            else if(element.P_Key=='OutletId')outletId=element.P_Value;
          });
          const result=await get(salePointType,salePointName,outletId);
          res.status(result['statusCode']).json(result['body']);
        }
        else if(parameterList.length==1){
          var approvalType;
          parameterList.forEach(element => {
            if(element.P_Key=='ApprovalType')approvalType=element.P_Value;
          });

          const result=await getForApproval(approvalType,req.body.GUID);
          res.status(result['statusCode']).json(result['body']);
        }
      }
      else{
        
      }
}

async function CalculationOrderApproval(res,req, requestJson){
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
        const result=await approveOrders(forApproval,forAggregate,runningOrderId,req.body.GUID,kotNumber,approvalType,allProcessed);
        res.status(result['statusCode']).json(result['message']);
}
module.exports = {
  get,
  getForApproval,
  approveOrders,
  Calculation,
  CalculationOrderApproval
};
