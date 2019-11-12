-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 12, 2019 at 06:45 AM
-- Server version: 5.7.21
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `disablity_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `openings`
--

DROP TABLE IF EXISTS `openings`;
CREATE TABLE IF NOT EXISTS `openings` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL,
  `job_title` varchar(200) NOT NULL,
  `job_descr` varchar(300) NOT NULL,
  `job_location` varchar(150) NOT NULL,
  `skills_required` varchar(300) NOT NULL,
  `closing_dt` date NOT NULL,
  `job_status` enum('open','close') NOT NULL DEFAULT 'open',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `type_of_user` enum('user','employer') NOT NULL DEFAULT 'user',
  `phone_num` varchar(20) DEFAULT NULL,
  `profile_img_file_name` varchar(300) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `d_o_b` date DEFAULT NULL,
  `resume_file_name` varchar(200) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `orgn_type` varchar(100) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `type_of_user`, `phone_num`, `profile_img_file_name`, `address`, `d_o_b`, `resume_file_name`, `company`, `orgn_type`, `created_on`, `updated_on`) VALUES
(1, 'Narisht', 'Dhyani', 'narishtdhyani14584@sjsu.edu', '$2b$10$iyCbuH3.6Uzrg.hK5m5JG.UDX7p7t9UkMK0wxIDi28v48/kO8E2X.', 'user', '9711661419', NULL, NULL, NULL, NULL, NULL, NULL, '2019-09-17 18:07:30', '2019-09-18 08:24:44'),
(63, 'test1', 'user', 'test@gmail.com', '$2b$10$mVJHuLqkkI5JK1t7u1PTQu9E8JO04iEwORgoMmBWA1VR3yf6FocEC', 'user', NULL, NULL, 'Fountain Plaza', '2019-05-01', NULL, NULL, NULL, '2019-11-12 04:35:52', '2019-11-12 06:26:49');

-- --------------------------------------------------------

--
-- Table structure for table `user_aplications`
--

DROP TABLE IF EXISTS `user_aplications`;
CREATE TABLE IF NOT EXISTS `user_aplications` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `opening_id` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_disabilities`
--

DROP TABLE IF EXISTS `user_disabilities`;
CREATE TABLE IF NOT EXISTS `user_disabilities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_disabilities`
--

INSERT INTO `user_disabilities` (`id`, `user_id`, `name`, `created_on`, `updated_on`) VALUES
(1, 63, 'Test1', '2019-11-12 06:39:32', NULL),
(2, 63, 'Test3', '2019-11-12 06:39:43', '2019-11-12 06:44:18');

-- --------------------------------------------------------

--
-- Table structure for table `user_employments`
--

DROP TABLE IF EXISTS `user_employments`;
CREATE TABLE IF NOT EXISTS `user_employments` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL,
  `orgn_name` varchar(150) NOT NULL,
  `designation` varchar(150) NOT NULL,
  `from_period` date NOT NULL,
  `to_period` date NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_qualifications`
--

DROP TABLE IF EXISTS `user_qualifications`;
CREATE TABLE IF NOT EXISTS `user_qualifications` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL,
  `university_name` varchar(150) NOT NULL,
  `degree_level` varchar(150) NOT NULL,
  `qualification_name` varchar(150) NOT NULL,
  `start_dt` date NOT NULL,
  `completion_dt` date NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_skills`
--

DROP TABLE IF EXISTS `user_skills`;
CREATE TABLE IF NOT EXISTS `user_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
