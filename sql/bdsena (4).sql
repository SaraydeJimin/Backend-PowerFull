-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2025 a las 14:45:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdsena`
--

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`ID_CARRITO`, `ID_USUARIO`, `FECHA_CREACION`, `ACTIVO`) VALUES
(1, 6, '2025-04-18 00:00:00', 1),
(3, 8, '2025-05-19 00:00:00', 1),
(4, 4, '2025-05-19 00:00:00', 1),
(5, 12, '2025-05-26 21:57:10', 1),
(6, 10, '2025-05-27 22:43:32', 1),
(7, 7, '2025-05-27 22:43:45', 1),
(8, 11, '2025-05-27 22:43:45', 1),
(11, 14, '2025-05-27 22:44:17', 1),
(14, 15, '2025-06-03 20:11:23', 1),
(15, 16, '2025-06-03 21:18:12', 1),
(18, 19, '2025-06-03 22:16:59', 1),
(19, 20, '2025-06-07 18:23:59', 1),
(20, 23, '2025-06-08 03:27:26', 1),
(21, 24, '2025-06-08 19:53:02', 1),
(22, 25, '2025-06-09 15:23:03', 1),
(23, 26, '2025-06-09 15:32:50', 1),
(24, 27, '2025-06-09 15:35:34', 1),
(25, 28, '2025-06-09 15:38:14', 1),
(26, 29, '2025-06-09 15:41:50', 1),
(27, 30, '2025-06-10 19:40:33', 1),
(28, 31, '2025-06-10 19:42:27', 1),
(29, 32, '2025-06-10 19:43:56', 1),
(31, 34, '2025-06-11 21:46:07', 1);

--
-- Volcado de datos para la tabla `catalogo`
--

INSERT INTO `catalogo` (`ID_CATALOGO`, `NOMBRE`, `DESCRIPCION`) VALUES
(1, 'Bebidas', 'Catálogo de PowerFull Market'),
(2, 'Cereales', 'Catálogo de PowerFull Market'),
(3, 'Chocolates y Bombones', 'Catálogo de PowerFull Market'),
(4, 'Enlatados y Conservas', 'Catálogo de PowerFull Market'),
(5, 'Esparcibles', 'Catálogo de PowerFull Market'),
(6, 'Granos', 'Catálogo de PowerFull Market'),
(7, 'Lácteos ', 'Catálogo de PowerFull Market'),
(8, 'Patas y Quinoas', 'Catálogo de PowerFull Market'),
(9, 'Salsas y Aderezos', 'Catálogo de PowerFull Market'),
(10, 'Snacks', 'Catálogo de PowerFull Market');

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`ID_DETALLE_PEDIDO`, `ID_PEDIDO`, `ID_PRODUCTO`, `CANTIDAD`, `PRECIO_TOTAL`) VALUES
(13, 32, 6, 5, 95000),
(14, 33, 6, 26, 494000),
(18, 36, 1, 3, 15000),
(24, 37, 1, 21, 403200),
(25, 38, 1, 21, 403200),
(26, 39, 1, 20, 384000),
(27, 40, 1, 20, 384000),
(28, 41, 9, 1, 4500),
(30, 42, 1, 3, 15000),
(36, 43, 9, 1, 4500),
(40, 47, 9, 1, 4500),
(42, 48, 9, 5, 22500),
(43, 49, 9, 5, 22500),
(44, 50, 6, 8, 152000),
(45, 51, 9, 85, 382500),
(46, 51, 1, 1, 19200),
(47, 51, 7, 3, 8700),
(48, 52, 7, 1, 2900),
(49, 52, 6, 1, 19000),
(50, 52, 1, 1, 19200),
(51, 53, 1, 3, 57600),
(52, 53, 6, 4, 76000),
(53, 54, 7, 5, 14500),
(54, 55, 6, 5, 95000),
(55, 56, 1, 1, 19200),
(56, 56, 6, 1, 19000),
(57, 57, 1, 4, 76800),
(58, 57, 6, 8, 152000),
(59, 57, 7, 5, 14500),
(60, 57, 9, 9, 40500),
(61, 57, 19, 5, 17500),
(62, 58, 1, 5, 96000),
(65, 60, 34, 1, 2900),
(66, 60, 31, 1, 3000),
(67, 60, 48, 1, 18900),
(68, 60, 50, 1, 35500);

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`ID_PAGO`, `ID_USUARIO`, `METODO_PAGO`, `FECHA_PAGO`, `nombre_tarjeta`, `numero_tarjeta`, `fecha_expedicion`) VALUES
(1, 8, 'tarjeta', '2025-05-26 20:28:14', NULL, NULL, NULL),
(2, 4, 'tarjeta', '2025-05-27 14:36:49', NULL, NULL, NULL),
(3, 12, 'tarjeta', '2025-05-27 15:44:32', 'Miguel Perdomo', '152846766253162', '0000-00-00'),
(4, 4, 'tarjeta', '2025-05-27 20:12:57', 'Maria Torres', '4728627356752', '2025-04-11'),
(5, 4, 'tarjeta', '2025-05-27 20:14:28', 'MARIANA GUZMAN', '9328368127461347', '2025-05-28'),
(6, 4, 'tarjeta', '2025-05-27 20:38:08', 'Juan Pérez', '1234567812345678', '2025-12-01'),
(7, 4, 'tarjeta', '2025-05-27 20:56:02', 'Juan Pérez', '1234567812345678', '2025-12-01'),
(11, 8, 'tarjeta', '2025-05-27 21:27:11', 'Saray Lopez', '1234567890987654', '2025-01-08'),
(12, 8, 'tarjeta', '2025-05-27 22:29:18', 'Saray Lopez', '1234567890987654', '2025-05-08'),
(13, 8, 'tarjeta', '2025-05-29 16:41:41', 'Saray Lopez', '1234567890987654', '2025-05-21'),
(14, 8, 'tarjeta', '2025-06-03 19:48:39', 'Saray Lopez', '1234567890987654', '2024-12-06'),
(15, 16, 'tarjeta', '2025-06-03 21:22:51', 'Morita Azul', '1234567890987654', '2025-03-05'),
(16, 19, 'tarjeta', '2025-06-05 21:04:53', 'Julieth Florez', '1234567890987654', '2024-11-01'),
(17, 4, 'tarjeta', '2025-05-18 05:00:00', 'Juan Pérez', '1234567812345678', '2025-12-01'),
(18, 4, 'tarjeta', '2025-05-18 05:00:00', 'Juan Pérez', '1234567812345678', '2025-12-01'),
(19, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890987654', '2025-06-13'),
(20, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890987654', '2025-01-10'),
(21, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890987654', '2024-11-06'),
(22, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890987654', '2025-01-10'),
(23, 4, 'tarjeta', '2025-06-06 05:00:00', 'Juan Pérez', '1234567890123456', '2024-06-01'),
(24, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890987654', '2025-01-18'),
(25, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890987654', '2024-11-02'),
(26, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890009876', '2024-09-04'),
(27, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890987654', '2024-09-13'),
(28, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890098765', '2024-04-04'),
(29, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890098765', '2024-04-04'),
(30, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '12567890987654', '2024-09-04'),
(31, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julieth Florez', '1234567890987654', '2024-12-03'),
(32, 19, 'tarjeta', '2025-06-06 05:00:00', 'Julietha Florez', '1234567890987654', '2024-12-12'),
(33, 20, 'tarjeta', '2025-06-07 05:00:00', 'Juan Bachata', '1234567890098765', '2025-01-02'),
(34, 15, 'tarjeta', '2025-06-08 05:00:00', 'Kim Namjoon', '1234567890987654', '2024-09-05'),
(35, 23, 'tarjeta', '2025-06-08 05:00:00', 'bebesongo', '111112313424324', '2025-06-03'),
(36, 23, 'tarjeta', '2025-06-08 05:00:00', 'Bebe Songo', '1234567890987654', '2024-10-03'),
(37, 23, 'tarjeta', '2025-06-08 05:00:00', 'Bebebsongo', '1234567890987654', '2025-03-13'),
(38, 24, 'tarjeta', '2025-06-09 05:00:00', 'Armando Mnedoza', '1234567890987654', '2024-07-04'),
(39, 8, 'tarjeta', '2025-06-10 05:00:00', 'Saray Lopez', '1234555555555555', '2024-04-04'),
(40, 8, 'tarjeta', '2025-06-10 05:00:00', 'Saray Lopez', '1234555555555555', '2024-04-04'),
(42, 34, 'tarjeta', '2025-06-11 05:00:00', 'shara', '3243452452465656', '2025-06-11');

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`ID_PEDIDO`, `ID_USUARIO`, `TOTAL`, `FECHA`, `estado`, `ID_PAGO`) VALUES
(32, 8, 95000, '2025-06-03 14:48:39', 'enviado', 14),
(33, 16, 501400, '2025-06-03 16:22:51', 'enviado', 15),
(36, 4, 92000, '2025-06-05 17:55:09', 'enviado', 18),
(37, 19, 403200, '2025-06-05 23:04:48', 'enviado', 19),
(38, 19, 403200, '2025-06-05 23:20:35', 'enviado', 20),
(39, 19, 384000, '2025-06-06 00:24:57', 'enviado', 21),
(40, 19, 384000, '2025-06-06 00:31:21', 'enviado', 22),
(41, 19, 254500, '2025-06-06 01:21:22', 'enviado', 24),
(42, 4, 92000, '2025-06-06 01:25:49', 'enviado', 23),
(43, 19, 254500, '2025-06-06 01:35:49', 'procesando', 25),
(47, 19, 254500, '2025-06-06 03:08:22', 'enviado', 29),
(48, 19, 22500, '2025-06-06 03:09:38', 'procesando', 30),
(49, 19, 22500, '2025-06-06 03:12:10', 'pendiente', 31),
(50, 19, 152000, '2025-06-06 09:30:48', 'pendiente', 32),
(51, 20, 410400, '2025-06-07 13:28:00', 'pendiente', 33),
(52, 15, 41100, '2025-06-07 20:57:43', 'enviado', 34),
(53, 23, 133600, '2025-06-07 22:33:31', 'pendiente', 35),
(54, 23, 14500, '2025-06-08 00:19:02', 'pendiente', 36),
(55, 23, 95000, '2025-06-08 00:26:04', 'procesando', 37),
(56, 24, 38200, '2025-06-09 04:45:59', 'procesando', 38),
(57, 8, 301300, '2025-06-10 14:56:38', 'pendiente', 39),
(58, 8, 96000, '2025-06-10 14:58:12', 'pendiente', 40),
(60, 34, 60300, '2025-06-11 16:48:53', 'pendiente', 42);

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID_PRODUCTO`, `ID_CATALOGO`, `NOMBRE`, `DESCRIPCION`, `PRECIO`, `STOCK`, `IMAGEN`) VALUES
(1, 3, 'Chocolatina Jet Leche x 24 unds x 6g c/u', 'La Chocolatina Jet Leche es una deliciosa combinación de chocolate y leche que te deleitará en cada bocado. Con su tamaño práctico de 6g cada una, estas chocolatinas son perfectas para llevar contigo a todas partes, ya sea en el trabajo, la escuela o de paseo. Estas chocolatinas Jet Leche son ideale', 19200, 283, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1746045199/products/nmje6gidt64ejtvtp9sf.jpg'),
(6, 1, ' Coca-Cola Original en Lata Pequeña (220 ml)', 'Disfruta del sabor inconfundible de Coca-Cola en su presentación más práctica. Esta lata pequeña de 220 ml es perfecta para calmar la sed, refrescarte al instante y llevar contigo a donde quieras. Con su sabor clásico y burbujeante, sigue siendo la favorita de generaciones.', 19000, 169, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1745596396/products/fvybfdgcvr5uvgcfj7zp.jpg'),
(7, 2, 'Arroz Diana Blanco 500g', 'El arroz Diana es un producto de calidad, reconocido por su sabor y su variedad, que se puede encontrar fácilmente en Usme, Bogotá. Es una opción popular para las familias colombianas que buscan arroz de buen sabor y calidad.', 2900, 285, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1746045459/products/r0ex0hhtkjfrkkjtkqvt.jpg'),
(9, 4, 'Atún Zenú Lata x160gr', 'El atún es rico en proteínas, omega-3, vitaminas A, D y del grupo B, así como minerales como fósforo y magnesio. ', 4500, 558, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1746046460/products/mtpn03mwr5hi1wf5ng6k.png'),
(19, 6, 'Frijol Cargamanto Rojo 460gr - El trece', 'Los frijoles son una fuente de proteínas, fibra, vitaminas y minerales, siendo un alimento muy nutritivo.', 3500, 84, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1746046862/products/kmpdvxq7wez1mnzn2wz1.jpg'),
(31, 1, 'Pepsi', 'Disfruta del sabor que te ofrece nuestra deliciosa gaseosa pepsi', 3000, 98, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749675591/products/vcua0sxouz98w4hxamr7.webp'),
(32, 1, 'Postobon Manzana', 'Disfruta del increible sabor de la manzana con gas', 7500, 250, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749675931/products/hwsyjot4qsmnibqnxkgz.webp'),
(33, 1, 'Sprite', 'Disfruta del inconfundible sabor de nuestra deliciosa y provocativa gaseosa sprite', 3000, 70, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749676048/products/jqoldpk0qwtlsrc4b9cr.webp'),
(34, 1, 'Postobon manzana en lata', 'Llega postobon con su nueva e inconfundible manzana ahora en lata, consiguela aqui y ahora al mejor precio', 2900, 209, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749676180/products/nnj2tjcvvbsbd1yonfuh.webp'),
(35, 1, 'Postobon uva', 'Sabor a uva consiguela ahora con el descuento y economia que necesitas a la puerta de tu casa', 8000, 50, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749676279/products/d4a4t286luj6o0sqjglq.webp'),
(36, 1, 'Uva Postobon mini', 'Uva Postobon is a carbonated soft drink with a grape flavor, produced by Postobon, a Colombian beverage company.', 2500, 100, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749676458/products/r2ahhpqvjeqbisgilosm.webp'),
(37, 1, 'Colombiana', 'La gaseosa colombiana es una bebida carbonatada popular en Colombia, disponible en diferentes sabores como manzana, uva y cola.', 8000, 200, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749676563/products/elcnw1ahpydrvslc1hjk.webp'),
(38, 1, 'Colombiana mini', 'Colcafé Coffee Cream Cremoso es una opción para quienes buscan una crema no láctea para acompañar sus bebidas calientes. Sin azúcar añadida y sin lactosa, este producto está diseñado para aportar cuerpo y sabor a cada taza de café, sin alterar su perfil original.', 2000, 200, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749676701/products/qn0mmovvlmsarllv3n1c.webp'),
(39, 2, 'Cereal Tosh Granola Avena y Pasas x 300g', 'Esta deliciosa granola es perfecta para desayunos, media mañana o para después de entrenar. Tiene antioxidantes naturales que acompañados de hábitos saludables benefician tu organismo.', 13300, 100, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749676815/products/axu9lapciushpuz6yolq.webp'),
(40, 2, 'Cereal Tosh Granola Crunchy Chocolate x 300g', 'Es una deliciosa alternativa para tu desayuno, te ayudará a que comiences el día con toda la energía. Disfruta de su sabor de chocolate y texturas, mientras le aportas fibra a tu cuerpo.', 18800, 50, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749676879/products/zlazfps6h9vnjz2qgcgr.webp'),
(41, 2, 'Chocolisto Cereal x 370g', 'Además de su excelente sabor, ¡Chocolisto es muy nutritivo! Contiene cuatro aportes al crecimiento que son fundamentales para el desarrollo de tus hijos, ahora en cereal.', 18900, 70, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749676986/products/lnmdpqrxtairppfuwhoo.webp'),
(42, 2, 'Arroz Diana Premium x 2.500g', 'El arroz Diana Premium es 5 veces seleccionado antes de ser empacado, con granos más grandes, blancos y enteros.  Preparar un arroz suelto y que rinda se podrá lograr para sorprender a la familia todos los días.', 20800, 38, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677048/products/ndhxi0r1mk5rijlcbmkk.webp'),
(43, 2, 'Cereal Tosh Granola Crunchy Yogurt Griego x 300g', 'Esta deliciosa granola está compuesta por frutos del bosque y base de yogurt griego, es la perfecta para tus desayunos, media mañana de tus hijos o después de entrenar. Además de tener un alto contenido de fibra, es una buena fuente de proteína que fortalecerá tu organismo. Por ser deliciosa y nutri', 22400, 34, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677122/products/ttriwzdukbjt074stwrm.webp'),
(44, 2, 'Arroz Castellano blanco x 2.500g', 'Un arroz delicioso y 100 % natural. Elaborado con una semilla exclusiva y un cuidadoso proceso, que le permite conservar toda la fibra natural del grano, para un arroz muy blanco, con una sorprendente cocción y desempeño superior.  Es integral de grano medio y el tiempo promedio para su cocción es d', 32550, 45, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677473/products/jg4lzrpcbiumg8aieioh.webp'),
(45, 2, 'Granola Tosh Crunchy Frutos Rojos x 300g', 'Esta deliciosa granola con trozos de fresa es la perfecta para tus desayunos, media mañana de tus hijos o después de entrenar. Además de tener un alto contenido de fibra, es una buena fuente de proteína que fortalecerá tu organismo. Por ser deliciosa y nutritiva, sabemos que a ti y a tu familia ¡les', 17900, 56, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677552/products/zcxlk5widnrslq6hdunm.webp'),
(46, 2, 'Arroz Diana Coco x 1.000g', 'Disfrutar y sorprender a la familia con un delicioso sabor a coco es posible con el Arroz Diana Coco, que permite realizar este tradicional arroz solo adicionando azúcar y sal.  Es fácil y práctico, sin sabores ni colorantes artificiales.', 8600, 76, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677617/products/tovphr2f8beduwwqzbg5.webp'),
(47, 2, 'Cereal Tosh Granola Crunchy Almendras x 300g', 'Una deliciosa alternativa para el desayuno para que comiences el día con toda la energía. Disfruta de su sabor y texturas únicas, mientras le aportas fibra a tu cuerpo para su correcto funcionamiento.', 17000, 34, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677676/products/zeflhbbmu7thlnnvmse1.webp'),
(48, 3, 'Jet Fresas con Crema x 6 UN', 'El Jet Fresas con Crema combina chocolate con leche y un relleno cremoso con sabor a fresas. Cada bocado ofrece una mezcla de texturas y sabores para disfrutar en cualquier momento del día. Su presentación en caja con 6 unidades facilita su consumo y almacenamiento.', 18900, 12, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677775/products/huxtsnyfzlzktfb55ltw.webp'),
(49, 3, 'Chocolatina Jumbo Brownie x 24 unds x 18g c/u', 'La Jumbo brownie tiene una especial combinación de sabores e ingredientes que fueron mezclados para hacer de los días algo mucho mejor.  El tradicional sabor del brownie con el dulce sabor del chocolate Jumbo se unieron para disfrutarlos juntos.  ¡Ideal para llevar a todas partes!', 40900, 789, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677825/products/eksv4vqivi2qjkeeitg4.webp'),
(50, 3, 'Chocolatina Jumbo Maní x 24 unds x 17gr c/u', 'La caja de chocolatinas Jumbo Maní contiene 24 unidades individuales de 17 gramos cada una. Estas chocolatinas combinan cobertura de chocolate y trozos de maní.  Su formato en porciones individuales facilita su almacenamiento, transporte y consumo en diferentes momentos del día.', 35500, 341, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677881/products/bzbs5xnwrgi9zvbe3gvu.webp'),
(51, 3, 'Chocolatina Jet Cookies & Cream x 12 unds x 11g c/u', 'La deliciosa Chocolatina Jet Cookies & Cream es perfecta para satisfacer tus antojos de dulces.', 26500, 54, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677943/products/lisof0xwheghnbqrrmtr.webp'),
(52, 3, 'Chocolatina Jet Mini surtida x 24 unds x 6g c/u', 'Esta chocolatina viene con sabor a chocolate de leche, arequipe, manzana y mora. Se trata de un pequeño y dulce gusto que te puedes dar en cualquier momento del día.', 18900, 34, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749677992/products/mjjkuztyldb7y0cmivjz.webp'),
(53, 3, 'Chocolatina Lyne x 18 Un x 6gr', '¿De qué tamaño es la felicidad? Nadie lo sabe, pero si nos preguntaran cuál sería la medida, no cabe duda que sería una barrita de chocolatina Lyne. Es increíble cómo algo tan pequeño y delicado puede darte felicidad y bienestar para ti y los tuyos.', 16900, 65, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749678104/products/tpszd2wdx5qsy1max1p0.webp'),
(54, 3, 'Chocolatina BurbuJet Cruji Vainilla x 6 unds x 50g c/u', 'Disfruta del clásico y delicioso sabor del chocolate Jet con las divertidas burbujas de crema de vainilla y arroz crujiente que ahora podrás probar en esta presentación. Alegra aquellos momentos familiares con esta nueva y suculenta combinación de chocolate que sin duda les va a encantar a todos.', 33900, 54, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749678209/products/sahbfgwrgsyncjdz5swl.webp'),
(55, 10, 'Snack Masticable Pollo x 5unds', 'Deliciosos snacks de pollo que mantienen a tu mascota feliz y saludable. Ideal para premiar su buen comportamiento  - Contiene: Snack masticable x 5 unds - Sabor: Pechuga de pollo - Marca: Dingo', 14850, 32, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749678784/products/fgvb7hfo0gfknagylxpw.webp'),
(56, 10, 'Barra de Cereal Tosh Fresa x 6 unds x 23g c/u', 'Cuidarse con Tosh es muy fácil: estas deliciosas barras nutren el cuerpo y deleitan el paladar con deliciosos frutos secos y trozos de fresa. Es la forma ideal para cuidar la alimentación de toda familia debido a que es un buen acompañante para los días de trabajo y además, es perfecta para alimenta', 12900, 32, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749678848/products/yku7vb43k2ogpvugsovz.webp'),
(57, 10, 'Maní Kraks Limón Plegadiza x 32g c/u', 'El Maní Kraks Limón Plegadiza x 32g c/u de La Especial combina un toque ácido con la textura crocante del maní horneado. Su formato práctico permite llevarlo a cualquier parte y disfrutarlo cuando se necesita un pasabocas con personalidad. Ideal para acompañar momentos de hambre entre comidas, para ', 23900, 54, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749678930/products/ui9hempbuo6reylaiimf.webp'),
(58, 10, 'La Especial Maní Kraks Limón x 132g', 'El Maní Kraks Limón Plegadiza x 32g c/u de La Especial combina un toque ácido con la textura crocante del maní horneado. Su formato práctico permite llevarlo a cualquier parte y disfrutarlo cuando se necesita un pasabocas con personalidad. Ideal para acompañar momentos de hambre entre comidas, para ', 5900, 76, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749678987/products/zomoqu3unkqp0hqsfbrn.webp'),
(59, 10, 'La Especial Maní Mix Yogurt x 12 unds x 35g c/u', 'La Especial Mezcla de Yogurt: es una edición especial para demostrar ese amor a las personas especiales.  ¿Qué contiene la mezcla?  Maní kraks, arroz recubierto de yogurt, galletas Minichips, arándanos y maní sal.  ¡Edición limitada!', 35900, 87, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679037/products/qquav2awsozfjk1dpsxh.webp'),
(60, 9, 'Salsa BBQ Artesanal Fruco x400g', 'Darle a las preparaciones un rico sabor ahumado es posible con la sala BBQ artesanal de Fruco que es especita, balanceada entre lo picante y dulce, baja en sodio e ideal para usar en la cocina o la mesa.', 13950, 54, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679095/products/hpjvfjcxeu0uieehuu0t.webp'),
(61, 9, 'Sazón Completa Badia x 99.2g', 'La sazón completa de Badia es la perfecta combinación de especias. Contiene todo lo que se necesita para agregar sabor a un amplio rango de platos de sal. En cada frasco se han combinado armoniosamente sal, pimienta, comino, ajo y cebolla.  Ideal para utilizar como adobo fundamental en todo tipo de ', 15900, 100, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679137/products/k7tiumrrfy9adc651bri.webp'),
(62, 9, 'Aceite de Oliva extra virgen Monticello x 1.000ml', 'Añade este aceite extra virgen de origen mediterráneo a tus preparaciones como ensaladas o pastas para darles un toque gourmet, fresco y saludable, el aceite de oliva es uno de los más usados en la gastronomía por su sabor y también destaca por las múltiples propiedades que tiene para la salud.', 103000, 65, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679180/products/pjhwpdv4ijumh2ckbtpy.webp'),
(63, 9, 'Aceite Gourmet® Familia multiusos x 900ml', 'Aceite Gourmet® Familia multiusos x 900ml', 21700, 34, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679230/products/zbfvhh0q1mncipgnu6vx.webp'),
(64, 9, 'Pimentón Ahumado Badia x 56.7g', 'El pimentón conocido también como paprika, además de dar un delicioso sabor da un toque de color atractivo y apetitoso a las comidas. Es un ingrediente indispensable en los embutidos y es gustoso en preparaciones con pollo y definitivo en el gulasch.', 16800, 5, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679280/products/px5uvpv3qhadvw3fsvth.webp'),
(65, 8, 'Surtido Doria Clásica', 'Lleva todo el sabor de pastas Doria a tu mesa con esta nueva combinación creada para que surtas tu despensa y puedas disfrutar de diferentes preparaciones en familia, las pastas contienen hidratos de carbono que aportan energía al cuerpo de forma gradual.', 13500, 5, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679335/products/redruwripwlspgrgk2u9.webp'),
(66, 8, 'Penne Rigate Monticello x 1.000g', 'Penne Rigate Monticello es la opción perfecta para aquellos amantes de la pasta que buscan una experiencia culinaria auténtica.  Esta pasta se destaca por su forma cilíndrica con estrías en el exterior, que permite que la salsa se adhiera de manera perfecta a cada pieza, brindando un sabor más inten', 14600, 23, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679382/products/c4igrxocuiszbllu8tqg.webp'),
(67, 8, 'Macarrones con Queso DORIA x630g 3Pack', 'Disfruta del sabor de un macarrón pequeño con una deliciosa salsa de queso incluida en el empaque. Prepararlo es muy fácil, sólo necesita leche y no hace falta agregarles mantequilla. Su forma hueca retendrá la salsa, haciendo de este plato una deliciosa opción para cualquier momento. Disfrútalo sol', 14200, 32, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679441/products/hotowzmai069ka1xiq1p.webp'),
(68, 8, 'Quinua Doria en grano x 300g', 'La Quinua en grano es muy fácil de preparar, se cocina igual que el arroz y es muy versátil porque se puede mezclar con vegetales, carnes, consumir sola y mucho más. ¡Como se quiera disfrutar!', 11300, 23, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679485/products/u7pewjdffqjbjvq3ykuy.webp'),
(69, 8, 'Tornillo DORIA Verduras x 500g', 'Pasta en forma de tornillos con sabor a verduras, ideal para preparaciones de acompañamientos como ensaladas frías, calientes o platos fuertes con una exquisita salsa. Los tornillos Doria están fortificados con Nutrivit que contribuye a una buena alimentación.', 5200, 23, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679557/products/ituz5tgutdyveiey3aji.webp'),
(70, 7, 'Alpin surtido x 6 unds x 200ml c/u', 'Alpin de Alpina es una deliciosa bebida láctea saborizada que viene en diferentes sabores. Está enriquecida con vitaminas y no tiene conservantes.  Es un producto larga vida, por lo que no requiere refrigeración, haciéndolo un producto práctico y delicioso para llevar a cualquier lugar.', 22050, 12, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679655/products/i3fi8n3rq3uomtykhtkr.webp'),
(71, 7, 'Bon Yurt Alpina Zucaritas x 4 unds x 170g c/u', 'Bon Yurt Alpina Zucaritas x 4 unds x 170g c/u', 19500, 45, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679733/products/kldc52gbzzxmqwer7guj.webp'),
(72, 7, 'Avena Algarra Canela x 6 unds x 200ml c/u', 'Avena Algarra es una bebida nutritiva fuente de proteínas, calcio, fosforo, deliciosa y lista para consumir. Avena Algarra es un producto para ser consumido por toda la familia y de fácil digestión.  Alimento preparado con leche entera y avena, ultra alta temperatura UAT (UHT) que no necesita refrig', 14600, 23, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679777/products/s2g1gc5wbu6xlviescmf.webp'),
(73, 7, 'Avena Alpina x 4 unds x 250g c/u', 'Esta bebida con leche y avena te aporta algunos nutrientes como el calcio (componente importante para huesos, dientes y otras funciones del organismo) y proteína de alta calidad (muy buena para el crecimiento y mantenimiento de músculos y tejidos corporales).  Por las características de su empaque n', 14300, 45, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679855/products/tc7gsjnd2yfgbxye5jhy.webp'),
(74, 7, 'Yox surtidos x 8 unds x 100g c/u', 'Alimenta bien a tu familia con este alimento lácteo que contiene Vitamina C y Zinc, estos componentes contribuyen a reforzar el sistema de defensas y además Yox contiene miles de probióticos que ayudan al bienestar del cuerpo.  Cuando tomas uno, te das cuenta de lo suave, ligero y delicioso que es. ', 17090, 34, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679903/products/jgnckueoenyv18qm4g4w.webp'),
(75, 4, 'Pollo Zenú con Aderezo de Mayonesa x 160g', 'Esta mezcla de pechuga de pollo con aderezo de mayonesa, es una deliciosa combinación para disfrutar de muchas maneras como preparar sánduches, consumir con tostadas, galletas o pan. Su textura suave permite esparcirlo con facilidad.  Al ser 100% pechuga de pollo y no contener conservantes es un bue', 15800, 65, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749679997/products/u5jjirytohyc4wlftqgd.webp'),
(76, 4, 'Fríjoles Antioqueños Zenú x 310g', 'Fríjoles cargamanto rojos. Disfruta del delicioso sabor de este plato típico Colombiano. Este producto es buena fuente de fibra y hierro.', 9400, 54, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749680053/products/a9zoz4093osha5lixktp.webp'),
(77, 4, 'Champiñones Tajados Zenú x 230g', '¿Qué mejor complemento que unos deliciosos champiñones tajados a la hora de preparar tus comidas favoritas? Comparte con tu familia una deliciosa preparación acompañada con los beneficios de estos champiñones que son naturalmente libres de grasa, sin conservantes y vienen listos para que los uses en', 8300, 100, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749680113/products/hcnxaevbj8v1xzpznhzj.webp'),
(78, 4, 'Lomo de atún Zenú en agua x 3 unds x 80g c/u', 'Los nuevos lomos de atún Zenú serán un delicioso ingrediente y acompañante ideal para hacer las más ricas recetas en casa con toda la calidad y sabor Zenú.', 15500, 43, 'https://res.cloudinary.com/dhfazdlqf/image/upload/v1749680166/products/zpcjtvnglrpmorfyp9j6.webp');

--
-- Volcado de datos para la tabla `producto_carrito`
--

INSERT INTO `producto_carrito` (`ID_PRODUCTO_CARRITO`, `ID_CARRITO`, `ID_PRODUCTO`, `CANTIDAD`) VALUES
(2, 1, 7, 4),
(46, 11, 7, 1),
(47, 11, 1, 32),
(50, 4, 7, 3),
(84, 3, 9, 8);

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`ID_ROL`, `NOMBRE`) VALUES
(1, 'Admin'),
(2, 'Usuario');

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_USUARIO`, `ID_ROL`, `DOCUMENTO`, `NOMBRE`, `APELLIDO`, `EMAIL`, `CONTRASEÑA`, `DIRECCION`, `TELEFONO`) VALUES
(1, 1, 1140845673, 'Micaela', 'Guzman', 'micaela@gmail.com', '$2b$10$uWGxXY.PdF48hq1CTO7DL.2e1pGrvjiC996ufhTxYCA2r2sgNVkdy', 'Cra12c#53-32sur', '3204567898'),
(4, 2, 1033456783, 'Maria', 'Gutierrez', 'maria@gmail.com', '$2b$10$gRQ0ldFIyVzbHSFt4PZ1feOrG8ZY0EWthn6WlbBZr1Crmhd9t96wW', 'Cra12c#53-32sur', '3024743835'),
(6, 2, 1000453672, 'Juan ', 'Gonzalez', 'jeypi@gmail.com', '$2b$10$d6gaZ4DiS4Yaf2vc6zVQeuNTvNPqYkne33dxw0Ls.MhO/5ZkJOHT2', 'Calle 12', '3179033219'),
(7, 2, 504678329, 'Heiver ', 'Cuesta', 'heiver@gmail.com', '$2b$10$V.yDQGCdZ8uN3IUuI.UNvO9.UocJQXv7G36Y6DkWoQyC.qS9mylIq', 'Calle 15 a norte', '3041961216'),
(8, 2, 1140914398, 'Saray Katherin', 'Lopez', 'saray@gmail.com', '$2b$10$BmulbMAhqVKUWtYlDStfvOvT.4EJinETUUj42d/tLpzqNhNW47y0O', 'calle 13 sur', '3330694483'),
(10, 2, 509874756, 'Daniela', 'Maldonado', 'daniela@gmail.com', '$2b$10$YgvYfiL3kTA7lEu0BJgxfeyoEI.cXMOokynsAzOz0QY17UA9GvW4q', 'calle 13 a norte', '3052674468'),
(11, 2, 12345678, 'Juan', 'Pérez', 'juan.perez@example.com', '$2b$10$6lOeuDlFghMOPybzxF6mm.4WNzMtUBDrzw1DTALjNDMUy97kxnFhC', 'Calle Falsa 123', '3105819035'),
(12, 2, 1033465789, 'Miguelito', 'Perro', 'miguelito@gmail.com', '$2b$10$jphUvrxIh7c1APJefPBMjexnM2OV0PjrIrBWoQa1qoDc4QlP3oZM2', 'calle 20', '3239111338'),
(14, 2, 1234567890, 'Prueba', 'Prueba', 'prueba@gmail.com', '$2b$10$mYF4J9Tjqz.3CUjEzntjbeWjgNpCW3Snf6/.Rb5vDJ2nLTHLtOWMq', 'calle falsa', '3331766668'),
(15, 2, 1033847592, 'Namjoon', 'Kim', 'namjoonie@gmail.com', '$2b$10$fw8SuWO4O0vyG5yRIXP/SOFKvtZSwX7uWhbQHQxUOAkzV5HpUlIdi', 'Calle 120 sur', '3115606829'),
(16, 2, 1022345776, 'moritaa', 'azul', 'morita@gmail.com', '$2b$10$621m3vSNxApdZcLoodzeROJBrmdtCST9CD7zNqOSB6XwTEibFaeB.', 'calle falsa', '3047318297'),
(19, 2, 578687483, 'Julietha', 'Florez', 'juliethcita@gmail.com', '$2b$10$5Dw2uvl82maOmSky6EigeuFlfh7fM.cbPG2a9rgAeK71je3yfd4aK', 'calle 40 sur', '3101046006'),
(20, 2, 1120345896, 'Juan', 'Bachata', 'juanbachata@gmail.com', '$2b$10$DfekltOl5pUbgz33eLaCi.ikB5pPWgetnLaL8vyHzU7hPXigzMd.m', 'calle 12 norte', '3119083746'),
(23, 2, 2345678, 'bebesongo', 'pato', 'pecueca@outlook.es', '$2b$10$RTFo9ddKfGQmvYRtXatwmeVZkql/HfN6vQy0f562jBkZcHpQJTgU.', 'ruta 69 radiador springs', '3194520419'),
(24, 2, 475869843, 'Armando', 'Mendoza', 'armandofrente@outlook.es', '$2b$10$GVgMiTZCoJa32Lel7.upzeAox1eVzOwF6EfrakoR3GNMICDM2FplC', 'calle 345653', '3105768498'),
(25, 2, 1147896784, 'Kan', 'Jihan', 'kanji@gmail.com', '$2b$10$nXwQN5yxuoMuo3vk3lB0e.v.ct.QeBsSg0sRj6G1CGVlQRc3EZSJa', 'Calle 112 a norte 34', '3948576372'),
(26, 2, 5678493, 'Min', 'Joo', 'minjoo@gmail.com', '$2b$10$HC8llIRroJXuwfpooRFMo.vVFnC.rDaTZXz.mS7poZwvRdt7uxrOG', 'calle 12 a norte 34', '3024567834'),
(27, 2, 34567643, 'Park', 'Min', 'parkmin@gmail.com', '$2b$10$qtiv0gxJ5W6YNbblB3lDt.4o4MH7RY8ORgZEwqaFXXoaWOHg2pDHW', 'Calle 24 norte 45', '3057686453'),
(28, 2, 57489372, 'Park', 'Min', 'parkminn@gmail.com', '$2b$10$DE8XDXAIUaag6QxbEmmi3.fxULX6dwv.ZnjIbusldjZVxlNjLIXvG', 'Calle 24 norte 45', '3057688453'),
(29, 2, 57489373, 'Park', 'Min', 'parkminnn@gmail.com', '$2b$10$GXhl8oc5MiS74emnunLUVeXOjqolQ7zPFd8lOU7sjEuUdNpdtG4fy', 'Calle 24 norte 45', '3057688457'),
(30, 2, 1033698982, 'Parki', 'Jimin', 'parkijimin@gmail.com', '$2b$10$/rO9RiSgVBCHcBiJpMMI8.f9Sjh0UrLNJMFMz579WoDr/du5HkPTq', 'calle 20', '3049854325'),
(31, 2, 57689843, 'Jeon', 'Jungkook', 'jeon@gmail.com', '$2b$10$bAqsp/C.vON2VBDZfZLffeMPIda9T2nBAnCyDp3NJXQQ2oEoGB8Y2', 'calle 30', '3117689053'),
(32, 2, 57689845, 'Jeon', 'Jungkook', 'jeonjun@gmail.com', '$2b$10$hkzg40IU/XnOIFEqFVlEaebFiR8uqdiCGMOdQkTC3wh/5F1hYCEEK', 'calle 30', '3117689057'),
(34, 2, 2147483647, 'Shara ', 'Duran', 'shara@gmail.com', '$2b$10$xMXqboLL5Dq1GydcWRIEcuZ4nmKiNQkPU7OH/dCMvFNtdO7IJYzt.', 'calle 12 norte', '3029487392');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
