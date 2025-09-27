-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2025 at 10:09 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `optimum`
--

-- --------------------------------------------------------

--
-- Table structure for table `design`
--

CREATE TABLE `design` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `added_by` int(11) NOT NULL,
  `added_time` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `status` enum('active','deleted') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `design`
--

INSERT INTO `design` (`id`, `url`, `added_by`, `added_time`, `updated_by`, `updated_time`, `status`) VALUES
(13, '/uploads/designs/salman-saqib-KrSQBFi0tyI-unsplash.jpg', 1, '2025-09-22 09:34:40', NULL, NULL, 'active'),
(14, '/uploads/designs/3d-rendering-house-model.jpg', 1, '2025-09-22 09:40:12', NULL, NULL, 'active'),
(15, '/uploads/designs/modern-residential-district-with-green-roof-balcony-generated-by-ai.jpg', 1, '2025-09-22 09:40:12', NULL, NULL, 'active'),
(16, '/uploads/designs/3d-house-model-with-modern-architecture(1).jpg', 1, '2025-09-22 09:40:12', NULL, NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `added_by` int(11) NOT NULL,
  `added_time` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `status` enum('active','deleted') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`id`, `url`, `added_by`, `added_time`, `updated_by`, `updated_time`, `status`) VALUES
(1, '/uploads/plans/Hokandara.pdf', 1, '2025-09-21 15:46:20', NULL, NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `f_image_url` varchar(200) DEFAULT NULL,
  `status` enum('ongoing','completed','deleted') DEFAULT 'ongoing',
  `added_by` int(11) DEFAULT NULL,
  `added_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `f_image_url`, `status`, `added_by`, `added_time`, `updated_by`, `updated_time`) VALUES
(7, 'kadawatha', 'house plan, construction, interior and electrical.', '/uploads/featureImages/project_7.jpg', 'ongoing', 1, '2025-09-18 04:12:52', NULL, '2025-09-18 04:12:52');

-- --------------------------------------------------------

--
-- Table structure for table `project_media`
--

CREATE TABLE `project_media` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `type` enum('image','video') NOT NULL,
  `url` varchar(500) NOT NULL,
  `added_by` int(11) DEFAULT NULL,
  `added_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_media`
--

INSERT INTO `project_media` (`id`, `project_id`, `type`, `url`, `added_by`, `added_time`) VALUES
(20, 7, 'image', '/uploads/project_7/images/pexels-heyho-7031600.jpg', 1, '2025-09-18 10:10:07'),
(21, 7, 'image', '/uploads/project_7/images/Gemini_Generated_Image_u2ftgxu2ftgxu2ft.png', 1, '2025-09-22 04:38:27'),
(22, 7, 'image', '/uploads/project_7/images/Gemini_Generated_Image_9nnxb39nnxb39nnx.png', 1, '2025-09-22 04:38:27'),
(23, 7, 'image', '/uploads/project_7/images/Gemini_Generated_Image_5yhhy5yhhy5yhhy5.png', 1, '2025-09-22 04:38:27'),
(24, 7, 'video', '/uploads/project_7/videos/0001.mp4', 1, '2025-09-22 04:39:19');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `added_by` int(11) DEFAULT NULL,
  `added_time` timestamp NULL DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT current_timestamp(),
  `temp_key` varchar(100) DEFAULT NULL,
  `temp_key_timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `phone_number`, `password`, `role`, `status`, `added_by`, `added_time`, `updated_by`, `updated_time`, `temp_key`, `temp_key_timestamp`) VALUES
(1, 'john', 'peter', 'john@gmail.com', 774512745, '$2a$10$ceeb2bcf773c7cd2c40b1ulv6jbu5AU7f7EiSkKpqwiOtjj0yuxF.', 1, 1, NULL, '2024-10-01 09:29:52', NULL, '2024-10-01 09:29:52', NULL, '2024-10-01 09:29:52');

-- --------------------------------------------------------

--
-- Table structure for table `user_login_session`
--

CREATE TABLE `user_login_session` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(150) NOT NULL DEFAULT '',
  `login_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `ip_address` varchar(50) NOT NULL DEFAULT '',
  `os_name` varchar(200) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_login_session`
--

INSERT INTO `user_login_session` (`id`, `user_id`, `token`, `login_time`, `ip_address`, `os_name`, `status`) VALUES
(255, 1, '$2a$10$ceeb2bcf773c7cd2c40b1ulhRtXHNxpEcKf05V/ASheJfJqxJ0hCK', '2025-09-21 10:11:54', '', 'Windows', 1),
(256, 1, '$2a$10$ceeb2bcf773c7cd2c40b1u8dZa3WgXyQpOyXb53A8/w2LiRwAXOoK', '2025-09-21 10:38:22', '', 'Windows', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_permission`
--

CREATE TABLE `user_permission` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permision` int(11) NOT NULL,
  `added_by` int(11) DEFAULT NULL,
  `added_time` timestamp NULL DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_permission_list`
--

CREATE TABLE `user_permission_list` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `added_by` int(11) NOT NULL,
  `added_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by` int(11) NOT NULL,
  `updated_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `role`) VALUES
(1, 'Super Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `design`
--
ALTER TABLE `design`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_media`
--
ALTER TABLE `project_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_role` (`role`),
  ADD KEY `added` (`added_by`),
  ADD KEY `updated` (`updated_by`);

--
-- Indexes for table `user_login_session`
--
ALTER TABLE `user_login_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_user` (`user_id`);

--
-- Indexes for table `user_permission`
--
ALTER TABLE `user_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_p_id` (`user_id`),
  ADD KEY `u_permision` (`permision`);

--
-- Indexes for table `user_permission_list`
--
ALTER TABLE `user_permission_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `p_l_added` (`added_by`),
  ADD KEY `p_l_updated` (`updated_by`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `design`
--
ALTER TABLE `design`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `project_media`
--
ALTER TABLE `project_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_login_session`
--
ALTER TABLE `user_login_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT for table `user_permission`
--
ALTER TABLE `user_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_permission_list`
--
ALTER TABLE `user_permission_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project_media`
--
ALTER TABLE `project_media`
  ADD CONSTRAINT `project_media_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_login_session`
--
ALTER TABLE `user_login_session`
  ADD CONSTRAINT `user_id_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user_permission_list`
--
ALTER TABLE `user_permission_list`
  ADD CONSTRAINT `p_l_added` FOREIGN KEY (`added_by`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `p_l_updated` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
