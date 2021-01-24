-- --------------------------------------------------------
-- Host:                         vinaworld.dynu.net
-- Server version:               8.0.23 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for CNPM18_COURSERA_DATABASE
DROP DATABASE IF EXISTS `CNPM18_COURSERA_DATABASE`;
CREATE DATABASE IF NOT EXISTS `CNPM18_COURSERA_DATABASE` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `CNPM18_COURSERA_DATABASE`;

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Answers
DROP TABLE IF EXISTS `Answers`;
CREATE TABLE IF NOT EXISTS `Answers` (
  `id_question` int NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_question`),
  CONSTRAINT `fk_Answers_Questions` FOREIGN KEY (`id_question`) REFERENCES `Questions` (`id_question`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Courses
DROP TABLE IF EXISTS `Courses`;
CREATE TABLE IF NOT EXISTS `Courses` (
  `id_course` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `length` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `teacher` int DEFAULT NULL,
  `status` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_course`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_Courses_Members_idx` (`teacher`),
  CONSTRAINT `fk_Courses_Members` FOREIGN KEY (`teacher`) REFERENCES `Members` (`id_member`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.CoursesSold
DROP TABLE IF EXISTS `CoursesSold`;
CREATE TABLE IF NOT EXISTS `CoursesSold` (
  `id_member` int NOT NULL,
  `id_course` int NOT NULL,
  `status` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_bought` datetime DEFAULT NULL,
  `date_payment` datetime DEFAULT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`id_member`,`id_course`),
  KEY `fk_CoursesSold_Courses_idx` (`id_course`),
  CONSTRAINT `fk_CoursesSold_Courses` FOREIGN KEY (`id_course`) REFERENCES `Courses` (`id_course`),
  CONSTRAINT `fk_CoursesSold_Members` FOREIGN KEY (`id_member`) REFERENCES `Members` (`id_member`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for procedure CNPM18_COURSERA_DATABASE.create_question
DROP PROCEDURE IF EXISTS `create_question`;
DELIMITER //
CREATE PROCEDURE `create_question`(
	IN `id_test` INT,
	IN `content` LONGTEXT,
	IN `score` INT
)
BEGIN
	insert into Answers(content) values (NULL);
   insert into Question(id_test, content, score) values (id_test, content, score);
END//
DELIMITER ;

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
  `id_document` int NOT NULL AUTO_INCREMENT,
  `id_course` int DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_upload` date DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_document`),
  KEY `fk_Documents_Lessons_idx` (`id_course`) USING BTREE,
  CONSTRAINT `fk_Documents_Courses` FOREIGN KEY (`id_course`) REFERENCES `Courses` (`id_course`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Lessons
DROP TABLE IF EXISTS `Lessons`;
CREATE TABLE IF NOT EXISTS `Lessons` (
  `id_lesson` int NOT NULL AUTO_INCREMENT,
  `id_course` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `length` int DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_lesson`),
  KEY `fk_Lessons_Courses_idx` (`id_course`),
  CONSTRAINT `fk_Lessons_Courses` FOREIGN KEY (`id_course`) REFERENCES `Courses` (`id_course`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Members
DROP TABLE IF EXISTS `Members`;
CREATE TABLE IF NOT EXISTS `Members` (
  `id_member` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_member`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_Members_MembersInfo1_idx` (`id_member`),
  CONSTRAINT `fk_Members_MembersInfo` FOREIGN KEY (`id_member`) REFERENCES `MembersInfo` (`id_member`)
) ENGINE=InnoDB AUTO_INCREMENT=1018 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.MembersAnswers
DROP TABLE IF EXISTS `MembersAnswers`;
CREATE TABLE IF NOT EXISTS `MembersAnswers` (
  `id_member` int NOT NULL,
  `id_question` int NOT NULL,
  `score` int DEFAULT NULL,
  `datetime_answer` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datetime_update` datetime DEFAULT NULL,
  PRIMARY KEY (`id_member`,`id_question`),
  KEY `fk_MembersAnswers_Questions_idx` (`id_question`),
  CONSTRAINT `fk_MembersAnswers_Members` FOREIGN KEY (`id_member`) REFERENCES `Members` (`id_member`),
  CONSTRAINT `fk_MembersAnswers_Questions` FOREIGN KEY (`id_question`) REFERENCES `Questions` (`id_question`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.MembersInfo
DROP TABLE IF EXISTS `MembersInfo`;
CREATE TABLE IF NOT EXISTS `MembersInfo` (
  `id_member` int NOT NULL AUTO_INCREMENT,
  `date_birth` date DEFAULT NULL,
  `date_registration` datetime DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_member`),
  UNIQUE KEY `id_member_UNIQUE` (`id_member`)
) ENGINE=InnoDB AUTO_INCREMENT=1018 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.MembersScore
DROP TABLE IF EXISTS `MembersScore`;
CREATE TABLE IF NOT EXISTS `MembersScore` (
  `id_member` int NOT NULL,
  `id_test` int NOT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`id_member`,`id_test`),
  KEY `fk_MembersScore_Tests_idx` (`id_test`),
  CONSTRAINT `fk_MembersScore_Members` FOREIGN KEY (`id_member`) REFERENCES `Members` (`id_member`),
  CONSTRAINT `fk_MembersScore_Tests` FOREIGN KEY (`id_test`) REFERENCES `Tests` (`id_test`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for function CNPM18_COURSERA_DATABASE.member_answer
DROP FUNCTION IF EXISTS `member_answer`;
DELIMITER //
CREATE FUNCTION `member_answer`(
	`id_member` INT,
	`id_question` INT,
	`answer` INT
) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE content LONGTEXT;
	DECLARE score INT DEFAULT 0;
	DECLARE real_score INT DEFAULT 0;

	SELECT content, score  INTO content, score FROM Answers WHERE `id_question` = id_question;
	
	IF STRCMP(content, answer) = 0 
	THEN 
		SET real_score = score;
	END IF;
	
	INSERT INTO MembersAnswers (id_member, id_question, score) 
		VALUES (id_member, id_question, real_score)
		ON DUPLICATE KEY UPDATE score = real_score;
	RETURN real_score;		
END//
DELIMITER ;

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Questions
DROP TABLE IF EXISTS `Questions`;
CREATE TABLE IF NOT EXISTS `Questions` (
  `id_question` int NOT NULL AUTO_INCREMENT,
  `id_test` int DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`id_question`),
  KEY `fk_Questions_Tests_idx` (`id_test`),
  CONSTRAINT `fk_Questions_Tests` FOREIGN KEY (`id_test`) REFERENCES `Tests` (`id_test`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Reviews
DROP TABLE IF EXISTS `Reviews`;
CREATE TABLE IF NOT EXISTS `Reviews` (
  `id_member` int NOT NULL,
  `id_course` int NOT NULL,
  `star` int DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_member`,`id_course`),
  KEY `fk_Reviews_Courses_idx` (`id_course`) USING BTREE,
  CONSTRAINT `fk_Reviews_Courses` FOREIGN KEY (`id_course`) REFERENCES `Courses` (`id_course`),
  CONSTRAINT `fk_Reviews_Members` FOREIGN KEY (`id_member`) REFERENCES `Members` (`id_member`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table CNPM18_COURSERA_DATABASE.Tests
DROP TABLE IF EXISTS `Tests`;
CREATE TABLE IF NOT EXISTS `Tests` (
  `id_test` int NOT NULL AUTO_INCREMENT,
  `id_course` int DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `length` int DEFAULT NULL,
  PRIMARY KEY (`id_test`),
  KEY `fk_test_lesson_idx` (`id_course`) USING BTREE,
  CONSTRAINT `fk_Tests_Courses` FOREIGN KEY (`id_course`) REFERENCES `Courses` (`id_course`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for trigger CNPM18_COURSERA_DATABASE.MembersAnswers_after_insert
DROP TRIGGER IF EXISTS `MembersAnswers_after_insert`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `MembersAnswers_after_insert` AFTER INSERT ON `MembersAnswers` FOR EACH ROW BEGIN
	DECLARE sum_score int;
	DECLARE test INT;
	
	#find test which question belongs to
	SELECT id_test 
	INTO test
	FROM Questions
	WHERE	Questions.id_question = NEW.id_question;
	
	#calc sum of score all of question belongs to test above
	SELECT SUM(score)
	INTO sum_score
	FROM MembersAnswers
	WHERE MembersAnswers.id_member = NEW.id_member 
		AND MembersAnswers.id_question IN (SELECT Questions.id_question
														FROM Questions
														WHERE Questions.id_test = test);
														
	#insert or update in MembersScore
	INSERT INTO MembersScore (id_member, id_question, score) 
	VALUES (NEW.id_member, NEW.id_question, sum_score) 
	ON DUPLICATE KEY UPDATE score=sum_score;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger CNPM18_COURSERA_DATABASE.MembersAnswers_after_update
DROP TRIGGER IF EXISTS `MembersAnswers_after_update`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `MembersAnswers_after_update` AFTER UPDATE ON `MembersAnswers` FOR EACH ROW BEGIN
	DECLARE sum_score int;
	DECLARE test INT;
	
	#find test which question belongs to
	SELECT id_test 
	INTO test
	FROM Questions
	WHERE	Questions.id_question = NEW.id_question;
	
	#calc sum of score all of question belongs to test above
	SELECT SUM(score)
	INTO sum_score
	FROM MembersAnswers
	WHERE MembersAnswers.id_member = NEW.id_member 
		AND MembersAnswers.id_question IN (SELECT Questions.id_question
														FROM Questions
														WHERE Questions.id_test = test);
														
	#insert or update in MembersScore
	INSERT INTO MembersScore (id_member, id_question, score) 
	VALUES (NEW.id_member, NEW.id_question, sum_score) 
	ON DUPLICATE KEY UPDATE score=sum_score;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
