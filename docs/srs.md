# Software Requirements Specification (SRS)
## UCEST One — Unified University Web Platform & Student Portal

> **Document ID:** DOC-102  
> **Version:** 1.0.0  
> **Date:** 2026-10-11  
> **Status:** Approved  
> **Role:** P4 (Research, Content & QA) / P1 (Project Lead)

---

## 1. Introduction

### 1.1 Purpose
This document provides a formal Software Requirements Specification (SRS) for **UCEST One**, an integrated digital platform designed for Jawaharlal Nehru Technological University Hyderabad University College of Engineering, Science & Technology (JNTUH UCEST). It details the functional, non-functional, security, and interface requirements for the system.

### 1.2 Scope
UCEST One comprises:
1. **Public Institution Web Portal**: 10 responsive public information pages providing institutional details, academic programs, department showcases, admissions criteria, and examination circulars.
2. **Centralized Notice Board**: Searchable, categorizable announcement engine with role-based authoring.
3. **Role-Based Authenticated Portals**:
   - **Student Portal**: Attendance tracking, semester results, weekly timetable, fee dues, and receipt generation.
   - **Faculty Portal**: Class assignment overview, daily attendance recording, internal marks entry, and notice posting.
   - **Admin Portal**: User provisioning, institutional stats overview, and notice lifecycle management.
4. **DevOps & Infrastructure**: Dockerized deployment, Kubernetes manifest orchestration, Jenkins CI/CD pipeline, Selenium automated test suite, and Nagios infrastructure monitoring.

---

## 2. Overall Description

### 2.1 User Classes and Characteristics
- **Public Visitor**: General internet user browsing college info, admissions, academic calendar, or notices. No login required.
- **Student**: Enrolled B.Tech/M.Tech student authenticated via Roll Number (e.g., `23011A0501`) and password. Needs immediate visibility of attendance percentage, academic performance, and class timetable.
- **Faculty Member**: Teaching faculty authenticated via Faculty ID (e.g., `FAC-CSE-101`) and password. Needs streamlined tools to mark attendance and input mid-term marks without cumbersome UI friction.
- **Administrator**: Institutional staff authenticated via admin email (`admin@ucest.edu`). Manages college-wide notices and system users.

### 2.2 System Architecture Overview
The system follows a modern decoupled three-tier architecture:
- **Presentation Tier**: React 18 single-page application (SPA) with React Router, Tailwind/Custom CSS, and Axios HTTP client.
- **Application Tier**: Spring Boot 3 RESTful web service running on Java 17/25 runtime, utilizing Spring Security and Spring Data JPA.
- **Data Tier**: MySQL 8 relational database management system with normalized relational schema and index optimization.

---

## 3. Functional Requirements

### 3.1 Public Web Portal (FR-PUB)
- **FR-PUB-01 (Public Navigation)**: The platform shall provide a persistent, responsive header with institutional branding, navigation links across all 10 public pages, and a quick-action "Portal Login" button.
- **FR-PUB-02 (Home Page)**: Shall feature a campus hero banner, principal's desk message, quick statistics counter, real-time notice carousel, and department access grid.
- **FR-PUB-03 (About Us Page)**: Shall display institutional history, vision, mission, leadership profiles, and NBA/NAAC Tier-1 accreditation badges.
- **FR-PUB-04 (Academics Page)**: Shall list B.Tech, M.Tech, and Ph.D. offerings, autonomous academic regulations (R22), and academic schedules.
- **FR-PUB-05 (Departments Directory)**: Shall present an interactive directory of all 12 college departments.
- **FR-PUB-06 (CSE Department Spotlight)**: Shall render a comprehensive departmental portal with HOD address, 12 faculty profiles, laboratory facilities, curriculum highlights, and placement records.
- **FR-PUB-07 (Admissions Page)**: Shall provide eligibility criteria, TSEAMCET cutoff trends, seat matrix, and fee structure breakdown.
- **FR-PUB-08 (Examinations Page)**: Shall outline exam branch regulations, grading policies, SGPA/CGPA computation formulas, and verification protocols.
- **FR-PUB-09 (Campus Life Page)**: Shall document residential hostels, sports infrastructure, student clubs, and annual festivals (Spandana).
- **FR-PUB-10 (Research & Innovation Page)**: Shall highlight funded research initiatives, incubation centers, and patent filings.
- **FR-PUB-11 (Contact Us Page)**: Shall include campus geolocation, contact directories, and an enquiry submission form.

