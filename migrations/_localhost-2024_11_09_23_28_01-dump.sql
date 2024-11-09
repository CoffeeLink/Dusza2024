-- MariaDB dump 10.19  Distrib 10.5.23-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: verseny_db_base
-- ------------------------------------------------------
-- Server version	10.5.23-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_tokens`
--

DROP TABLE IF EXISTS `auth_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_tokens` (
  `token_id` binary(16) NOT NULL COMMENT 'the auth token',
  `user_id` int(10) unsigned DEFAULT NULL,
  `expiry_date` datetime NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`token_id`),
  KEY `user_token_pk` (`user_id`),
  CONSTRAINT `user_token_pk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_tokens`
--

LOCK TABLES `auth_tokens` WRITE;
/*!40000 ALTER TABLE `auth_tokens` DISABLE KEYS */;
INSERT INTO `auth_tokens` VALUES ('ì•|¬¢£MŸ≈ñH}',4,'2024-11-11 11:17:56','2024-11-09 11:17:56'),('ìÌ7Üs`ô§ØÏA)',4,'2024-11-11 18:16:19','2024-11-09 18:16:19'),('ìE£àq–±x¶\Z◊±\Z8',4,'2024-11-11 19:52:54','2024-11-09 19:52:54'),('ìd(”zpòœnÈ##',4,'2024-11-11 20:26:14','2024-11-09 20:26:14'),('ìpEºp±Å∂ï Œæ',4,'2024-11-11 20:39:28','2024-11-09 20:39:28');
/*!40000 ALTER TABLE `auth_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competition_category`
--

DROP TABLE IF EXISTS `competition_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `competition_category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_description` varchar(1024) DEFAULT NULL,
  `category_deadline` datetime NOT NULL,
  `category_state` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `competition_category_pk_2` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competition_category`
--

LOCK TABLES `competition_category` WRITE;
/*!40000 ALTER TABLE `competition_category` DISABLE KEYS */;
INSERT INTO `competition_category` VALUES (2,'TestCategory',NULL,'2024-11-09 05:10:10',0),(3,'Garden of Salvation',NULL,'2024-11-09 05:10:10',0);
/*!40000 ALTER TABLE `competition_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incomplete_form_requests`
--

DROP TABLE IF EXISTS `incomplete_form_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `incomplete_form_requests` (
  `request_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `request_message` varchar(1024) NOT NULL,
  `request_made_by` enum('SCHOOL_REP','ORGANIZER') NOT NULL,
  `request_response` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incomplete_form_requests`
--

LOCK TABLES `incomplete_form_requests` WRITE;
/*!40000 ALTER TABLE `incomplete_form_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `incomplete_form_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programming_language`
--

DROP TABLE IF EXISTS `programming_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `programming_language` (
  `lang_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lang_name` varchar(70) NOT NULL,
  PRIMARY KEY (`lang_id`),
  UNIQUE KEY `programming_language_pk_2` (`lang_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programming_language`
--

LOCK TABLES `programming_language` WRITE;
/*!40000 ALTER TABLE `programming_language` DISABLE KEYS */;
INSERT INTO `programming_language` VALUES (4,'C# 8.1'),(3,'Javascript'),(2,'Rust');
/*!40000 ALTER TABLE `programming_language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_data`
--

DROP TABLE IF EXISTS `school_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `school_data` (
  `school_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `school_name` varchar(255) NOT NULL,
  `school_address` varchar(255) NOT NULL,
  `school_representative_name` varchar(70) NOT NULL,
  `school_representative_email` varchar(128) NOT NULL,
  PRIMARY KEY (`school_id`),
  UNIQUE KEY `school_data_pk_2` (`school_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_data`
--

LOCK TABLES `school_data` WRITE;
/*!40000 ALTER TABLE `school_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `school_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sherpa_teacher`
--

DROP TABLE IF EXISTS `sherpa_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sherpa_teacher` (
  `teacher_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned NOT NULL COMMENT 'ebben a csoportban adt√°k meg ezt a tan√°rt',
  `teacher_name` varchar(70) NOT NULL,
  PRIMARY KEY (`teacher_id`),
  UNIQUE KEY `sherpa_teacher_pk_2` (`group_id`),
  CONSTRAINT `sherpa_teacher_team_data_team_id_fk` FOREIGN KEY (`group_id`) REFERENCES `team_data` (`team_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sherpa_teacher`
--

LOCK TABLES `sherpa_teacher` WRITE;
/*!40000 ALTER TABLE `sherpa_teacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `sherpa_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_data`
--

DROP TABLE IF EXISTS `team_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_data` (
  `team_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `team_name` varchar(52) NOT NULL,
  `school_id` int(10) unsigned NOT NULL,
  `member_name_1` varchar(70) NOT NULL,
  `member_name_2` varchar(70) NOT NULL,
  `member_name_3` varchar(70) NOT NULL,
  `member_class_1` varchar(5) NOT NULL,
  `member_class_2` varchar(5) NOT NULL,
  `member_class_3` varchar(5) NOT NULL,
  `replacement_member_name` varchar(70) DEFAULT NULL,
  `replacement_,member_class` varchar(5) DEFAULT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `programming_language_id` int(10) unsigned NOT NULL,
  `incomplete_form_request_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`team_id`),
  UNIQUE KEY `team_data_team_name_uindex` (`team_name`),
  KEY `team_data_school_id_index` (`school_id`),
  KEY `team_data_programming_language_lang_id_fk` (`programming_language_id`),
  KEY `team_data_competition_category_category_id_fk` (`category_id`),
  KEY `team_data_incomplete_form_requests_request_id_fk` (`incomplete_form_request_id`),
  CONSTRAINT `team_data_competition_category_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `competition_category` (`category_id`) ON DELETE CASCADE,
  CONSTRAINT `team_data_incomplete_form_requests_request_id_fk` FOREIGN KEY (`incomplete_form_request_id`) REFERENCES `incomplete_form_requests` (`request_id`) ON DELETE SET NULL,
  CONSTRAINT `team_data_programming_language_lang_id_fk` FOREIGN KEY (`programming_language_id`) REFERENCES `programming_language` (`lang_id`) ON DELETE CASCADE,
  CONSTRAINT `team_data_school_data_school_id_fk` FOREIGN KEY (`school_id`) REFERENCES `school_data` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_data`
--

LOCK TABLES `team_data` WRITE;
/*!40000 ALTER TABLE `team_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(52) NOT NULL,
  `password` binary(32) NOT NULL,
  `user_type` tinyint(3) unsigned NOT NULL,
  `team_data_id` int(10) unsigned DEFAULT NULL,
  `school_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_pass_pk` (`username`,`password`),
  KEY `user_pass_index` (`password`,`username`),
  KEY `user_team_data_team_id_fk` (`team_data_id`),
  KEY `user_school_data_id_fk` (`school_id`),
  CONSTRAINT `user_school_data_id_fk` FOREIGN KEY (`school_id`) REFERENCES `school_data` (`school_id`) ON DELETE CASCADE,
  CONSTRAINT `user_team_data_team_id_fk` FOREIGN KEY (`team_data_id`) REFERENCES `team_data` (`team_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'test','∆Y Ñ\\ö5˙t9¶Rﬁçˇ›|§±<P˜X˛¬zÅQ',3,NULL,NULL),(5,'aron','∆Y Ñ\\ö5˙t9¶Rﬁçˇ›|§±<P˜X˛¬zÅQ',1,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-09 23:28:01
