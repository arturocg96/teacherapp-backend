SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema teacherapp
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `teacherapp` DEFAULT CHARACTER SET utf8mb4;
USE `teacherapp`;

-- -----------------------------------------------------
-- Table `teacherapp`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`usuarios` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(150) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('administrador', 'alumno', 'profesor') NULL,
  `foto` VARCHAR(255) NULL,
  `activo` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `psw_reset_code` VARCHAR(45) NULL,
  `psw_reset_exp_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `teacherapp`.`opiniones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`opiniones` (
  `estudiante_id` INT UNSIGNED NOT NULL,
  `profesor_id` INT UNSIGNED NOT NULL,
  `puntuacion` INT UNSIGNED NOT NULL,
  `comentario` TEXT(1000) NULL,
  `fecha` DATETIME NULL,
  PRIMARY KEY (`estudiante_id`, `profesor_id`),
  INDEX `fk_usuarios_has_opiniones_usuarios1_idx` (`estudiante_id` ASC) VISIBLE,
  INDEX `fk_usuarios_has_opiniones_usuarios2_idx` (`profesor_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_has_opiniones_usuarios1`
    FOREIGN KEY (`estudiante_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_opiniones_usuarios2`
    FOREIGN KEY (`profesor_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `teacherapp`.`materias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`materias` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `teacherapp`.`materias_profesores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`materias_profesores` (
  `usuarios_id` INT UNSIGNED NOT NULL,
  `Materias_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`usuarios_id`, `Materias_id`),
  INDEX `fk_usuarios_has_Materias_Materias1_idx` (`Materias_id` ASC) VISIBLE,
  INDEX `fk_usuarios_has_Materias_usuarios1_idx` (`usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_has_Materias_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_Materias_Materias1`
    FOREIGN KEY (`Materias_id`)
    REFERENCES `teacherapp`.`materias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `teacherapp`.`mensajes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`mensajes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `emisor_id` INT UNSIGNED NOT NULL,
  `destinatario_id` INT UNSIGNED NOT NULL,
  `asunto` VARCHAR(255) NULL,
  `contenido` TEXT NOT NULL,
  `leido` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `respuesta_a_mensaje_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mensajes_email_usuarios1_idx` (`emisor_id` ASC) VISIBLE,
  INDEX `fk_mensajes_email_usuarios2_idx` (`destinatario_id` ASC) VISIBLE,
  CONSTRAINT `fk_mensajes_email_usuarios1`
    FOREIGN KEY (`emisor_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensajes_email_usuarios2`
    FOREIGN KEY (`destinatario_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `teacherapp`.`inscripciones_clase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`inscripciones_clase` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `alumno_id` INT UNSIGNED NOT NULL,
  `profesor_id` INT UNSIGNED NOT NULL,
  `fecha_registro` DATETIME NULL,
  `fecha_fin` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_has_usuarios_usuarios2_idx` (`profesor_id` ASC) VISIBLE,
  INDEX `fk_usuarios_has_usuarios_usuarios1_idx` (`alumno_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios1`
    FOREIGN KEY (`alumno_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios2`
    FOREIGN KEY (`profesor_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `teacherapp`.`profesores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`profesores` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuarios_id` INT UNSIGNED NOT NULL,
  `precio_hora` DECIMAL(2) NULL,
  `localizacion` VARCHAR(254) NULL,
  `telefono` INT UNSIGNED NULL,
  `meses_experiencia` INT NULL,
  `validado` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `sobre_mi` TEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_profesores_usuarios1_idx` (`usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_profesores_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
