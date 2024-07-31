-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2024 at 05:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `distance calculator`
--

-- --------------------------------------------------------

--
-- Table structure for table `distance calculator`
--

CREATE TABLE `distance calculator` (
  `lat1` decimal(7,7) NOT NULL,
  `lng1` decimal(10,10) NOT NULL,
  `lat2` decimal(9,9) NOT NULL,
  `lng2` decimal(8,8) NOT NULL,
  `distance` decimal(10,2) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `cart` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `distance calculator`
--

INSERT INTO `distance calculator` (`lat1`, `lng1`, `lat2`, `lng2`, `distance`, `price`, `cart`) VALUES
(0.0000000, 0.0000000000, 0.000000000, 0.00000000, 100.00, 10.00, 0),
(0.0000000, 0.0000000000, 0.000000000, 0.00000000, 0.00, 0.00, 0),
(0.0000000, 0.0000000000, 0.000000000, 0.00000000, 1.00, 1.00, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
