const db = require("./db");
const helper = require("../helper");


async function get(guid,restaurantId) {
  const result = await db.query(
    `SELECT MenuItem.id,ItemImage,Item,ItemDescription,CommentForKOT,MenuGroup.id as StockGroupId,RateBeforeDiscount,Discount,Rate,TaxClassId,IsDiscountable,IsVeg,TaxRate,Tags,MenuItem.ClientId,Favourite,ImageUrl,StockGroup FROM MenuItem INNER JOIN MenuGroup On MenuItem.StockGroupId=MenuGroup.id INNER JOIN TaxClasses ON MenuItem.TaxClassId=TaxClasses.id WHERE MenuItem.restaurantId=? And MenuItem.clientId=?`,[restaurantId,guid]
  );
  const data = helper.emptyOrRows(result);

  if(data.length>0)return data;
  else return ;
}

async function getForMenuManagement(guid) {
  const result = await db.query(
    `SELECT MenuItem.id, ItemImage, Item, ItemDescription, MenuGroup.id as StockGroupId, RateBeforeDiscount, Discount, Rate, TaxClassId, IsDiscountable, IsVeg, TaxRate, Tags, MenuItem.ClientId, Favourite, ImageUrl, StockGroup, restaurantId AS OutletId, OutletName FROM MenuItem INNER JOIN MenuGroup On MenuItem.StockGroupId=MenuGroup.id  INNER JOIN TaxClasses ON MenuItem.TaxClassId=TaxClasses.id INNER JOIN Outlets ON MenuItem.restaurantId=Outlets.id WHERE MenuItem.clientId=? ORDER BY restaurantId`,[guid]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0)return data;
  else return ;
}

async function getForClient(guid,userId,restaurantId) {
  const result = await db.query(
    `SELECT 
    MenuItem.id,
    ItemImage,
    Item,
    ItemDescription,
    MenuGroup.id as StockGroupId,
    RateBeforeDiscount,
    Discount,
    Rate,
    TaxClassId,
    IsDiscountable,
    IsVeg,
    TaxRate,
    Tags,
    MenuItem.ClientId,
    IF((MenuItem.id in (SELECT menuId FROM Favourites WHERE userId = ?)), 1, 0) AS Favourite,
    ImageUrl,
    StockGroup 
    FROM MenuItem 
    INNER JOIN MenuGroup On MenuItem.StockGroupId=MenuGroup.id  
    INNER JOIN TaxClasses ON MenuItem.TaxClassId=TaxClasses.id 
    WHERE MenuItem.restaurantId=? And MenuItem.clientId=?`,[userId, restaurantId, guid]
  );
  const data = helper.emptyOrRows(result);
  if(data.length>0)return data;
  else return ;
}

async function create(guid,menuItem) {
  const result = await db.query(
    `INSERT INTO MenuItem 
    (ItemImage, 
      Item, 
      ItemDescription, 
      StockGroupId, 
      RateBeforeDiscount, 
      Discount, 
      Rate, 
      TaxClassId, 
      IsDiscountable, 
      IsVeg, 
      Tags, 
      ClientId, 
      restaurantId)
    VALUES 
    (?,?,?,?,?,?,?,?,?,?,?,?,?);`,
    [menuItem.ItemImage, 
      menuItem.Item, 
      menuItem.ItemDescription, 
      menuItem.StockGroupId, 
      menuItem.RateBeforeDiscount, 
      menuItem.Discount, 
      menuItem.Rate, 
      menuItem.TaxClassId, 
      menuItem.IsDiscountable?1:0, 
      menuItem.IsVeg?1:0, 
      menuItem.Tags, 
      guid, 
      menuItem.OutletId]
  );

  let message = "Error in creating Menu Item";

  if (result.affectedRows) {
    message = "Success";
  }

  return { message };
}

async function update(menuItem,id) {
  console.log(id);
  const result = await db.query(
    `UPDATE MenuItem 
      SET 
      ItemImage=?, 
      Item=?, 
      ItemDescription=?, 
      StockGroupId=?, 
      RateBeforeDiscount=?, 
      Discount=?, 
      Rate=?, 
      TaxClassId=?, 
      IsDiscountable=?, 
      IsVeg=?, 
      Tags=?
    WHERE id = ?`,[
      menuItem.ItemImage, 
      menuItem.Item, 
      menuItem.ItemDescription, 
      menuItem.StockGroupId, 
      menuItem.RateBeforeDiscount, 
      menuItem.Discount, 
      menuItem.Rate, 
      menuItem.TaxClassId, 
      menuItem.IsDiscountable?1:0, 
      menuItem.IsVeg?1:0, 
      menuItem.Tags, 
      id
    ]
  );

  console.log(result);
  let message = "Error in updating Menu Item";

  if (result.affectedRows) {
    message = "Success";
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

async function waiterMenuCalculation(res, requestJson){
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

async function waiterMenuEditCalculation(res, requestJson){
  const parameterList=requestJson.ParameterList;
      console.log(parameterList.length);
      if(parameterList.length==1){
        var menuItem;
        parameterList.forEach(element => {
          if(element.P_Key=='menuItem')menuItem=JSON.parse(element.P_Value);
        });
        const result=await create(req.body.GUID,menuItem);
        res.json(result['message']);
      }
      else if(parameterList.length==2){
        var menuItem,id;
        parameterList.forEach(element => {
          if(element.P_Key=='menuItem')menuItem=JSON.parse(element.P_Value);
          if(element.P_Key=='id')id=element.P_Value;
        });
        const result=await update(menuItem,id);
        res.json(result['message']);
      }
}

module.exports = {
  get,
  getForClient,
  getForMenuManagement,
  create,
  update,
  remove,
  waiterMenuCalculation,
  waiterMenuEditCalculation
};
