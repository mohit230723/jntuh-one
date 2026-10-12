-- =====================================================================
-- UCEST One — MySQL Relational Database Schema
-- Version: 1.0.0
-- Database: ucest_one
-- Target: MySQL 8.0+
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `ucest_one` 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `ucest_one`;

-- Drop existing tables in reverse dependency order if recreating
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `notices`;
DROP TABLE IF EXISTS `fee_transactions`;
DROP TABLE IF EXISTS `fee_records`;
DROP TABLE IF EXISTS `timetables`;
DROP TABLE IF EXISTS `student_marks`;
DROP TABLE IF EXISTS `student_attendance`;
DROP TABLE IF EXISTS `attendance_sessions`;
DROP TABLE IF EXISTS `class_assignments`;
DROP TABLE IF EXISTS `courses`;
DROP TABLE IF EXISTS `student_profiles`;
DROP TABLE IF EXISTS `faculty_profiles`;
DROP TABLE IF EXISTS `departments`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------
-- Table 1: users (Authentication & Core Identity)
-- ---------------------------------------------------------------------
CREATE TABLE `users` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Roll number for students, employee code for faculty, email for admin',
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL COMMENT 'BCrypt hash (cost 10+)',
  `role` ENUM('ROLE_STUDENT', 'ROLE_FACULTY', 'ROLE_ADMIN') NOT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 2: departments (Academic Departments)
-- ---------------------------------------------------------------------
CREATE TABLE `departments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(10) NOT NULL UNIQUE COMMENT 'e.g., CSE, ECE, EEE, ME, CE',
  `name` VARCHAR(100) NOT NULL,
  `established_year` INT NOT NULL DEFAULT 1965,
  `hod_name` VARCHAR(100) NOT NULL,
  `hod_email` VARCHAR(100),
  `intake` INT NOT NULL DEFAULT 60,
  `is_featured` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'TRUE for CSE featured showcase',
  `description` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 3: faculty_profiles (Faculty Biographical & Academic Metadata)
-- ---------------------------------------------------------------------
CREATE TABLE `faculty_profiles` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NOT NULL UNIQUE,
  `department_id` INT NOT NULL,
  `faculty_code` VARCHAR(30) NOT NULL UNIQUE,
  `full_name` VARCHAR(100) NOT NULL,
  `designation` VARCHAR(50) NOT NULL COMMENT 'Professor, Assoc. Professor, Asst. Professor',
  `qualification` VARCHAR(100) NOT NULL,
  `specialization` VARCHAR(150),
  `phone` VARCHAR(20),
  `office_room` VARCHAR(50),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_faculty_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_faculty_dept` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 4: student_profiles (Student Academic & Personal Metadata)
-- ---------------------------------------------------------------------
CREATE TABLE `student_profiles` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NOT NULL UNIQUE,
  `department_id` INT NOT NULL,
  `roll_number` VARCHAR(30) NOT NULL UNIQUE,
  `full_name` VARCHAR(100) NOT NULL,
  `batch` VARCHAR(20) NOT NULL DEFAULT '2023-2027',
  `current_semester` INT NOT NULL DEFAULT 5,
  `section` VARCHAR(5) NOT NULL DEFAULT 'A',
  `gender` ENUM('M', 'F', 'OTHER') NOT NULL,
  `phone` VARCHAR(20),
  `parent_phone` VARCHAR(20),
  `address` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_student_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_student_dept` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT,
  INDEX `idx_student_roll` (`roll_number`),
  INDEX `idx_student_sem_dept` (`department_id`, `current_semester`, `section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 5: courses (Academic Course Offerings / Subjects)
