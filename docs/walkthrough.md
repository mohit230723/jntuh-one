# UCEST One — Comprehensive Demonstration & Walkthrough Guide

> Master inspection and presentation guide for UCEST One (Unified University Portal & Academic Management System).

---

## 1. Executive Summary & Verification Matrix

UCEST One modernizes and unifies the public face and academic governance operations of JNTUH University College of Engineering, Science & Technology. Built strictly under the **Orderful Industrial Command Deck Design System** (universal 8px radius, tight grotesk typography, surgical vermillion action signals, and an achromatic Vellum/Paper/Carbon hierarchy).

| Milestone / Requirement | Specification Invariant | Status | Verification Reference |
|-------------------------|-------------------------|--------|------------------------|
| **10 Public Pages** | 10 responsive public routes with sticky nav & marquee | ✅ Verified | `e2e-tests/runner.js` (13/13 passing) |
| **Featured Department** | CSE deep-dive across all 6 tabs (Faculty, Labs, Curriculum, Placements) | ✅ Verified | `/departments/cse` |
| **Role Authentication** | Student, Faculty, Admin JWT stateless auth & quick-fill presets | ✅ Verified | `/login` + `AuthContext.jsx` |
| **Student Portal** | Attendance ledger (<75% detention warning), Results, Timetable, Fee mock pay | ✅ Verified | `/portal/student` |
| **Faculty Portal** | Assigned cohorts, interactive student register, internal marks entry | ✅ Verified | `/portal/faculty` |
| **Admin Portal** | Institutional KPI metrics, Notice CRUD (pin/archive), User provisioning | ✅ Verified | `/portal/admin` |
| **Database Schema** | 12 normalized MySQL tables with BCrypt hashed seeds | ✅ Verified | `db/schema.sql`, `db/seed.sql` |
| **Docker Compose** | Multi-service mesh (MySQL 8, Spring Boot 3, Nginx frontend) | ✅ Verified | `docker-compose.yml` |
| **Kubernetes K8s** | 2 Backend Replicas, PersistentVolume, NodePort 30080 & 30081 | ✅ Verified | `kubectl kustomize k8s/` |
| **Selenium E2E Tests** | 5 core end-to-end tests with headless Chrome | ✅ Verified | `e2e-tests/src/test/java/...` |
| **Jenkins CI/CD** | Multi-stage declarative pipeline with Windows/Linux cross-compatibility | ✅ Verified | `Jenkinsfile` |
| **Nagios Monitoring** | 5 service probes + failure and recovery detection simulation | ✅ Verified | `monitoring/nagios/` |

---

## 2. Live Demonstration Flow

### Step 1: Public Website Tour
1. **Home (`/`):**
   - Notice the **Orderful Industrial Command Deck** styling: `#f5f5f5` Vellum base canvas, 64px sticky header with `UCEST ONE*` wordmark.
   - Top emergency dispatch marquee displaying urgent semester circulars.
   - Hero split section with institutional statistics and surgical vermillion CTA.
   - Latest Official Circulars live ticker with instant filtering.
2. **Featured Department (`/departments/cse`):**
   - Click **Departments** → **Computer Science & Engineering**.
   - Navigate all 6 interactive tabs:
     - **Overview:** 120 intake, 32 faculty, 92% placement rate, ₹44 LPA highest offer.
     - **Faculty:** Full roster of 12 professors and lecturers with qualifications, research interests, and office contacts.
     - **Laboratories:** 5 state-of-the-art labs (AI, Cyber Security, Advanced Computing, IoT, Network Systems) with equipment specs.
     - **Curriculum:** R22 regulation Semester V course syllabus (AI/ML, OS, Computer Networks, Automata).
     - **Placements:** 4-year salary progression, tier-1 recruiting partners.
     - **Contact:** Department administration and grievance cell contact points.
3. **Examinations Branch (`/examinations`):**
   - Real-time search filter: type `"Semester"` or `"Exam"`.
   - Category filtering: click `EXAM`, `ACADEMIC`, `EVENTS`, `GENERAL` tabs.
   - Notice detail modal: click any circular card to view complete dispatch details.
