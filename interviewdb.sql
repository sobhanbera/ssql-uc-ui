-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 29, 2022 at 06:31 AM
-- Server version: 10.6.5-MariaDB
-- PHP Version: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+05:30";

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL COMMENT 'an unique user id for every user account',
  `email` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'email of registered user''s account',
  `password` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'password of the account',
  `firstname` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'first name of the user',
  `lastname` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'last name of the user',
  `mobile` varchar(13) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'mobile number of the user',
  `created_on` timestamp NULL DEFAULT current_timestamp() COMMENT 'when the current account was created',
  `last_edited_on` timestamp NULL DEFAULT current_timestamp() COMMENT 'the last time a particular account was edited',
  `last_login_on` timestamp NULL DEFAULT current_timestamp() COMMENT 'when the user last login in the website'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Table to store the user account data.';

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'an unique user id for every user account', AUTO_INCREMENT=8;
COMMIT;
