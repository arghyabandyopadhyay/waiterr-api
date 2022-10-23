const db = require("./db");
const helper = require("../helper");

async function get(salePointType, salePointName, outletId) {
  const result = await db.query(
    `SELECT KotNumber, SalePointType, SalePointName, Item, Quantity, Rate, isDiscountable AS Discountable, Discount AS DiscountPercent, TaxRate, OrderPlaced, OrderApproved, OrderPrepared, OrderProcessed From Orders LEFT JOIN RunningOrder ON Orders.RunningOrderId=RunningOrder.id LEFT JOIN MenuItem ON Orders.ItemId=MenuItem.id WHERE SalePointType=? AND SalePointName=? AND OutletId=? ORDER BY KotNumber`,[salePointType, salePointName, outletId]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0)return {statusCode:200,body:data};
  else return {statusCode:200, body:[]};
}

module.exports = {
  get
};
