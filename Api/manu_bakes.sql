-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 03, 2020 at 11:45 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `manu_bakes`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `session` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `session`) VALUES
(1, 'manu', 'manu', '0.60670300 1596454013');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerName` varchar(250) NOT NULL,
  `billAmount` varchar(250) NOT NULL,
  `customerAddress` varchar(250) NOT NULL,
  `contactNumber` varchar(15) NOT NULL,
  `deliveryStatus` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customerName`, `billAmount`, `customerAddress`, `contactNumber`, `deliveryStatus`) VALUES
(1, 'Dhiraj', '121', 'BGm', '9035807655', 'Pending'),
(2, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(3, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(4, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(5, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(6, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(7, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(8, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(9, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(10, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(11, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(12, 'Dhiraj', '121', 'BGm', '', 'Pending'),
(13, 'Dhiraj', '121', 'BGm', '', 'Cancaled'),
(14, 'Dhiraj', '121', 'BGm', '', 'Completed'),
(15, 'Dhiraj', '121', 'BGm', '', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productType` varchar(250) NOT NULL,
  `productName` varchar(250) NOT NULL,
  `productDescription` varchar(250) NOT NULL,
  `price1` int(11) NOT NULL,
  `price2` int(11) NOT NULL,
  `price3` int(11) NOT NULL,
  `price4` int(11) NOT NULL,
  `image` int(11) NOT NULL,
  `disable` int(10) NOT NULL,
  `outOfStock` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `productType`, `productName`, `productDescription`, `price1`, `price2`, `price3`, `price4`, `image`, `disable`, `outOfStock`) VALUES
(77, 'Donuts', 'dhiraj', 'round donuts', 2000, 1000, 500, 250, 1, 0, 0),
(78, 'Pizza', 'chees pizza', 'extra chees pizza with topping', 1000, 500, 250, 100, 1, 1, 1),
(79, 'Cupcakes', 'test n', 'test d', 2, 1, 12, 14, 1, 1, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