4. **Academics (`/academics`) & Admissions (`/admissions`):**
   - Academic regulations: R22 CIE (40) / SEE (60) marking scheme, 75% attendance detention rule.
   - Admissions intake matrix: 7 disciplines with regular intake and lateral entry allocations.
5. **Mobile Responsiveness:**
   - Resize browser to 375px or toggle mobile mode: responsive drawer smoothly opens and closes.

---

### Step 2: Student Command Desk Tour
1. Navigate to `/login`.
2. Click **Quick Fill: Student** (`23011A0501` / `student123`) and click **Authenticate Session**.
3. Land on `/portal/student`:
   - **Overview:** Welcomes scholar `A. Rahul Sharma`, displays overall attendance percentage, GPA, and schedule.
   - **Attendance Ledger:** Subject-wise breakdown. Highlights attendance < 75% in vermillion red with detention warning advisory.
   - **Results & Grade Card:** Semester-wise SGPA and CGPA with individual course letter grades (O, A+, A, B+).
   - **Weekly Timetable:** Period-by-period class schedule with course codes and faculty rooms.
   - **Fees & Accounts:** Semester tuition fee ledger. Click **"Pay Fees Online"** to open interactive payment gateway modal. Complete simulated transaction and immediately receive downloadable invoice receipt (`UCEST-2026-FEE-XXXX`).

---

### Step 3: Faculty Instruction Desk Tour
1. Log out or navigate back to `/login`.
2. Click **Quick Fill: Faculty** (`FAC-CSE-102` / `faculty123`) and click **Authenticate Session**.
3. Land on `/portal/faculty`:
   - **Assigned Cohorts:** Select between assigned courses (`CS501PC` - Operating Systems, `CS502PC` - AI & ML).
   - **Attendance Register:** Interactive bulk attendance marking table with "Mark All Present", "Mark All Absent", and individual student toggles.
   - **Internal Marks Entry:** Enter Mid-1, Mid-2, and Assignment scores directly into student grade sheets.

---

### Step 4: Administrator Governance Console Tour
1. Log out or navigate back to `/login`.
2. Click **Quick Fill: Admin** (`admin` / `admin123`) and click **Authenticate Session**.
3. Land on `/portal/admin`:
   - **Overview & Metrics:** Live KPI statistic cards (Enrolled Scholars, Active Faculty, Live Notices, Server Uptime).
   - **Notice Management:** Publish new institutional notices, pin urgent notices to the public marquee, or archive stale circulars.
   - **Provision Users:** Form to create new user accounts with BCrypt hashing and assign roles (`ROLE_STUDENT`, `ROLE_FACULTY`, `ROLE_ADMIN`).

---

### Step 5: DevOps & Infrastructure Verification
1. **Docker Compose:**
   - Run `npm run docker:up` to spin up MySQL 8, Spring Boot 3 backend, and Nginx frontend.
   - Access application at `http://localhost:3000/`.
2. **Kubernetes Deployment:**
   - Manifests in `k8s/` validated via `kubectl kustomize k8s/`.
   - High availability guaranteed with **2 backend replicas** and **2 frontend replicas**.
   - Self-healing proven: deleting any backend pod causes the ReplicaSet to immediately spawn a replacement.
3. **Jenkins CI/CD Pipeline:**
   - Declarative `Jenkinsfile` runs all 6 stages (Checkout, Frontend, Backend, Docker, K8s, Selenium E2E).
4. **Selenium E2E Automated Tests:**
   - 5 Test classes in `e2e-tests/` testing Home, Exams, Student, Faculty, and Admin workflows.
   - Run via `node e2e-tests/runner.js` (13/13 passing routes).
5. **Nagios Monitoring:**
   - 5 active probes monitoring Frontend, Actuator health, MySQL database, and API latency.
   - Run `powershell -ExecutionPolicy Bypass -File monitoring/nagios/demo-failure-recovery.ps1` to empirically demonstrate OK → CRITICAL → RECOVERY state transitions.
