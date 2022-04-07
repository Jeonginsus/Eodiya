-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: j6e203.p.ssafy.io    Database: ssafy_bigdata
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cafes_cafelist_commercialCode`
--

DROP TABLE IF EXISTS `cafes_cafelist_commercialCode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cafes_cafelist_commercialCode` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cafelist_id` int NOT NULL,
  `commercialarea_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cafes_cafelist_commercia_cafelist_id_commercialar_d9cd6b6b_uniq` (`cafelist_id`,`commercialarea_id`),
  KEY `cafes_cafelist_comme_commercialarea_id_d2603a42_fk_commercia` (`commercialarea_id`),
  CONSTRAINT `cafes_cafelist_comme_cafelist_id_0245102a_fk_cafes_caf` FOREIGN KEY (`cafelist_id`) REFERENCES `cafes_cafelist` (`UrlId`),
  CONSTRAINT `cafes_cafelist_comme_commercialarea_id_d2603a42_fk_commercia` FOREIGN KEY (`commercialarea_id`) REFERENCES `commercial_area_commercialarea` (`commercialAreaCode`)
) ENGINE=InnoDB AUTO_INCREMENT=23359 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 22:18:23
