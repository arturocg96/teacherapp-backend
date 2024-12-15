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
-- Dumping data for table `inscripciones_clase`
--

LOCK TABLES `inscripciones_clase` WRITE;
/*!40000 ALTER TABLE `inscripciones_clase` DISABLE KEYS */;
INSERT INTO `inscripciones_clase` VALUES (1,8,2,'2024-12-15 16:18:59',NULL),(2,8,4,'2024-12-15 16:19:04','2024-12-15 16:19:35'),(3,8,3,'2024-12-15 16:19:07','2024-12-15 16:19:42'),(4,9,4,'2024-12-15 16:24:46',NULL),(5,12,3,'2024-12-15 16:29:36',NULL);
/*!40000 ALTER TABLE `inscripciones_clase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (1,'JavaScript'),(2,'TypeScript'),(3,'Angular 18'),(4,'NodeJS'),(5,'Testing'),(6,'Despliegue');
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `materias_profesores`
--

LOCK TABLES `materias_profesores` WRITE;
/*!40000 ALTER TABLE `materias_profesores` DISABLE KEYS */;
INSERT INTO `materias_profesores` VALUES (2,1),(5,1),(6,1),(2,2),(6,2),(7,2),(2,3),(4,3),(5,3),(7,3),(3,4),(4,4),(6,4),(14,4),(3,5),(4,5),(3,6),(5,6),(7,6);
/*!40000 ALTER TABLE `materias_profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT INTO `mensajes` VALUES (1,8,2,'','Hola Alberto, me gustaría recibir clases contigo. ¿Sería posible los martes de 16:00 a 17:00 online? Gracias.',1,NULL),(2,2,8,'','Por supuesto Lucas. Empezamos el próximo martes. ',0,NULL),(3,9,4,'','Hola Amanda, me gustaría recibir clases contigo mañana. ¿Podrías a partir de las 19:00?',1,NULL),(4,4,9,'','Si!! Por supuesto Marcos, nos vemos a partir de las 19:00 mañana. Saludos. ',0,NULL);
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `opiniones`
--

LOCK TABLES `opiniones` WRITE;
/*!40000 ALTER TABLE `opiniones` DISABLE KEYS */;
INSERT INTO `opiniones` VALUES (8,2,5,'Alberto es muy buen profesor, gracias a él he aprendido a programar. Estoy muy agradecido. ','2024-12-15 16:21:06'),(9,4,5,'Amanda es una excelente profesora. Recomendable al 100%.','2024-12-15 16:25:35'),(12,3,1,'Nefasta profesora, muy desactualizada. ','2024-12-15 16:30:21');
/*!40000 ALTER TABLE `opiniones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES (1,2,10,'{\"address\":\"Sevilla, provincia de Sevilla, España\",\"lat\":37.389416,\"lng\":-5.992558}',622584769,10,1,'Soy profesor de JavaScript, TypeScript y Angular, con pasión por enseñar y construir aplicaciones web modernas. Mi enfoque está en explicar conceptos de forma clara, práctica y aplicable al mundo real. Tengo experiencia en proyectos profesionales y disfruto guiando a los estudiantes hacia buenas prácticas y código limpio. Si quieres aprender desde cero o mejorar tus habilidades, estoy aquí para ayudarte a alcanzar tus metas. ¡Aprender programación puede ser tan emocionante como útil!'),(2,3,15,'{\"address\":\"Barcelona, provincia de Barcelona, España\",\"lat\":41.38723,\"lng\":2.16538}',633142536,24,1,'Soy Sara, profesora especializada en Node.js, testing y despliegue de aplicaciones. Me encanta enseñar cómo crear soluciones backend eficientes, escribir código testeable y gestionar despliegues de manera profesional. Mis clases están orientadas a la práctica, con un enfoque en buenas prácticas y herramientas esenciales para proyectos reales. Si quieres aprender de forma clara y estructurada, estoy aquí para ayudarte a avanzar en tu camino como desarrollador. ¡Hagamos que tus ideas cobren vida!'),(3,4,25,'{\"address\":\"Bilbao, Vizcaya, España\",\"lat\":43.260117,\"lng\":-2.931466}',636547856,54,1,'Soy Amanda, profesora especializada en Angular, Node.js y testing. Me apasiona ayudar a mis alumnos a construir aplicaciones sólidas y eficientes, aplicando buenas prácticas desde el inicio. Mi enfoque está en enseñar no solo el desarrollo, sino también la importancia de escribir código testeable y de calidad. Con experiencia práctica en proyectos reales, mis clases combinan teoría y práctica para que avances con confianza. ¡Estoy aquí para que domines estas tecnologías y lleves tus habilidades al siguiente nivel!'),(4,5,40,'{\"address\":\"Salamanca, provincia de Salamanca, España\",\"lat\":40.964996,\"lng\":-5.66408}',658475963,100,0,NULL),(5,6,15,'{\"address\":\"León, provincia de León, España\",\"lat\":42.599052,\"lng\":-5.570015}',678963214,24,0,NULL),(6,7,15,'{\"address\":\"Plasencia, provincia de Cáceres, España\",\"lat\":40.028877,\"lng\":-6.089041}',654987321,24,0,NULL),(7,14,45,'{\"address\":\"Málaga, provincia de Málaga, España\",\"lat\":36.720476,\"lng\":-4.412525}',658963214,360,0,NULL);
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Usuario3','Administrador','carrascogonzalezarturo@gmail.com','$2a$08$SyVParYyU5NRf4j.tJHLPONNGS9PhfH89eUu/VjtPfct5vTxqV.8y','administrador',NULL,1,NULL,NULL),(2,'Alberto','González Moro','albertogonzmoro@hotmail.com','$2a$08$tbVB0nWHpFgVhaHwvIEyJO93JDEC27.itvbGkh/hEWNhFLkTSYWKu','profesor','/img/profiles/1zspk5zgml4.png',1,NULL,NULL),(3,'Sara','Grigelmo Muñoz','saragrigelmo@gmail.com','$2a$08$KVSuU2ztoUAGFpkzutvKL.WviyUsyNTWfekV8fKNr9JnU3ZOQP/cq','profesor','/img/profiles/uo0y2nxnht.png',1,NULL,NULL),(4,'Amanda','Pérez Sánchez','amandapersan@gmail.com','$2a$08$aCa5b6HVMGruWQL6Z0rapOciequl6EmNfaf1RALdaFZZh/6rPZlNe','profesor','/img/profiles/2p4bpvlb35.png',1,NULL,NULL),(5,'Carmen','Miguel Sánchez','carmigsan@gmail.com','$2a$08$BuDjkJ7oOMhcq4cONEGu8.Zq2BznNen2UT3KDQpimWQahq98iGkk.','profesor','/img/profiles/6998fy2v40g.png',1,NULL,NULL),(6,'Andrés','Ballesteros Muñoz','andresballesteros@gmail.com','$2a$08$ratox7yfMioJH1wxdtlpB.k.La.NfcGzhy/K4Psy/9dg0ASC9Ou9W','profesor','/img/profiles/f7lqww4oj46.png',1,NULL,NULL),(7,'Paula','Retortillo Terrero','paulareter@gmail.com','$2a$08$vn/5IVoZdGbRxjpjKfP0FeaPPRaD.aht5ly06DMvrJ7.FxLTkrEZa','profesor','/img/profiles/xxu1xfy3bgp.png',1,NULL,NULL),(8,'Lucas','Gómez Santos','lucasgomez@gmail.com','$2a$08$zxW49.ESRlHG8rTPEveKxevctHE9Eiv9iIabZpevao9urDU6O441a','alumno','/img/profiles/ay1zkbuwjo.png',1,NULL,NULL),(9,'Marcos','Blanco Pascual','marcosblanco@gmail.com','$2a$08$ZzHpiA6WdmCe/Fzt34w1QuK3PqafBV44onw1z7U1aT82wHXbcZT0S','alumno','/img/profiles/tn60e75f48.png',1,NULL,NULL),(10,'Jesús','Carrasco Lama','jesuscarrasco@gmail.com','$2a$08$NEljt7c0TeeHNnwSWe1vC.IrrLKrKdw8RN/JxrQcIIcX9O4MNEVV6','alumno','/img/profiles/dlnljjtxewj.png',1,NULL,NULL),(11,'Pablo','González González','pablogonz@gmail.com','$2a$08$DqZMvf9OVALefdW04EANe.3WmW2vdpmCs9EXTm3umdyiPX8ywQ1AS','alumno','/img/profiles/nfriyygq6t.png',1,NULL,NULL),(12,'Marina','Sánchez García','marinasanchez@hotmail.com','$2a$08$oIdd3lLWuNwUpDiuO3EbkOHX7DmDyNpnF9C4t7mf/gUwMYSElxrBS','alumno','/img/profiles/dpgjmuke3n4.png',1,NULL,NULL),(13,'Mateo','Hernández Ramos','mateogonz@gmail.com','$2a$08$2/P75ortLW4FQAeOqRa7a.5rcaKmbyamK7TWjD8f3YWCcD5gtItBa','alumno','/img/profiles/yi0w54j6yoc.png',1,NULL,NULL),(14,'Santiago','Hernández Ramos','santihernandez@hotmail.com','$2a$08$oytZh80RHKkMzWvB9Ry4C.ufzCu4949UUDiI4I.AYdlWn49/8zzPC','profesor',NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-15 16:32:40
