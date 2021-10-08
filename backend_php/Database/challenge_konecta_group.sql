-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-10-2021 a las 02:45:45
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `challenge_konecta_group`
--
CREATE DATABASE IF NOT EXISTS `challenge_konecta_group` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `challenge_konecta_group`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `name` varchar(128) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_on`, `updated_on`) VALUES
(00000001, 'Anime', '2021-10-06 08:28:47', NULL),
(00000002, 'Comics', '2021-10-07 08:45:17', NULL),
(00000003, 'Animacion', '2021-10-07 09:30:37', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `category_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `short_text` varchar(200) NOT NULL,
  `large_text` longtext NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `category_id`, `title`, `slug`, `short_text`, `large_text`, `created_on`, `updated_on`) VALUES
(00000001, 00000001, 'Titanes2', 'titanes', 'texto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto texto', 'Texto texto Texto texto', '2021-10-06 08:35:14', '2021-10-07 06:35:23'),
(00000002, 00000002, 'prueba', 'prueba', 'texto', 'textos', '2021-10-07 04:29:42', '2021-10-07 04:12:10');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `name` varchar(128) NOT NULL,
  `email_address` varchar(254) NOT NULL,
  `password` varchar(128) NOT NULL,
  `cell_phone_number` varchar(20) NOT NULL,
  `user_type` enum('0','1') NOT NULL DEFAULT '1' COMMENT 'Type of user 0 -> administrator, 1 -> user',
  `created_on` datetime NOT NULL,
  `updated_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email_address`, `password`, `cell_phone_number`, `user_type`, `created_on`, `updated_on`) VALUES
(00000001, 'Carla', 'carla3@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', '3157894567', '0', '2021-10-06 05:23:03', '2021-10-07 11:45:20');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IXU_slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `UQ_user_email` (`email_address`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