### 3.2 Notice & Circular Management (FR-NOT)
- **FR-NOT-01 (Public Notice Feed)**: Public visitors and students shall view active notices ordered chronologically, with pinned urgent notices highlighted.
- **FR-NOT-02 (Search & Filtering)**: Users shall filter notices by category (`ACADEMIC`, `EXAM`, `EVENTS`, `GENERAL`) and perform substring search on titles and descriptions.
- **FR-NOT-03 (Administrative CRUD)**: Authorized Admin and Faculty users shall create, update, pin, and archive notice records via dedicated modal interfaces.

### 3.3 Authentication & Authorization (FR-AUTH)
- **FR-AUTH-01 (Credential Login)**: The system shall authenticate users via unique username/email and BCrypt-hashed password.
- **FR-AUTH-02 (JWT Issuance)**: On valid credentials, the backend shall issue a cryptographically signed JSON Web Token (HS256) valid for 2 hours, encapsulating user identity and assigned role (`ROLE_STUDENT`, `ROLE_FACULTY`, `ROLE_ADMIN`).
- **FR-AUTH-03 (Role-Based Route Guards)**: The frontend router shall enforce access boundaries. Unauthorized attempts shall redirect to login or a 403 Forbidden alert.

### 3.4 Student Portal (FR-STU)
- **FR-STU-01 (Student Overview)**: The dashboard shall display student profile, enrolled semester, overall attendance percentage, current CGPA, and pending fee status.
- **FR-STU-02 (Subject-Wise Attendance)**: Shall present detailed attendance figures per subject. Any subject below the mandatory 75% threshold shall trigger a visual warning indicator.
- **FR-STU-03 (Semester Results)**: Shall display semester-by-semester grade cards, individual subject marks, grade points, and computed SGPA/CGPA.
- **FR-STU-04 (Weekly Timetable)**: Shall render an intuitive day-wise class schedule displaying class timings, subject names, room numbers, and faculty details.
- **FR-STU-05 (Fee Tracking & Receipts)**: Shall list fee balances, transaction history, mock payment simulation, and printable payment receipts.

### 3.5 Faculty Portal (FR-FAC)
- **FR-FAC-01 (Class Overview)**: Faculty shall view assigned teaching subjects and associated student batches.
- **FR-FAC-02 (Attendance Marking)**: Faculty shall record attendance for any class session by toggling Present/Absent status for enrolled students and submitting with a single confirmation.
- **FR-FAC-03 (Internal Marks Entry)**: Faculty shall enter and update Mid-1, Mid-2, and Assignment scores with automatic validation against maximum permissible marks.

### 3.6 Admin Portal (FR-ADM)
- **FR-ADM-01 (System Metrics)**: Dashboard displaying aggregate counts: total enrolled students, active faculty, published circulars, and fee collections.
- **FR-ADM-02 (User Management)**: Provision new student and faculty credentials with automated role mapping and password hashing.
- **FR-ADM-03 (Notice Governance)**: Complete lifecycle control over all institutional announcements.

---

## 4. Non-Functional Requirements

### 4.1 Performance & Scalability
- **NFR-PERF-01**: Average API response time shall remain under 150ms for cached reads and under 300ms for database writes under normal load.
- **NFR-PERF-02**: Frontend initial bundle load shall complete under 2 seconds on standard 4G connections.
- **NFR-PERF-03**: Backend service shall horizontally scale across at least 2 Kubernetes pod replicas with automated load balancing.

### 4.2 Security
- **NFR-SEC-01**: All user passwords stored in MySQL shall be hashed using BCrypt with a minimum work factor of 10.
- **NFR-SEC-02**: No plaintext credentials, JWT signing secrets, or database passwords shall exist in source control. Secrets shall be passed via environment variables and Kubernetes Secret objects.
- **NFR-SEC-03**: Backend endpoints shall strictly sanitize input to prevent SQL injection and enforce CORS restrictions matching frontend origins.

### 4.3 Usability & Design
- **NFR-UI-01**: Layout must strictly adhere to responsive standards across mobile (375px+), tablet (768px+), and desktop (1024px+).
- **NFR-UI-02**: Interface components must maintain WCAG AA contrast compliance using the designated Navy (`#0A192F`), Gold (`#D4AF37`), Slate, and White palette.

---

## 5. Interface Specifications

### 5.1 Communication Interfaces
- Client-Server communication via REST over HTTP/JSON.
- Standardized HTTP status codes: `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Error`.

---

*Authored by: P4 (Research, Content & QA Lead)*  
*Reviewed by: P1 (Project Lead & DevOps)*
