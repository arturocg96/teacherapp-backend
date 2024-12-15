CREATE DATABASE  IF NOT EXISTS `teacherapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `teacherapp`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: teacherapp
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `inscripciones_clase`
--

DROP TABLE IF EXISTS `inscripciones_clase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones_clase` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `alumno_id` int unsigned NOT NULL,
  `profesor_id` int unsigned NOT NULL,
  `fecha_registro` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuarios_has_usuarios_usuarios2_idx` (`profesor_id`),
  KEY `fk_usuarios_has_usuarios_usuarios1_idx` (`alumno_id`),
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios1` FOREIGN KEY (`alumno_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios2` FOREIGN KEY (`profesor_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `materias_profesores`
--

DROP TABLE IF EXISTS `materias_profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias_profesores` (
  `usuarios_id` int unsigned NOT NULL,
  `Materias_id` int unsigned NOT NULL,
  PRIMARY KEY (`usuarios_id`,`Materias_id`),
  KEY `fk_usuarios_has_Materias_Materias1_idx` (`Materias_id`),
  KEY `fk_usuarios_has_Materias_usuarios1_idx` (`usuarios_id`),
  CONSTRAINT `fk_usuarios_has_Materias_Materias1` FOREIGN KEY (`Materias_id`) REFERENCES `materias` (`id`),
  CONSTRAINT `fk_usuarios_has_Materias_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `emisor_id` int unsigned NOT NULL,
  `destinatario_id` int unsigned NOT NULL,
  `asunto` varchar(255) DEFAULT NULL,
  `contenido` text NOT NULL,
  `leido` tinyint unsigned NOT NULL DEFAULT '0',
  `respuesta_a_mensaje_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mensajes_email_usuarios1_idx` (`emisor_id`),
  KEY `fk_mensajes_email_usuarios2_idx` (`destinatario_id`),
  CONSTRAINT `fk_mensajes_email_usuarios1` FOREIGN KEY (`emisor_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_mensajes_email_usuarios2` FOREIGN KEY (`destinatario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opiniones`
--

DROP TABLE IF EXISTS `opiniones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opiniones` (
  `estudiante_id` int unsigned NOT NULL,
  `profesor_id` int unsigned NOT NULL,
  `puntuacion` int unsigned NOT NULL,
  `comentario` text,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`estudiante_id`,`profesor_id`),
  KEY `fk_usuarios_has_opiniones_usuarios1_idx` (`estudiante_id`),
  KEY `fk_usuarios_has_opiniones_usuarios2_idx` (`profesor_id`),
  CONSTRAINT `fk_usuarios_has_opiniones_usuarios1` FOREIGN KEY (`estudiante_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_usuarios_has_opiniones_usuarios2` FOREIGN KEY (`profesor_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `usuarios_id` int unsigned NOT NULL,
  `precio_hora` decimal(2,0) DEFAULT NULL,
  `localizacion` varchar(254) DEFAULT NULL,
  `telefono` int unsigned DEFAULT NULL,
  `meses_experiencia` int DEFAULT NULL,
  `validado` tinyint unsigned NOT NULL DEFAULT '0',
  `sobre_mi` text,
  PRIMARY KEY (`id`),
  KEY `fk_profesores_usuarios1_idx` (`usuarios_id`),
  CONSTRAINT `fk_profesores_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('administrador','alumno','profesor') DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `activo` tinyint unsigned NOT NULL DEFAULT '1',
  `psw_reset_code` varchar(45) DEFAULT NULL,
  `psw_reset_exp_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-15 16:03:31
