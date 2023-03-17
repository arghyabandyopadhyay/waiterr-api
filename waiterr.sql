-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (arm64)
--
-- Host: localhost    Database: waiterr
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Clients`
--

DROP TABLE IF EXISTS `Clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clients` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT (uuid()),
  `ClientName` varchar(255) DEFAULT NULL,
  `LogoUrl` varchar(255) DEFAULT NULL,
  `DataExchangeVia` varchar(255) DEFAULT NULL,
  `DataExchangeUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clients`
--

LOCK TABLES `Clients` WRITE;
/*!40000 ALTER TABLE `Clients` DISABLE KEYS */;
INSERT INTO `Clients` VALUES ('226f5f9a-3839-11ed-9bd3-83007858518f','RK multiplex','https://github.com/arghyabandyopadhyay/waiterr/raw/main/assets/img/all.png','waiterr','http://10.0.2.2:3000/api/master/'),('434a8a80-3845-11ed-9bd3-83007858518f','Arjun multiplex',NULL,'waiterr','http://10.0.2.2:3000/api/master/');
/*!40000 ALTER TABLE `Clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CommentForKotSuggestions`
--

DROP TABLE IF EXISTS `CommentForKotSuggestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CommentForKotSuggestions` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `CommentForKOT` varchar(255) NOT NULL,
  `MenuItemId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `MenuItemId` (`MenuItemId`),
  CONSTRAINT `commentforkotsuggestions_ibfk_1` FOREIGN KEY (`MenuItemId`) REFERENCES `MenuItem` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CommentForKotSuggestions`
--

LOCK TABLES `CommentForKotSuggestions` WRITE;
/*!40000 ALTER TABLE `CommentForKotSuggestions` DISABLE KEYS */;
INSERT INTO `CommentForKotSuggestions` VALUES ('01a60a12-5f6b-11ed-b9d1-735d7b5123bc','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('1277dac6-51f8-11ed-bf90-f11dbd5d99e9','extra cheese','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('417f1698-536c-11ed-b65c-33daaccdfe94','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('489a7f2e-539b-11ed-b65c-33daaccdfe94','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('52a464ee-5f71-11ed-b9d1-735d7b5123bc','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('5a055fd6-539b-11ed-b65c-33daaccdfe94','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('5a058cae-539b-11ed-b65c-33daaccdfe94','','48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6'),('5a05b152-539b-11ed-b65c-33daaccdfe94','','a9392cd2-52a0-11ed-bf90-f11dbd5d99e9'),('65c4c35c-539b-11ed-b65c-33daaccdfe94','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('65c4f9bc-539b-11ed-b65c-33daaccdfe94','','48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6'),('65c52824-539b-11ed-b65c-33daaccdfe94','','a9392cd2-52a0-11ed-bf90-f11dbd5d99e9'),('6b2862d2-539a-11ed-b65c-33daaccdfe94','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('6b288474-539a-11ed-b65c-33daaccdfe94','','48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6'),('6b28a4cc-539a-11ed-b65c-33daaccdfe94','','a9392cd2-52a0-11ed-bf90-f11dbd5d99e9'),('b1204d40-52a0-11ed-bf90-f11dbd5d99e9','NULL','a9392cd2-52a0-11ed-bf90-f11dbd5d99e9'),('b4c53f8a-522f-11ed-bf90-f11dbd5d99e9','extra goo','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('b5c9de00-538c-11ed-b65c-33daaccdfe94','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('c2c2fa82-538d-11ed-b65c-33daaccdfe94','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('c2c327d2-538d-11ed-b65c-33daaccdfe94','','48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6'),('d557c9a0-5862-11ed-b9d1-735d7b5123bc','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('d557fb50-5862-11ed-b9d1-735d7b5123bc','','22f2e2f8-5827-11ed-8df0-15b85eaf5189'),('d5581590-5862-11ed-b9d1-735d7b5123bc','','48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6'),('e18ec39a-5862-11ed-b9d1-735d7b5123bc','','a9392cd2-52a0-11ed-bf90-f11dbd5d99e9'),('e18ee00a-5862-11ed-b9d1-735d7b5123bc','','e88e287a-5826-11ed-8df0-15b85eaf5189'),('e55a6a4a-51f7-11ed-bf90-f11dbd5d99e9','extra butter','48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6'),('f5864c36-539b-11ed-bc24-5055bba81b8b','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('f5869ea2-539b-11ed-bc24-5055bba81b8b','','48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6'),('f79f778c-553e-11ed-96e9-63f9bbb96f02','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('fc0c4998-539b-11ed-bc24-5055bba81b8b','','094b5ebe-3beb-11ed-a8e3-4ffb021564b6'),('fc0c8746-539b-11ed-bc24-5055bba81b8b','','48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6'),('fc0cb84c-539b-11ed-bc24-5055bba81b8b','','a9392cd2-52a0-11ed-bf90-f11dbd5d99e9');
/*!40000 ALTER TABLE `CommentForKotSuggestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CustomerDetails`
--

DROP TABLE IF EXISTS `CustomerDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CustomerDetails` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `Name` varchar(255) DEFAULT NULL,
  `MobileNumber` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`MobileNumber`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CustomerDetails`
