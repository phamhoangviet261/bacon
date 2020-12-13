-- --------------------------------------------------------
-- Host:                         vinaworld.dynu.net
-- Server version:               8.0.22 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for CNPM18_COURSERA_DATABASE
DROP DATABASE IF EXISTS `CNPM18_COURSERA_DATABASE`;
CREATE DATABASE IF NOT EXISTS `CNPM18_COURSERA_DATABASE` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `CNPM18_COURSERA_DATABASE`;

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Courses
DROP TABLE IF EXISTS `Courses`;
CREATE TABLE IF NOT EXISTS `Courses` (
  `id_course` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(45) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `length` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `teacher` int DEFAULT NULL,
  PRIMARY KEY (`id_course`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_Courses_Members_idx` (`teacher`),
  CONSTRAINT `fk_Courses_Members` FOREIGN KEY (`teacher`) REFERENCES `Members` (`id_member`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for procedure CNPM18_COURSERA_DATABASE.create_user
DROP PROCEDURE IF EXISTS `create_user`;
DELIMITER //
CREATE PROCEDURE `create_user`(
	IN `username` varchar(255),
	IN `password` varchar(255),
	IN `email` varchar(255),
	IN `role` varchar(255)
)
BEGIN
	insert into MembersInfo(date_birth, date_registration, name, sex) values (NULL, NULL, NULL, NULL);
   insert into Members (username, password, email, role) values (username, password, email, role);
    
END//
DELIMITER ;

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Documents
DROP TABLE IF EXISTS `Documents`;
CREATE TABLE IF NOT EXISTS `Documents` (
  `id_document` int NOT NULL,
  `id_course` int DEFAULT NULL,
  `type` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `date_upload` date DEFAULT NULL,
  `content` longtext,
  PRIMARY KEY (`id_document`),
  KEY `fk_Documents_Lessons_idx` (`id_course`) USING BTREE,
  CONSTRAINT `fk_Documents_Courses` FOREIGN KEY (`id_course`) REFERENCES `Courses` (`id_course`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Lessons
DROP TABLE IF EXISTS `Lessons`;
CREATE TABLE IF NOT EXISTS `Lessons` (
  `id_lesson` int NOT NULL AUTO_INCREMENT,
  `id_course` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `length` int DEFAULT NULL,
  `content` longtext,
  PRIMARY KEY (`id_lesson`),
  KEY `fk_Lessons_Courses_idx` (`id_course`),
  CONSTRAINT `fk_Lessons_Courses` FOREIGN KEY (`id_course`) REFERENCES `Courses` (`id_course`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Members
DROP TABLE IF EXISTS `Members`;
CREATE TABLE IF NOT EXISTS `Members` (
  `id_member` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id_member`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_Members_MembersInfo1_idx` (`id_member`),
  CONSTRAINT `fk_Members_MembersInfo` FOREIGN KEY (`id_member`) REFERENCES `MembersInfo` (`id_member`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.MembersInfo
DROP TABLE IF EXISTS `MembersInfo`;
CREATE TABLE IF NOT EXISTS `MembersInfo` (
  `id_member` int NOT NULL AUTO_INCREMENT,
  `date_birth` date DEFAULT NULL,
  `date_registration` datetime DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_member`),
  UNIQUE KEY `id_member_UNIQUE` (`id_member`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Tests
DROP TABLE IF EXISTS `Tests`;
CREATE TABLE IF NOT EXISTS `Tests` (
  `id_test` int NOT NULL,
  `id_course` int DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` longtext,
  `length` int DEFAULT NULL,
  PRIMARY KEY (`id_test`),
  KEY `fk_test_lesson_idx` (`id_course`) USING BTREE,
  CONSTRAINT `fk_course_lesson` FOREIGN KEY (`id_course`) REFERENCES `Courses` (`id_course`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
