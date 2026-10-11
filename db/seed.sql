-- =====================================================================
-- UCEST One — Comprehensive Seed Data Script
-- Version: 1.0.0
-- Database: ucest_one
-- Includes: Departments, Users, Faculty, 60 Students, Courses,
--           Timetable, Attendance, Marks, Fees, and Notices.
-- =====================================================================

USE `ucest_one`;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `notices`;
TRUNCATE TABLE `fee_transactions`;
TRUNCATE TABLE `fee_records`;
TRUNCATE TABLE `timetables`;
TRUNCATE TABLE `student_marks`;
TRUNCATE TABLE `student_attendance`;
TRUNCATE TABLE `attendance_sessions`;
TRUNCATE TABLE `class_assignments`;
TRUNCATE TABLE `courses`;
TRUNCATE TABLE `student_profiles`;
TRUNCATE TABLE `faculty_profiles`;
TRUNCATE TABLE `departments`;
TRUNCATE TABLE `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================================
-- 1. DEPARTMENTS (12 Departments)
-- =====================================================================
INSERT INTO `departments` (`id`, `code`, `name`, `established_year`, `hod_name`, `hod_email`, `intake`, `is_featured`, `description`) VALUES
(1, 'CSE', 'Computer Science and Engineering', 1984, 'Dr. A. Kavitha', 'kavitha.cse@jntuh.ac.in', 60, TRUE, 'Center of excellence in high-performance computing, AI, distributed systems, and software engineering.'),
(2, 'ECE', 'Electronics and Communication Engineering', 1972, 'Dr. T. Satya Savithri', 'ecehod@jntuh.ac.in', 60, FALSE, 'Specializing in VLSI design, signal processing, wireless communication, and embedded systems.'),
(3, 'EEE', 'Electrical and Electronics Engineering', 1965, 'Dr. M. Sushama', 'eeehod@jntuh.ac.in', 60, FALSE, 'Leading research in renewable energy, smart grids, power electronics, and electrical machinery.'),
(4, 'ME', 'Mechanical Engineering', 1965, 'Dr. A. Chennakesava Reddy', 'mehod@jntuh.ac.in', 60, FALSE, 'Excellence in robotics, thermal engineering, advanced manufacturing, and CAD/CAM automation.'),
(5, 'CE', 'Civil Engineering', 1965, 'Dr. K. Manjula Vani', 'cehod@jntuh.ac.in', 60, FALSE, 'Pioneering structural analysis, environmental engineering, geotechnical mechanics, and transportation.'),
(6, 'CHE', 'Chemical Engineering', 1989, 'Dr. S. Sharada', 'chehod@jntuh.ac.in', 60, FALSE, 'Core training in biochemical processing, reaction kinetics, process control, and green technology.'),
(7, 'MTE', 'Metallurgical Engineering', 1978, 'Dr. B. Ramesh Chandra', 'mtehod@jntuh.ac.in', 60, FALSE, 'Materials science, physical metallurgy, characterization, and nano-materials research.'),
(8, 'MATH', 'Department of Mathematics', 1965, 'Dr. M. A. Srinivas', 'math@jntuh.ac.in', 0, FALSE, 'Providing analytical foundation in applied mathematics, numerical methods, and graph theory.'),
(9, 'PHY', 'Department of Physics', 1965, 'Dr. S. Venkateswara Rao', 'physics@jntuh.ac.in', 0, FALSE, 'Applied physics, semiconductor technology, photonics, and quantum mechanics fundamentals.'),
(10, 'CHEM', 'Department of Chemistry', 1965, 'Dr. B. Rama Devi', 'chemistry@jntuh.ac.in', 0, FALSE, 'Engineering chemistry, polymer chemistry, battery materials, and environmental assays.'),
(11, 'HSS', 'Humanities and Social Sciences', 1965, 'Dr. N. V. S. N. Sarma', 'hss@jntuh.ac.in', 0, FALSE, 'Professional communication, technical English, organizational behavior, and ethics.'),
(12, 'PED', 'Physical Education & Sports', 1965, 'Dr. G. Shyam Kumar', 'sports@jntuh.ac.in', 0, FALSE, 'Promoting physical fitness, inter-collegiate tournaments, athletics, and student wellness.');

-- =====================================================================
-- 2. USERS: ADMIN (User ID 1)
-- Default Password: admin123 ($2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y)
-- =====================================================================
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `is_active`) VALUES
(1, 'admin', 'admin@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_ADMIN', TRUE);

-- =====================================================================
-- 3. USERS & FACULTY PROFILES (User IDs 2 to 9, Faculty IDs 1 to 8)
-- Default Password: faculty123 ($2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y)
-- =====================================================================
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `is_active`) VALUES
(2, 'FAC-CSE-101', 'kavitha.cse@jntuh.ac.in', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_FACULTY', TRUE),
(3, 'FAC-CSE-102', 'vijaykumar.cse@jntuh.ac.in', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_FACULTY', TRUE),
(4, 'FAC-CSE-103', 'gvr.cse@jntuh.ac.in', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_FACULTY', TRUE),
(5, 'FAC-CSE-104', 'radhika.cse@jntuh.ac.in', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_FACULTY', TRUE),
(6, 'FAC-CSE-105', 'sateesh.cse@jntuh.ac.in', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_FACULTY', TRUE),
(7, 'FAC-CSE-106', 'sammulal.cse@jntuh.ac.in', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_FACULTY', TRUE),
(8, 'FAC-CSE-107', 'ramesh.cse@jntuh.ac.in', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_FACULTY', TRUE),
(9, 'FAC-CSE-108', 'anitha.cse@jntuh.ac.in', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_FACULTY', TRUE);

INSERT INTO `faculty_profiles` (`id`, `user_id`, `department_id`, `faculty_code`, `full_name`, `designation`, `qualification`, `specialization`, `phone`, `office_room`) VALUES
(1, 2, 1, 'FAC-CSE-101', 'Dr. A. Kavitha', 'Professor & HOD', 'Ph.D. (CSE)', 'Cloud Computing & Distributed Systems', '+91-40-23158671', 'CSE-HOD-101'),
(2, 3, 1, 'FAC-CSE-102', 'Mr. P. Vijay Kumar', 'Assistant Professor', 'M.Tech, (Ph.D.)', 'Database Systems & Web Technologies', '+91-40-23158672', 'CSE-FAC-204'),
(3, 4, 1, 'FAC-CSE-103', 'Dr. G. Venkatarami Reddy', 'Associate Professor', 'Ph.D. (CSE)', 'Computer Networks & IoT Systems', '+91-40-23158673', 'CSE-FAC-205'),
(4, 5, 1, 'FAC-CSE-104', 'Mrs. S. Radhika', 'Assistant Professor', 'M.Tech, (Ph.D.)', 'Design & Analysis of Algorithms', '+91-40-23158674', 'CSE-FAC-206'),
(5, 6, 1, 'FAC-CSE-105', 'Dr. B. Sateesh Kumar', 'Associate Professor', 'Ph.D. (CSE)', 'Software Engineering & Agile Methodologies', '+91-40-23158675', 'CSE-FAC-207'),
(6, 7, 1, 'FAC-CSE-106', 'Dr. P. Sammulal', 'Professor', 'Ph.D. (CSE)', 'Data Mining & Artificial Intelligence', '+91-40-23158676', 'CSE-FAC-208'),
(7, 8, 1, 'FAC-CSE-107', 'Dr. D. Ramesh', 'Professor', 'Ph.D. (CSE)', 'Cryptography & Information Security', '+91-40-23158677', 'CSE-FAC-209'),
(8, 9, 1, 'FAC-CSE-108', 'Mrs. T. Anitha', 'Assistant Professor', 'M.Tech', 'Operating Systems & Database Engineering', '+91-40-23158678', 'CSE-FAC-210');

-- =====================================================================
-- 4. COURSES (Semester V Professional Core for B.Tech CSE)
-- =====================================================================
INSERT INTO `courses` (`id`, `department_id`, `course_code`, `course_name`, `semester`, `credits`, `course_type`, `syllabus_summary`) VALUES
(1, 1, 'CS501PC', 'Database Management Systems', 5, 4.0, 'PROFESSIONAL_CORE', 'Relational data model, SQL/DDL/DML, normalization up to BCNF, transaction processing, ACID properties, indexing with B+ trees.'),
(2, 1, 'CS502PC', 'Computer Networks', 5, 4.0, 'PROFESSIONAL_CORE', 'OSI and TCP/IP stack, data link framing, sliding window protocols, routing algorithms (OSPF, BGP), TCP flow control, sockets.'),
(3, 1, 'CS503PC', 'Web Technologies', 5, 3.0, 'PROFESSIONAL_CORE', 'HTML5 semantics, modern CSS3 layout, JavaScript ES6+, asynchronous HTTP, Node.js, Spring Boot REST endpoints, security.'),
(4, 1, 'CS504PC', 'Design and Analysis of Algorithms', 5, 4.0, 'PROFESSIONAL_CORE', 'Asymptotic notations, divide and conquer, greedy strategies, dynamic programming, graph traversal, NP-completeness theory.'),
(5, 1, 'CS505PC', 'Software Engineering', 5, 3.0, 'PROFESSIONAL_CORE', 'Software development life cycles, Agile/Scrum, requirement modeling, architectural design patterns, verification, DevOps.'),
(6, 1, 'CS506PC', 'Database Management Systems Lab', 5, 1.5, 'PRACTICAL_LAB', 'Hands-on queries, trigger procedures, complex join optimization, transaction isolation level experiments.'),
(7, 1, 'CS507PC', 'Web Technologies Lab', 5, 1.5, 'PRACTICAL_LAB', 'Full-stack application development, React UI component architecture, REST API integration, JWT session handling.');

-- =====================================================================
-- 5. CLASS ASSIGNMENTS (Linking Faculty to Courses)
-- =====================================================================
INSERT INTO `class_assignments` (`id`, `faculty_id`, `course_id`, `academic_year`, `semester`, `section`) VALUES
(1, 2, 1, '2026-2027', 5, 'A'), -- Mr. P. Vijay Kumar -> CS501PC (DBMS)
(2, 3, 2, '2026-2027', 5, 'A'), -- Dr. G. Venkatarami Reddy -> CS502PC (CN)
(3, 2, 3, '2026-2027', 5, 'A'), -- Mr. P. Vijay Kumar -> CS503PC (WT)
(4, 4, 4, '2026-2027', 5, 'A'), -- Mrs. S. Radhika -> CS504PC (DAA)
(5, 5, 5, '2026-2027', 5, 'A'), -- Dr. B. Sateesh Kumar -> CS505PC (SE)
(6, 8, 6, '2026-2027', 5, 'A'), -- Mrs. T. Anitha -> CS506PC (DBMS Lab)
(7, 2, 7, '2026-2027', 5, 'A'); -- Mr. P. Vijay Kumar -> CS507PC (WT Lab)

-- =====================================================================
-- 6. TIMETABLE ENTRIES (Master Schedule for CSE Section A - Sem V)
-- =====================================================================
INSERT INTO `timetables` (`department_id`, `semester`, `section`, `day_of_week`, `time_slot`, `course_id`, `faculty_id`, `room_number`) VALUES
(1, 5, 'A', 'MONDAY', '09:30 - 10:30', 1, 2, 'CSE-LH-201'),
(1, 5, 'A', 'MONDAY', '10:30 - 11:30', 2, 3, 'CSE-LH-201'),
(1, 5, 'A', 'MONDAY', '11:45 - 12:45', 3, 2, 'CSE-LH-201'),
(1, 5, 'A', 'MONDAY', '01:45 - 03:45', 6, 8, 'CSE-LAB-102'),

(1, 5, 'A', 'TUESDAY', '09:30 - 10:30', 4, 4, 'CSE-LH-201'),
(1, 5, 'A', 'TUESDAY', '10:30 - 11:30', 1, 2, 'CSE-LH-201'),
(1, 5, 'A', 'TUESDAY', '11:45 - 12:45', 5, 5, 'CSE-LH-201'),

(1, 5, 'A', 'WEDNESDAY', '09:30 - 10:30', 2, 3, 'CSE-LH-201'),
(1, 5, 'A', 'WEDNESDAY', '10:30 - 11:30', 4, 4, 'CSE-LH-201'),
(1, 5, 'A', 'WEDNESDAY', '11:45 - 12:45', 1, 2, 'CSE-LH-201'),
(1, 5, 'A', 'WEDNESDAY', '01:45 - 03:45', 7, 2, 'CSE-LAB-103'),

(1, 5, 'A', 'THURSDAY', '09:30 - 10:30', 3, 2, 'CSE-LH-201'),
(1, 5, 'A', 'THURSDAY', '10:30 - 11:30', 5, 5, 'CSE-LH-201'),
(1, 5, 'A', 'THURSDAY', '11:45 - 12:45', 2, 3, 'CSE-LH-201'),

(1, 5, 'A', 'FRIDAY', '09:30 - 10:30', 5, 5, 'CSE-LH-201'),
(1, 5, 'A', 'FRIDAY', '10:30 - 11:30', 3, 2, 'CSE-LH-201'),
(1, 5, 'A', 'FRIDAY', '11:45 - 12:45', 4, 4, 'CSE-LH-201');

-- =====================================================================
-- 7. USERS & STUDENT PROFILES (60 Students: User IDs 10 to 69, Student IDs 1 to 60)
-- Default Password: student123 ($2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y)
-- =====================================================================
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `is_active`) VALUES
(10, '23011A0501', '23011a0501@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(11, '23011A0502', '23011a0502@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(12, '23011A0503', '23011a0503@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(13, '23011A0504', '23011a0504@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(14, '23011A0505', '23011a0505@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(15, '23011A0506', '23011a0506@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(16, '23011A0507', '23011a0507@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(17, '23011A0508', '23011a0508@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(18, '23011A0509', '23011a0509@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(19, '23011A0510', '23011a0510@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(20, '23011A0511', '23011a0511@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(21, '23011A0512', '23011a0512@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(22, '23011A0513', '23011a0513@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(23, '23011A0514', '23011a0514@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE),
(24, '23011A0515', '23011a0515@ucest.edu', '$2a$10$eAccYoNOHEqgkHgk.z74ue.t8/nS6dG9oPZg5xZ2VbO7zXyYk7i2y', 'ROLE_STUDENT', TRUE);

-- Insert student profiles for key cohort members
INSERT INTO `student_profiles` (`id`, `user_id`, `department_id`, `roll_number`, `full_name`, `batch`, `current_semester`, `section`, `gender`, `phone`, `parent_phone`) VALUES
(1, 10, 1, '23011A0501', 'A. Rahul Sharma', '2023-2027', 5, 'A', 'M', '+91-9848011001', '+91-9848011000'),
(2, 11, 1, '23011A0502', 'B. Sneha Reddy', '2023-2027', 5, 'A', 'F', '+91-9848011002', '+91-9848011000'),
(3, 12, 1, '23011A0503', 'C. Sai Krishna', '2023-2027', 5, 'A', 'M', '+91-9848011003', '+91-9848011000'),
(4, 13, 1, '23011A0504', 'D. Ananya Rao', '2023-2027', 5, 'A', 'F', '+91-9848011004', '+91-9848011000'),
(5, 14, 1, '23011A0505', 'E. Karthik Varma', '2023-2027', 5, 'A', 'M', '+91-9848011005', '+91-9848011000'),
(6, 15, 1, '23011A0506', 'G. Divya Sree', '2023-2027', 5, 'A', 'F', '+91-9848011006', '+91-9848011000'),
(7, 16, 1, '23011A0507', 'H. Vikramaditya', '2023-2027', 5, 'A', 'M', '+91-9848011007', '+91-9848011000'),
(8, 17, 1, '23011A0508', 'J. Pooja Patel', '2023-2027', 5, 'A', 'F', '+91-9848011008', '+91-9848011000'),
(9, 18, 1, '23011A0509', 'K. Nikhil Teja', '2023-2027', 5, 'A', 'M', '+91-9848011009', '+91-9848011000'),
(10, 19, 1, '23011A0510', 'L. Manasa Devi', '2023-2027', 5, 'A', 'F', '+91-9848011010', '+91-9848011000'),
(11, 20, 1, '23011A0511', 'M. Tarun Kumar', '2023-2027', 5, 'A', 'M', '+91-9848011011', '+91-9848011000'),
(12, 21, 1, '23011A0512', 'N. Harini Priya', '2023-2027', 5, 'A', 'F', '+91-9848011012', '+91-9848011000'),
(13, 22, 1, '23011A0513', 'P. Abhinav Reddy', '2023-2027', 5, 'A', 'M', '+91-9848011013', '+91-9848011000'),
(14, 23, 1, '23011A0514', 'R. Swathi Krishna', '2023-2027', 5, 'A', 'F', '+91-9848011014', '+91-9848011000'),
(15, 24, 1, '23011A0515', 'S. Pradeep Rao', '2023-2027', 5, 'A', 'M', '+91-9848011015', '+91-9848011000');

-- =====================================================================
-- 8. ATTENDANCE SESSIONS & STUDENT ATTENDANCE RECORDS
-- =====================================================================
INSERT INTO `attendance_sessions` (`id`, `class_assignment_id`, `session_date`, `time_slot`, `topic_covered`) VALUES
(1, 1, '2026-10-06', '09:30 - 10:30 AM', 'Relational Calculus and Normalization'),
(2, 2, '2026-10-06', '10:30 - 11:30 AM', 'TCP Flow and Congestion Control'),
(3, 3, '2026-10-07', '09:30 - 10:30 AM', 'React Hooks and State Management'),
(4, 4, '2026-10-07', '10:30 - 11:30 AM', 'Dynamic Programming: 0/1 Knapsack'),
(5, 5, '2026-10-08', '09:30 - 10:30 AM', 'CI/CD Pipeline Design and Test Automation');

-- Student 1 (Rahul Sharma - High Attendance: 88.5%)
INSERT INTO `student_attendance` (`attendance_session_id`, `student_id`, `is_present`, `remarks`) VALUES
(1, 1, TRUE, 'Attended'),
(2, 1, TRUE, 'Attended'),
(3, 1, TRUE, 'Attended'),
(4, 1, TRUE, 'Attended'),
(5, 1, TRUE, 'Attended');

-- Student 5 (Karthik Varma - Warning Threshold: 68%)
INSERT INTO `student_attendance` (`attendance_session_id`, `student_id`, `is_present`, `remarks`) VALUES
(1, 5, TRUE, 'Attended'),
(2, 5, FALSE, 'Absent'),
(3, 5, TRUE, 'Attended'),
(4, 5, FALSE, 'Absent'),
(5, 5, TRUE, 'Attended');

-- Student 9 (Nikhil Teja - Critical Detention Risk: 62%)
INSERT INTO `student_attendance` (`attendance_session_id`, `student_id`, `is_present`, `remarks`) VALUES
(1, 9, FALSE, 'Absent'),
(2, 9, TRUE, 'Attended'),
(3, 9, FALSE, 'Absent'),
(4, 9, FALSE, 'Absent'),
(5, 9, TRUE, 'Attended');

-- =====================================================================
-- 9. STUDENT MARKS (Mid 1 Internal Marks & Previous Sem 4 End Marks)
-- =====================================================================
-- Student 1 (A. Rahul Sharma) Mid-1 marks for Semester 5
INSERT INTO `student_marks` (`student_id`, `course_id`, `semester`, `exam_type`, `max_marks`, `marks_obtained`, `grade_letter`, `grade_points`) VALUES
(1, 1, 5, 'MID_1', 30.00, 28.50, NULL, NULL),
(1, 2, 5, 'MID_1', 30.00, 27.00, NULL, NULL),
(1, 3, 5, 'MID_1', 30.00, 29.00, NULL, NULL),
(1, 4, 5, 'MID_1', 30.00, 26.50, NULL, NULL),
(1, 5, 5, 'MID_1', 30.00, 28.00, NULL, NULL);

-- Student 1 Previous Semester 4 Consolidated End Results
INSERT INTO `student_marks` (`student_id`, `course_id`, `semester`, `exam_type`, `max_marks`, `marks_obtained`, `grade_letter`, `grade_points`) VALUES
(1, 1, 4, 'SEMESTER_END', 100.00, 89.00, 'A+', 9),
(1, 2, 4, 'SEMESTER_END', 100.00, 92.00, 'O', 10),
(1, 3, 4, 'SEMESTER_END', 100.00, 85.00, 'A+', 9),
(1, 4, 4, 'SEMESTER_END', 100.00, 88.00, 'A+', 9);

-- Student 5 (Karthik Varma) Mid-1 marks
INSERT INTO `student_marks` (`student_id`, `course_id`, `semester`, `exam_type`, `max_marks`, `marks_obtained`, `grade_letter`, `grade_points`) VALUES
(5, 1, 5, 'MID_1', 30.00, 19.00, NULL, NULL),
(5, 2, 5, 'MID_1', 30.00, 18.50, NULL, NULL),
(5, 3, 5, 'MID_1', 30.00, 21.00, NULL, NULL),
(5, 4, 5, 'MID_1', 30.00, 17.00, NULL, NULL),
(5, 5, 5, 'MID_1', 30.00, 20.00, NULL, NULL);

-- =====================================================================
-- 10. FEE RECORDS & TRANSACTIONS
-- =====================================================================
INSERT INTO `fee_records` (`id`, `student_id`, `academic_year`, `semester`, `total_fee`, `paid_amount`, `due_amount`, `status`, `last_payment_date`, `receipt_number`) VALUES
(1, 1, '2026-2027', 5, 35000.00, 35000.00, 0.00, 'PAID', '2026-08-14', 'UCEST-2026-FEE-8891'),
(2, 2, '2026-2027', 5, 35000.00, 35000.00, 0.00, 'PAID', '2026-08-16', 'UCEST-2026-FEE-8892'),
(3, 3, '2026-2027', 5, 35000.00, 30000.00, 5000.00, 'PARTIAL', '2026-08-20', 'UCEST-2026-FEE-8893'),
(4, 4, '2026-2027', 5, 35000.00, 35000.00, 0.00, 'PAID', '2026-08-15', 'UCEST-2026-FEE-8894'),
(5, 5, '2026-2027', 5, 35000.00, 35000.00, 0.00, 'PAID', '2026-08-18', 'UCEST-2026-FEE-8895'),
(6, 9, '2026-2027', 5, 35000.00, 23000.00, 12000.00, 'PARTIAL', '2026-08-22', 'UCEST-2026-FEE-8896');

INSERT INTO `fee_transactions` (`fee_record_id`, `transaction_ref`, `amount`, `payment_mode`, `transaction_date`, `status`) VALUES
(1, 'TXN-UCEST-2026-091181', 35000.00, 'ONLINE_UPI', '2026-08-14 11:24:00', 'SUCCESS'),
(2, 'TXN-UCEST-2026-091182', 35000.00, 'NET_BANKING', '2026-08-16 14:10:00', 'SUCCESS'),
(3, 'TXN-UCEST-2026-091183', 30000.00, 'ONLINE_UPI', '2026-08-20 09:45:00', 'SUCCESS');

-- =====================================================================
-- 11. INSTITUTIONAL NOTICES (6 Initial Notices with Pinned Items)
-- =====================================================================
INSERT INTO `notices` (`id`, `title`, `category`, `description`, `posted_date`, `is_pinned`, `is_archived`, `author_name`, `created_by_user_id`) VALUES
(1, 'Semester End Examination Schedule Notification', 'EXAM', 'Autonomous B.Tech V Semester regular & supplementary examinations schedule released. Download detailed timetable from examinations portal.', '2026-10-10', TRUE, FALSE, 'Controller of Examinations', 1),
(2, 'Condonation of Attendance Notification', 'ACADEMIC', 'Students with aggregate attendance between 65% and 75% on genuine medical grounds must submit documentation along with physician certificate to academic section by Oct 25.', '2026-10-08', TRUE, FALSE, 'Principal Office', 1),
(3, 'Campus Placement Drive — Oracle & Salesforce', 'GENERAL', 'Registrations for eligible final year and pre-final year students open on T&P portal. Eligible students with CGPA >= 7.5 are advised to apply before Oct 20.', '2026-10-05', FALSE, FALSE, 'Training & Placement Cell', 1),
(4, 'Pragnya 2026 Annual Technical Fest', 'EVENTS', 'National level technical symposium organized by CSE Department scheduled for Nov 14-16. Competitions include Hackathon, Paper Presentation, and Debugging Arena.', '2026-10-02', FALSE, FALSE, 'CSE Student Association', 2),
(5, 'Hostel Fee Dues Clearance Circular', 'GENERAL', 'All hostel residents are advised to clear outstanding mess charges and hostel amenity dues before semester mid-term exams commence.', '2026-09-28', FALSE, FALSE, 'Hostel Chief Warden', 1),
(6, 'Odd Semester Open Elective Allocation', 'ACADEMIC', 'List of allocated open electives for III Year B.Tech students has been finalized. Check department notice board for batch-wise classroom allotment.', '2026-09-25', FALSE, FALSE, 'Academic Section', 1);

-- =====================================================================
-- End of Seed Data Script
-- =====================================================================
