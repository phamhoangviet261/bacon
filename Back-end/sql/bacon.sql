-- MySQL Script generated by MySQL Workbench
-- Mon Dec  7 17:06:32 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema CNPM18_COURSERA_DATABASE
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema CNPM18_COURSERA_DATABASE
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CNPM18_COURSERA_DATABASE` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `CNPM18_COURSERA_DATABASE` ;

-- -----------------------------------------------------
-- Table `CNPM18_COURSERA_DATABASE`.`MembersInfo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CNPM18_COURSERA_DATABASE`.`MembersInfo` ;

CREATE TABLE IF NOT EXISTS `CNPM18_COURSERA_DATABASE`.`MembersInfo` (
  `id_member` INT NOT NULL,
  `date_birth` DATE NULL,
  `date_registration` DATETIME NULL,
  `name` NVARCHAR(255) NULL,
  `sex` VARCHAR(10) NULL,
  PRIMARY KEY (`id_member`),
  UNIQUE INDEX `id_member_UNIQUE` (`id_member` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CNPM18_COURSERA_DATABASE`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CNPM18_COURSERA_DATABASE`.`Role` ;

CREATE TABLE IF NOT EXISTS `CNPM18_COURSERA_DATABASE`.`Role` (
  `id_role` INT NOT NULL,
  `name_role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_role`),
  UNIQUE INDEX `name_role_UNIQUE` (`name_role` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CNPM18_COURSERA_DATABASE`.`Members`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CNPM18_COURSERA_DATABASE`.`Members` ;

CREATE TABLE IF NOT EXISTS `CNPM18_COURSERA_DATABASE`.`Members` (
  `id_member` INT NOT NULL AUTO_INCREMENT,
  `username` NVARCHAR(255) NOT NULL,
  `password` NVARCHAR(255) NOT NULL,
  `email` NVARCHAR(255) NOT NULL,
  `role` INT NOT NULL,
  PRIMARY KEY (`id_member`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  INDEX `fk_Members_MembersInfo1_idx` (`id_member` ASC) VISIBLE,
  INDEX `fk_Members_Role_idx` (`role` ASC) VISIBLE,
  CONSTRAINT `fk_Members_MembersInfo`
    FOREIGN KEY (`id_member`)
    REFERENCES `CNPM18_COURSERA_DATABASE`.`MembersInfo` (`id_member`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Members_Role`
    FOREIGN KEY (`role`)
    REFERENCES `CNPM18_COURSERA_DATABASE`.`Role` (`id_role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CNPM18_COURSERA_DATABASE`.`Courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CNPM18_COURSERA_DATABASE`.`Courses` ;

CREATE TABLE IF NOT EXISTS `CNPM18_COURSERA_DATABASE`.`Courses` (
  `id_course` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `code` VARCHAR(45) NULL,
  `subject` VARCHAR(255) NULL,
  `length` INT NULL,
  `price` INT NULL,
  `teacher` INT NULL,
  PRIMARY KEY (`id_course`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE,
  INDEX `fk_Courses_Members_idx` (`teacher` ASC) VISIBLE,
  CONSTRAINT `fk_Courses_Members`
    FOREIGN KEY (`teacher`)
    REFERENCES `CNPM18_COURSERA_DATABASE`.`Members` (`id_member`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CNPM18_COURSERA_DATABASE`.`Lessons`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CNPM18_COURSERA_DATABASE`.`Lessons` ;

CREATE TABLE IF NOT EXISTS `CNPM18_COURSERA_DATABASE`.`Lessons` (
  `id_lesson` INT NOT NULL AUTO_INCREMENT,
  `id_course` INT NULL,
  `name` NVARCHAR(255) NULL,
  `length` INT NULL,
  `content` LONGTEXT NULL,
  PRIMARY KEY (`id_lesson`),
  INDEX `fk_Lessons_Courses_idx` (`id_course` ASC) VISIBLE,
  CONSTRAINT `fk_Lessons_Courses`
    FOREIGN KEY (`id_course`)
    REFERENCES `CNPM18_COURSERA_DATABASE`.`Courses` (`id_course`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CNPM18_COURSERA_DATABASE`.`Test`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CNPM18_COURSERA_DATABASE`.`Test` ;

CREATE TABLE IF NOT EXISTS `CNPM18_COURSERA_DATABASE`.`Test` (
  `id_test` INT NOT NULL,
  `id_lesson` INT NULL,
  `name` NVARCHAR(45) NULL,
  `content` LONGTEXT NULL,
  `length` INT NULL,
  PRIMARY KEY (`id_test`),
  INDEX `fk_test_lesson_idx` (`id_lesson` ASC) VISIBLE,
  CONSTRAINT `fk_test_lesson`
    FOREIGN KEY (`id_lesson`)
    REFERENCES `CNPM18_COURSERA_DATABASE`.`Lessons` (`id_lesson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CNPM18_COURSERA_DATABASE`.`Documents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CNPM18_COURSERA_DATABASE`.`Documents` ;

CREATE TABLE IF NOT EXISTS `CNPM18_COURSERA_DATABASE`.`Documents` (
  `id_document` INT NOT NULL,
  `id_lesson` INT NULL,
  `type` NVARCHAR(45) NULL,
  `date_upload` DATE NULL,
  `content` LONGTEXT NULL,
  PRIMARY KEY (`id_document`),
  INDEX `fk_Documents_Lessons_idx` (`id_lesson` ASC) VISIBLE,
  CONSTRAINT `fk_Documents_Lessons`
    FOREIGN KEY (`id_lesson`)
    REFERENCES `CNPM18_COURSERA_DATABASE`.`Lessons` (`id_lesson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;