-- ---------------------------------------------------------------------
CREATE TABLE `courses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `department_id` INT NOT NULL,
  `course_code` VARCHAR(20) NOT NULL UNIQUE COMMENT 'e.g., CS501PC',
  `course_name` VARCHAR(120) NOT NULL,
  `semester` INT NOT NULL,
  `credits` DECIMAL(3, 1) NOT NULL DEFAULT 3.0,
  `course_type` ENUM('PROFESSIONAL_CORE', 'PROFESSIONAL_ELECTIVE', 'OPEN_ELECTIVE', 'PRACTICAL_LAB', 'AUDIT') NOT NULL DEFAULT 'PROFESSIONAL_CORE',
  `syllabus_summary` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_course_dept` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT,
  INDEX `idx_course_sem` (`department_id`, `semester`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 6: class_assignments (Teaching Assignments linking Faculty to Courses)
-- ---------------------------------------------------------------------
CREATE TABLE `class_assignments` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `faculty_id` BIGINT NOT NULL,
  `course_id` INT NOT NULL,
  `academic_year` VARCHAR(10) NOT NULL DEFAULT '2026-2027',
  `semester` INT NOT NULL DEFAULT 5,
  `section` VARCHAR(5) NOT NULL DEFAULT 'A',
  CONSTRAINT `fk_assign_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_assign_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_faculty_course_assignment` (`faculty_id`, `course_id`, `academic_year`, `semester`, `section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 7: attendance_sessions (Individual Lecture / Lab Sessions)
-- ---------------------------------------------------------------------
CREATE TABLE `attendance_sessions` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `class_assignment_id` BIGINT NOT NULL,
  `session_date` DATE NOT NULL,
  `time_slot` VARCHAR(30) NOT NULL COMMENT 'e.g., 09:30 - 10:30 AM',
  `topic_covered` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_session_assignment` FOREIGN KEY (`class_assignment_id`) REFERENCES `class_assignments` (`id`) ON DELETE CASCADE,
  INDEX `idx_session_date` (`session_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 8: student_attendance (Individual Attendance Entries per Student)
-- ---------------------------------------------------------------------
CREATE TABLE `student_attendance` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `attendance_session_id` BIGINT NOT NULL,
  `student_id` BIGINT NOT NULL,
  `is_present` BOOLEAN NOT NULL DEFAULT TRUE,
  `remarks` VARCHAR(100),
  CONSTRAINT `fk_att_session` FOREIGN KEY (`attendance_session_id`) REFERENCES `attendance_sessions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_att_student` FOREIGN KEY (`student_id`) REFERENCES `student_profiles` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_student_session` (`attendance_session_id`, `student_id`),
  INDEX `idx_student_att` (`student_id`, `is_present`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 9: student_marks (Internal Assessments and Semester Exam Marks)
-- ---------------------------------------------------------------------
CREATE TABLE `student_marks` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `student_id` BIGINT NOT NULL,
  `course_id` INT NOT NULL,
  `semester` INT NOT NULL,
  `exam_type` ENUM('MID_1', 'MID_2', 'ASSIGNMENT', 'SEMESTER_END') NOT NULL,
  `max_marks` DECIMAL(5, 2) NOT NULL DEFAULT 30.00,
  `marks_obtained` DECIMAL(5, 2) NOT NULL,
  `grade_letter` VARCHAR(5) COMMENT 'O, A+, A, B+, B, C, F for semester end',
  `grade_points` INT COMMENT '0 to 10',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_marks_student` FOREIGN KEY (`student_id`) REFERENCES `student_profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_marks_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_student_course_exam` (`student_id`, `course_id`, `exam_type`),
  INDEX `idx_marks_student_sem` (`student_id`, `semester`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 10: timetables (Weekly Master Class Schedule)
-- ---------------------------------------------------------------------
CREATE TABLE `timetables` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `department_id` INT NOT NULL,
  `semester` INT NOT NULL,
  `section` VARCHAR(5) NOT NULL DEFAULT 'A',
  `day_of_week` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY') NOT NULL,
  `time_slot` VARCHAR(30) NOT NULL COMMENT 'e.g., 09:30 - 10:30',
  `course_id` INT NOT NULL,
  `faculty_id` BIGINT NOT NULL,
  `room_number` VARCHAR(30) NOT NULL DEFAULT 'CSE-LH-201',
  CONSTRAINT `fk_tt_dept` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tt_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tt_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_profiles` (`id`) ON DELETE CASCADE,
  INDEX `idx_tt_lookup` (`department_id`, `semester`, `section`, `day_of_week`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 11: fee_records & fee_transactions (Student Fee Accounts & Dues)
-- ---------------------------------------------------------------------
CREATE TABLE `fee_records` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `student_id` BIGINT NOT NULL,
  `academic_year` VARCHAR(10) NOT NULL DEFAULT '2026-2027',
  `semester` INT NOT NULL DEFAULT 5,
  `total_fee` DECIMAL(10, 2) NOT NULL DEFAULT 35000.00,
  `paid_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `due_amount` DECIMAL(10, 2) NOT NULL DEFAULT 35000.00,
  `status` ENUM('PAID', 'PARTIAL', 'PENDING') NOT NULL DEFAULT 'PENDING',
  `last_payment_date` DATE,
  `receipt_number` VARCHAR(50) UNIQUE,
  CONSTRAINT `fk_fee_student` FOREIGN KEY (`student_id`) REFERENCES `student_profiles` (`id`) ON DELETE CASCADE,
  INDEX `idx_fee_student` (`student_id`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `fee_transactions` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `fee_record_id` BIGINT NOT NULL,
  `transaction_ref` VARCHAR(60) NOT NULL UNIQUE,
  `amount` DECIMAL(10, 2) NOT NULL,
  `payment_mode` VARCHAR(30) NOT NULL DEFAULT 'ONLINE',
  `transaction_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` VARCHAR(20) NOT NULL DEFAULT 'SUCCESS',
  CONSTRAINT `fk_fee_trans_record` FOREIGN KEY (`fee_record_id`) REFERENCES `fee_records` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table 12: notices (Institutional Announcements & Circulars)
-- ---------------------------------------------------------------------
CREATE TABLE `notices` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` ENUM('ACADEMIC', 'EXAM', 'EVENTS', 'GENERAL') NOT NULL DEFAULT 'GENERAL',
  `description` TEXT NOT NULL,
  `posted_date` DATE NOT NULL,
  `is_pinned` BOOLEAN NOT NULL DEFAULT FALSE,
  `is_archived` BOOLEAN NOT NULL DEFAULT FALSE,
  `author_name` VARCHAR(100) NOT NULL DEFAULT 'Administration',
  `created_by_user_id` BIGINT,
  `attachment_url` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_notice_user` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_notices_search` (`is_archived`, `category`, `is_pinned`, `posted_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- End of Schema Definition
-- =====================================================================
