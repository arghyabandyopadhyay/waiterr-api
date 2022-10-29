const db = require("./db");
const helper = require("../helper");


async function get(guid,restaurantId) {
  const result = await db.query(
    `SELECT MenuItem.id,ItemImage,Item,ItemDescription,CommentForKOT,MenuGroup.id as StockGroupId,RateBeforeDiscount,Discount,Rate,TaxClassId,IsDiscountable,IsVeg,TaxRate,Tags,Price,MenuItem.ClientId,Favourite,ImageUrl,StockGroup FROM MenuItem LEFT JOIN MenuGroup On MenuItem.StockGroupId=MenuGroup.id WHERE MenuItem.restaurantId=? And MenuItem.clientId=?`,[restaurantId,guid]
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}

async function getForMenuManagement(guid) {
  const result = await db.query(
    `SELECT MenuItem.id, ItemImage, Item, ItemDescription, MenuGroup.id as StockGroupId, RateBeforeDiscount, Discount, Rate, TaxClassId, IsDiscountable, IsVeg, TaxRate, Tags, Price, MenuItem.ClientId, Favourite, ImageUrl, StockGroup, restaurantId AS OutletId, OutletName FROM MenuItem LEFT JOIN MenuGroup On MenuItem.StockGroupId=MenuGroup.id LEFT JOIN Outlets ON MenuItem.restaurantId=Outlets.id WHERE MenuItem.clientId=? ORDER BY restaurantId`,[guid]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0)return data;
  else return ;
}

async function getForClient(guid,clientId,restaurantId) {
  const result = await db.query(
    `SELECT MenuItem.id,ItemImage,Item,ItemDescription,MenuGroup.id as StockGroupId,RateBeforeDiscount,Discount,Rate,TaxClassId,IsDiscountable,IsVeg,TaxRate,Tags,Price,MenuItem.ClientId,Favourite,ImageUrl,StockGroup FROM MenuItem LEFT JOIN MenuGroup On MenuItem.StockGroupId=MenuGroup.id WHERE MenuItem.restaurantId=? And MenuItem.clientId=?`,[restaurantId,guid]
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}

async function create(menuItem) {
  const result = await db.query(
    `INSERT INTO MenuItem 
    (ItemImage, Item, ItemDescription, StockGroupId, RateBeforeDiscount, Discount, Rate, TaxClassId, IsDiscountable, IsVeg, TaxRate, Tags, Price, ClientId, restaurantId)
    VALUES 
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,[menuItem.ItemImage, menuItem.Item, menuItem.ItemDescription, menuItem.StockGroupId, menuItem.RateBeforeDiscount, menuItem.Discount, menuItem.Rate, menuItem.TaxClassId, menuItem.IsDiscountable, menuItem.IsVeg, menuItem.TaxRate, menuItem.Tags, menuItem.Price, menuItem.ClientId, menuItem.OutletId]
  );

  let message = "Error in creating Menu Item";

  if (result.affectedRows) {
    message = "Menu Item created successfully";
  }

  return { message };
}

async function update(id, runningOrder) {
  const result = await db.query(
    `UPDATE RunningOrder 
    SET 
    Name= '${runningOrder.Name}' ,
    MobileNo= '${runningOrder.MobileNo}' ,
    SalePointType= '${runningOrder.SalePointType}' ,
    SalePointName= '${runningOrder.SalePointName}',
    WaiterName= '${runningOrder.WaiterName}',
    Amount= '${runningOrder.Amount}',
    PAX= ${runningOrder.PAX},
    ActiveSince= '${runningOrder.ActiveSince}',
    BillPrinted= ${runningOrder.BillPrinted},
    OutletName= '${runningOrder.OutletName}'
    WHERE id = '${id}'`
  );

  let message = "Error in updating user Details";

  if (result.affectedRows) {
    message = "User Details updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM RunningOrder WHERE id='${id}'`
  );

  let message = "Error in deleting running order";

  if (result.affectedRows) {
    message = "Running order deleted successfully";
  }

  return { message };
}

module.exports = {
  get,
  getForClient,
  getForMenuManagement,
  create,
  update,
  remove,
};