--

LOCK TABLES `CustomerDetails` WRITE;
/*!40000 ALTER TABLE `CustomerDetails` DISABLE KEYS */;
INSERT INTO `CustomerDetails` VALUES ('95b08dd6-3bd5-11ed-a8e3-4ffb021564b6','Jui','9600153562'),('d35fefe4-3bd2-11ed-a8e3-4ffb021564b6','arghya','7224077631');
/*!40000 ALTER TABLE `CustomerDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Favourites`
--

DROP TABLE IF EXISTS `Favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Favourites` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `userId` varchar(255) DEFAULT NULL,
  `menuId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `menuId` (`menuId`),
  CONSTRAINT `favourites_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `UserDetails` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `favourites_ibfk_4` FOREIGN KEY (`menuId`) REFERENCES `MenuItem` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Favourites`
--

LOCK TABLES `Favourites` WRITE;
/*!40000 ALTER TABLE `Favourites` DISABLE KEYS */;
INSERT INTO `Favourites` VALUES ('f57098e4-67ed-11ed-ac33-44d56164d3f4','4f11e250-3719-11ed-b299-9317ba61b56a','094b5ebe-3beb-11ed-a8e3-4ffb021564b6');
/*!40000 ALTER TABLE `Favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FilterItems`
--

DROP TABLE IF EXISTS `FilterItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FilterItems` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `Image` varchar(255) NOT NULL,
  `StockGroupId` int NOT NULL,
  `StockGroup` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FilterItems`
--

LOCK TABLES `FilterItems` WRITE;
/*!40000 ALTER TABLE `FilterItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `FilterItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaxTakeAway`
--

DROP TABLE IF EXISTS `MaxTakeAway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaxTakeAway` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `OutletId` varchar(255) DEFAULT NULL,
  `LastTakeAway` int NOT NULL DEFAULT '1',
  `CurrentDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OutletId` (`OutletId`),
  CONSTRAINT `maxtakeaway_ibfk_1` FOREIGN KEY (`OutletId`) REFERENCES `Outlets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaxTakeAway`
--

LOCK TABLES `MaxTakeAway` WRITE;
/*!40000 ALTER TABLE `MaxTakeAway` DISABLE KEYS */;
INSERT INTO `MaxTakeAway` VALUES ('8fac883e-539c-11ed-bc24-5055bba81b8b','c55b4ee4-5396-11ed-b65c-33daaccdfe94',0,'2022-11-15'),('9d401586-5830-11ed-8df0-15b85eaf5189','9dc50eb0-5396-11ed-b65c-33daaccdfe94',0,'2023-01-03'),('a135e2c6-5225-11ed-bf90-f11dbd5d99e9','90be3264-5396-11ed-b65c-33daaccdfe94',0,'2023-01-13');
/*!40000 ALTER TABLE `MaxTakeAway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MenuGroup`
--

DROP TABLE IF EXISTS `MenuGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MenuGroup` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT (uuid()),
  `ImageUrl` varchar(255) DEFAULT NULL,
  `StockGroup` varchar(255) DEFAULT NULL,
  `ClientId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `OutletId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ClientId` (`ClientId`),
  KEY `OutletId` (`OutletId`),
  CONSTRAINT `menugroup_ibfk_3` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `menugroup_ibfk_4` FOREIGN KEY (`OutletId`) REFERENCES `Outlets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MenuGroup`
--

LOCK TABLES `MenuGroup` WRITE;
/*!40000 ALTER TABLE `MenuGroup` DISABLE KEYS */;
INSERT INTO `MenuGroup` VALUES ('145b2aec-38c5-11ed-9fea-db252a616aed','https://github.com/arghyabandyopadhyay/waiterr/raw/main/assets/img/all.png','Breads','226f5f9a-3839-11ed-9bd3-83007858518f','90be3264-5396-11ed-b65c-33daaccdfe94'),('716e9e40-57b9-11ed-95ca-174928ef3745',NULL,'Chineese','226f5f9a-3839-11ed-9bd3-83007858518f','9dc50eb0-5396-11ed-b65c-33daaccdfe94'),('7650e06c-57b9-11ed-95ca-174928ef3745',NULL,'Italian','226f5f9a-3839-11ed-9bd3-83007858518f','90be3264-5396-11ed-b65c-33daaccdfe94'),('c26cd5b4-5863-11ed-b9d1-735d7b5123bc',NULL,'Non veg main course','226f5f9a-3839-11ed-9bd3-83007858518f','90be3264-5396-11ed-b65c-33daaccdfe94');
/*!40000 ALTER TABLE `MenuGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MenuItem`
--

DROP TABLE IF EXISTS `MenuItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MenuItem` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `ItemImage` varchar(255) DEFAULT NULL,
  `Item` varchar(255) NOT NULL,
  `ItemDescription` varchar(255) DEFAULT NULL,
  `CommentForKOT` varchar(255) DEFAULT NULL,
  `StockGroupId` varchar(255) NOT NULL,
  `RateBeforeDiscount` double NOT NULL,
  `Discount` double NOT NULL,
  `Rate` double NOT NULL,
  `TaxClassId` varchar(255) NOT NULL,
  `IsDiscountable` tinyint(1) NOT NULL,
  `IsVeg` tinyint(1) NOT NULL,
  `Tags` varchar(255) DEFAULT NULL,
  `ClientId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Favourite` tinyint(1) NOT NULL DEFAULT '0',
  `restaurantId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ClientId` (`ClientId`),
  KEY `StockGroupId` (`StockGroupId`),
  KEY `restaurantId` (`restaurantId`),
  KEY `TaxClassId` (`TaxClassId`),
  CONSTRAINT `menuitem_ibfk_5` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `menuitem_ibfk_6` FOREIGN KEY (`StockGroupId`) REFERENCES `MenuGroup` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `menuitem_ibfk_7` FOREIGN KEY (`restaurantId`) REFERENCES `Outlets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `menuitem_ibfk_8` FOREIGN KEY (`TaxClassId`) REFERENCES `TaxClasses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MenuItem`
--

LOCK TABLES `MenuItem` WRITE;
/*!40000 ALTER TABLE `MenuItem` DISABLE KEYS */;
INSERT INTO `MenuItem` VALUES ('094b5ebe-3beb-11ed-a8e3-4ffb021564b6','https://github.com/arghyabandyopadhyay/waiterr/raw/main/assets/img/all.png','Tandoori roti','Soft circular indian breads made of all purpose flour',NULL,'145b2aec-38c5-11ed-9fea-db252a616aed',20,5,19,'486caa36-5800-11ed-8df0-15b85eaf5189',1,1,'new|bread','226f5f9a-3839-11ed-9bd3-83007858518f',0,'90be3264-5396-11ed-b65c-33daaccdfe94'),('22f2e2f8-5827-11ed-8df0-15b85eaf5189',NULL,'sdfsdfdssdfs',NULL,NULL,'145b2aec-38c5-11ed-9fea-db252a616aed',2,11,1.78,'63a25fb8-57ff-11ed-8df0-15b85eaf5189',1,1,NULL,'226f5f9a-3839-11ed-9bd3-83007858518f',0,'90be3264-5396-11ed-b65c-33daaccdfe94'),('48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6',NULL,'Tawa roti11','Soft circular indian breads made of all purpose flour',NULL,'145b2aec-38c5-11ed-9fea-db252a616aed',30,5,28,'486caa36-5800-11ed-8df0-15b85eaf5189',1,1,'new|bread','226f5f9a-3839-11ed-9bd3-83007858518f',0,'90be3264-5396-11ed-b65c-33daaccdfe94'),('95f2cf30-5830-11ed-8df0-15b85eaf5189',NULL,'dsfsdfs',NULL,NULL,'716e9e40-57b9-11ed-95ca-174928ef3745',50,0,50,'63a25fb8-57ff-11ed-8df0-15b85eaf5189',0,1,'daasfsd','226f5f9a-3839-11ed-9bd3-83007858518f',0,'9dc50eb0-5396-11ed-b65c-33daaccdfe94'),('9972765a-5827-11ed-8df0-15b85eaf5189',NULL,'aaaa',NULL,NULL,'7650e06c-57b9-11ed-95ca-174928ef3745',12,0,12,'63a25fb8-57ff-11ed-8df0-15b85eaf5189',0,1,'ssss|ssss|ssss2','226f5f9a-3839-11ed-9bd3-83007858518f',0,'9dc50eb0-5396-11ed-b65c-33daaccdfe94'),('a9392cd2-52a0-11ed-bf90-f11dbd5d99e9',NULL,'dfgfdg11111','jjgjggj','NULL','7650e06c-57b9-11ed-95ca-174928ef3745',11,5,10.45,'486caa36-5800-11ed-8df0-15b85eaf5189',0,1,'new|bread','226f5f9a-3839-11ed-9bd3-83007858518f',0,'90be3264-5396-11ed-b65c-33daaccdfe94'),('e0d8157c-5863-11ed-b9d1-735d7b5123bc',NULL,'Chicken butter masala','',NULL,'c26cd5b4-5863-11ed-b9d1-735d7b5123bc',300,10,270,'63a25fb8-57ff-11ed-8df0-15b85eaf5189',1,0,'discount 3%|chef special','226f5f9a-3839-11ed-9bd3-83007858518f',0,'90be3264-5396-11ed-b65c-33daaccdfe94'),('e88e287a-5826-11ed-8df0-15b85eaf5189',NULL,'dfsdf',NULL,NULL,'145b2aec-38c5-11ed-9fea-db252a616aed',5,3,4.85,'486caa36-5800-11ed-8df0-15b85eaf5189',1,1,NULL,'226f5f9a-3839-11ed-9bd3-83007858518f',0,'90be3264-5396-11ed-b65c-33daaccdfe94');
/*!40000 ALTER TABLE `MenuItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `CommentForKOT` varchar(255) DEFAULT NULL,
  `Quantity` double DEFAULT NULL,
  `ItemId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RunningOrderId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ClientId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `OrderPlaced` tinyint NOT NULL DEFAULT '1',
  `OrderApproved` tinyint NOT NULL DEFAULT '0',
  `OrderProcessed` tinyint NOT NULL DEFAULT '0',
  `OrderPrepared` tinyint NOT NULL DEFAULT '0',
  `KotNumber` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ItemId` (`ItemId`),
  KEY `RunningOrderId` (`RunningOrderId`),
  KEY `ClientId` (`ClientId`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`ItemId`) REFERENCES `MenuItem` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`RunningOrderId`) REFERENCES `RunningOrder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES ('01a5c976-5f6b-11ed-b9d1-735d7b5123bc','',2,'094b5ebe-3beb-11ed-a8e3-4ffb021564b6','01a3dd00-5f6b-11ed-b9d1-735d7b5123bc','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'1'),('52a3d72c-5f71-11ed-b9d1-735d7b5123bc','',7,'094b5ebe-3beb-11ed-a8e3-4ffb021564b6','52a1b686-5f71-11ed-b9d1-735d7b5123bc','226f5f9a-3839-11ed-9bd3-83007858518f',1,0,0,0,'1'),('a690fe34-5830-11ed-8df0-15b85eaf5189',NULL,1,'95f2cf30-5830-11ed-8df0-15b85eaf5189','a68faa2a-5830-11ed-8df0-15b85eaf5189','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'1'),('d55794da-5862-11ed-b9d1-735d7b5123bc','',1,'094b5ebe-3beb-11ed-a8e3-4ffb021564b6','d555a58a-5862-11ed-b9d1-735d7b5123bc','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'1'),('d557f51a-5862-11ed-b9d1-735d7b5123bc','',1,'22f2e2f8-5827-11ed-8df0-15b85eaf5189','d555a58a-5862-11ed-b9d1-735d7b5123bc','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'1'),('d558083e-5862-11ed-b9d1-735d7b5123bc','',1,'48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6','d555a58a-5862-11ed-b9d1-735d7b5123bc','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'1'),('e18eb8fa-5862-11ed-b9d1-735d7b5123bc','',1,'a9392cd2-52a0-11ed-bf90-f11dbd5d99e9','d555a58a-5862-11ed-b9d1-735d7b5123bc','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'2'),('e18ed89e-5862-11ed-b9d1-735d7b5123bc','',1,'e88e287a-5826-11ed-8df0-15b85eaf5189','d555a58a-5862-11ed-b9d1-735d7b5123bc','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'2'),('f58615ea-539b-11ed-bc24-5055bba81b8b','',1,'094b5ebe-3beb-11ed-a8e3-4ffb021564b6','f5850c7c-539b-11ed-bc24-5055bba81b8b','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'1'),('f5867ce2-539b-11ed-bc24-5055bba81b8b','',2,'48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6','f5850c7c-539b-11ed-bc24-5055bba81b8b','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'1'),('f79f0da6-553e-11ed-96e9-63f9bbb96f02','',3,'094b5ebe-3beb-11ed-a8e3-4ffb021564b6','f79c4224-553e-11ed-96e9-63f9bbb96f02','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'1'),('fc0c2cd8-539b-11ed-bc24-5055bba81b8b','',1,'094b5ebe-3beb-11ed-a8e3-4ffb021564b6','f5850c7c-539b-11ed-bc24-5055bba81b8b','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'2'),('fc0c65ea-539b-11ed-bc24-5055bba81b8b','',1,'48b8d3f2-3c0d-11ed-a8e3-4ffb021564b6','f5850c7c-539b-11ed-bc24-5055bba81b8b','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'2'),('fc0ca99c-539b-11ed-bc24-5055bba81b8b','',1,'a9392cd2-52a0-11ed-bf90-f11dbd5d99e9','f5850c7c-539b-11ed-bc24-5055bba81b8b','226f5f9a-3839-11ed-9bd3-83007858518f',1,1,1,1,'2');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Outlets`
--

DROP TABLE IF EXISTS `Outlets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Outlets` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `OutletName` varchar(255) NOT NULL DEFAULT 'OutletName',
  `OutletSalePoint` varchar(255) NOT NULL DEFAULT 'SalePointType',
  `GUID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `GUID` (`GUID`),
  CONSTRAINT `outlets_ibfk_1` FOREIGN KEY (`GUID`) REFERENCES `Clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Outlets`
--

LOCK TABLES `Outlets` WRITE;
/*!40000 ALTER TABLE `Outlets` DISABLE KEYS */;
INSERT INTO `Outlets` VALUES ('90be3264-5396-11ed-b65c-33daaccdfe94','Angithi33','Dine In|TAKE-AWAY','226f5f9a-3839-11ed-9bd3-83007858518f'),('9dc50eb0-5396-11ed-b65c-33daaccdfe94','Choupal','Dine In|TAKE-AWAY','226f5f9a-3839-11ed-9bd3-83007858518f'),('c55b4ee4-5396-11ed-b65c-33daaccdfe94','Pizza Den','Dine In|TAKE-AWAY','434a8a80-3845-11ed-9bd3-83007858518f'),('ded21b3c-60c5-11ed-b9d1-735d7b5123bc','qqqqqqqq','jhjgjqqqqqqqqqg','226f5f9a-3839-11ed-9bd3-83007858518f');
/*!40000 ALTER TABLE `Outlets` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `outlets_lastUUID` AFTER INSERT ON `outlets` FOR EACH ROW SET @last_outletId = NEW.id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `RunningOrder`
--

DROP TABLE IF EXISTS `RunningOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RunningOrder` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `Name` varchar(255) NOT NULL,
  `MobileNo` varchar(255) NOT NULL,
  `SalePointType` varchar(255) NOT NULL,
  `SalePointName` varchar(255) NOT NULL,
  `Amount` double NOT NULL,
  `PAX` int DEFAULT NULL,
  `ActiveSince` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `BillPrinted` tinyint(1) NOT NULL,
  `OutletId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `WaiterId` varchar(255) NOT NULL,
  `ClientId` varchar(255) DEFAULT NULL,
  `KotNumbers` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  `isTerminated` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `WaiterId` (`WaiterId`),
  KEY `ClientId` (`ClientId`),
  KEY `OutletId` (`OutletId`),
  CONSTRAINT `runningorder_ibfk_4` FOREIGN KEY (`WaiterId`) REFERENCES `UserDetails` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `runningorder_ibfk_5` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `runningorder_ibfk_6` FOREIGN KEY (`OutletId`) REFERENCES `Outlets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RunningOrder`
--

LOCK TABLES `RunningOrder` WRITE;
/*!40000 ALTER TABLE `RunningOrder` DISABLE KEYS */;
INSERT INTO `RunningOrder` VALUES ('01a3dd00-5f6b-11ed-b9d1-735d7b5123bc','arghya','7224077631','Dine In','4',41.800000000000004,0,'2022-11-08 13:41:11',1,'90be3264-5396-11ed-b65c-33daaccdfe94','4f11e250-3719-11ed-b299-9317ba61b56a','226f5f9a-3839-11ed-9bd3-83007858518f','1',1),('52a1b686-5f71-11ed-b9d1-735d7b5123bc','','','TAKE-AWAY','2',146.3,0,'2022-11-08 14:26:24',0,'90be3264-5396-11ed-b65c-33daaccdfe94','4f11e250-3719-11ed-b299-9317ba61b56a','226f5f9a-3839-11ed-9bd3-83007858518f','1',0),('a68faa2a-5830-11ed-8df0-15b85eaf5189','','','TAKE-AWAY','1',52.5,0,'2022-10-30 08:55:49',1,'9dc50eb0-5396-11ed-b65c-33daaccdfe94','4f11e250-3719-11ed-b299-9317ba61b56a','226f5f9a-3839-11ed-9bd3-83007858518f','1',1),('d555a58a-5862-11ed-b9d1-735d7b5123bc','arghya','7224077631','Dine In','1',71.004,2,'2022-10-30 14:55:02',1,'90be3264-5396-11ed-b65c-33daaccdfe94','4f11e250-3719-11ed-b299-9317ba61b56a','226f5f9a-3839-11ed-9bd3-83007858518f','1,2',1),('f5850c7c-539b-11ed-bc24-5055bba81b8b','','','TAKE-AWAY','3',139.65,0,'2022-10-24 13:01:22',1,'90be3264-5396-11ed-b65c-33daaccdfe94','4f11e250-3719-11ed-b299-9317ba61b56a','226f5f9a-3839-11ed-9bd3-83007858518f','1,2',1),('f79c4224-553e-11ed-96e9-63f9bbb96f02','arghya','7224077631','Dine In','1',59.85,3,'2022-10-26 15:00:44',1,'90be3264-5396-11ed-b65c-33daaccdfe94','4f11e250-3719-11ed-b299-9317ba61b56a','226f5f9a-3839-11ed-9bd3-83007858518f','1',1);
/*!40000 ALTER TABLE `RunningOrder` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `runningOrder_uuid` AFTER INSERT ON `runningorder` FOR EACH ROW SET @last_uuid = NEW.id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `TaxClasses`
--

DROP TABLE IF EXISTS `TaxClasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TaxClasses` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `TaxClass` varchar(255) NOT NULL,
  `TaxRate` double NOT NULL,
  `ClientId` varchar(255) NOT NULL,
  `MasterFilter` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ClientId` (`ClientId`),
  CONSTRAINT `taxclasses_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TaxClasses`
--

LOCK TABLES `TaxClasses` WRITE;
/*!40000 ALTER TABLE `TaxClasses` DISABLE KEYS */;
INSERT INTO `TaxClasses` VALUES ('486caa36-5800-11ed-8df0-15b85eaf5189','Drinks',10,'226f5f9a-3839-11ed-9bd3-83007858518f','Drinks10'),('63a25fb8-57ff-11ed-8df0-15b85eaf5189','Food',5,'226f5f9a-3839-11ed-9bd3-83007858518f','Food5');
/*!40000 ALTER TABLE `TaxClasses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserClientAllocation`
--

DROP TABLE IF EXISTS `UserClientAllocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserClientAllocation` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `CompanyGUID` varchar(255) DEFAULT NULL,
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `OutletId` varchar(255) DEFAULT NULL,
  `UCARoleId` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `OutletId` (`OutletId`),
  CONSTRAINT `userclientallocation_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `UserDetails` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `userclientallocation_ibfk_5` FOREIGN KEY (`OutletId`) REFERENCES `Outlets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserClientAllocation`
--

LOCK TABLES `UserClientAllocation` WRITE;
/*!40000 ALTER TABLE `UserClientAllocation` DISABLE KEYS */;
INSERT INTO `UserClientAllocation` VALUES ('5a45af2a-383c-11ed-9bd3-83007858518f',NULL,'4f11e250-3719-11ed-b299-9317ba61b56a','90be3264-5396-11ed-b65c-33daaccdfe94',4),('5a9010a2-3845-11ed-9bd3-83007858518f',NULL,'4f11e250-3719-11ed-b299-9317ba61b56a','c55b4ee4-5396-11ed-b65c-33daaccdfe94',1),('96943668-3837-11ed-9bd3-83007858518f',NULL,'4f11e250-3719-11ed-b299-9317ba61b56a','9dc50eb0-5396-11ed-b65c-33daaccdfe94',4),('ef635522-6f1d-11ed-a3ba-707b1805d417',NULL,'6474883c-55ff-11ed-aabd-40035089be1d','9dc50eb0-5396-11ed-b65c-33daaccdfe94',1);
/*!40000 ALTER TABLE `UserClientAllocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserDetails`
--

DROP TABLE IF EXISTS `UserDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserDetails` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT (uuid()),
  `Name` varchar(255) NOT NULL,
  `MobileNumber` varchar(255) NOT NULL,
  `RoleId` int NOT NULL DEFAULT '1',
  `IsActive` tinyint(1) NOT NULL,
  `ProfileUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `DeviceToken` varchar(255) DEFAULT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`MobileNumber`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserDetails`
--

LOCK TABLES `UserDetails` WRITE;
/*!40000 ALTER TABLE `UserDetails` DISABLE KEYS */;
INSERT INTO `UserDetails` VALUES ('4f11e250-3719-11ed-b299-9317ba61b56a','arghya','7224077631',1,1,'undefined','TE1A.220922.012','2022-09-18 06:15:35'),('6474883c-55ff-11ed-aabd-40035089be1d','Arghya Bandyopadhyay new','7974014228',1,1,'undefined','b1bc174b19f8ded8','2022-10-27 13:58:10');
/*!40000 ALTER TABLE `UserDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `UID` varchar(255) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tokenType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Bearer',
  `MobileNumber` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UID` (`UID`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `UserDetails` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (24,'arghya','$2a$10$z4n6r16C5637HnRug82O9ORfm41Ew98fTCkImQ9kk5Xunk8bgSpvq','4f11e250-3719-11ed-b299-9317ba61b56a','2023-02-04 05:16:23','Bearer','7224077631'),(27,'Arghya Bandyopadhyay new','$2a$10$dNPsQNTHjbE9nJYTsXcFMuVSgAneLAhC9jyxy6ulcViNNO73fNOKW','6474883c-55ff-11ed-aabd-40035089be1d','2022-10-27 18:19:54','Bearer','7974014228');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-18  0:32:37
