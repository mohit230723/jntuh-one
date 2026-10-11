# UCEST One — Comprehensive Engineering & Operations Guide

> **UCEST One** is the next-generation unified university portal and institutional web platform for **University College of Engineering, Science and Technology Hyderabad (JNTUH UCEST)**.  
> This document provides an exhaustive breakdown of the project architecture, required tools and environment, step-by-step installation, configuration tuning, execution workflows, and cloud deployment guides to share the live frontend with friends and evaluators.

---

## Table of Contents

1. [What This Project Contains](#1-what-this-project-contains)
   - [System Architecture](#system-architecture)
   - [The 10 Public Pages](#the-10-public-pages)
   - [Computer Science & Engineering (CSE) Deep Dive](#computer-science--engineering-cse-deep-dive)
   - [Role-Based Portals (Command Desks)](#role-based-portals-command-desks)
   - [Backend REST API & Security Architecture](#backend-rest-api--security-architecture)
   - [Database Layer](#database-layer)
   - [DevOps, Containerization & Infrastructure Monitoring](#devops-containerization--infrastructure-monitoring)
2. [Design System: Orderful Industrial Command Deck](#2-design-system-orderful-industrial-command-deck)
3. [Required Tools & Environment](#3-required-tools--environment)
4. [Step-by-Step Installation & Setup](#4-step-by-step-installation--setup)
5. [Configuration & Changes to Make](#5-configuration--changes-to-make)
   - [Environment Variables (.env)](#environment-variables-env)
   - [Database Connection Settings](#database-connection-settings)
   - [Backend Application Properties](#backend-application-properties)
   - [Frontend API Proxy Configuration](#frontend-api-proxy-configuration)
6. [How to Run the Project (All Execution Modes)](#6-how-to-run-the-project-all-execution-modes)
   - [Mode 1: Rapid Frontend Dev Server (Active Now)](#mode-1-rapid-frontend-dev-server-active-now)
   - [Mode 2: Full Local Stack (Vite + Spring Boot + MySQL)](#mode-2-full-local-stack-vite--spring-boot--mysql)
   - [Mode 3: Multi-Container Docker Compose Stack](#mode-3-multi-container-docker-compose-stack)
   - [Mode 4: Kubernetes Local Cluster (2 Backend Replicas)](#mode-4-kubernetes-local-cluster-2-backend-replicas)
   - [Mode 5: Nagios Core Infrastructure Monitoring](#mode-5-nagios-core-infrastructure-monitoring)
   - [Mode 6: Automated Route & Selenium E2E Testing](#mode-6-automated-route--selenium-e2e-testing)
7. [Demo Accounts & Login Presets](#7-demo-accounts--login-presets)
8. [How to Deploy for Friends to See the Frontend](#8-how-to-deploy-for-friends-to-see-the-frontend)
   - [Method 1: Instant 30-Second Tunnel (No Sign-up, Laptop Must Be On)](#method-1-instant-30-second-tunnel-no-sign-up-laptop-must-be-on)
   - [Method 2: Permanent Free Cloud Hosting via Vercel (Recommended)](#method-2-permanent-free-cloud-hosting-via-vercel-recommended)
   - [Method 3: Instant Drag & Drop via Netlify Drop](#method-3-instant-drag--drop-via-netlify-drop)
   - [Method 4: Mobile / LAN Testing on the Same Wi-Fi](#method-4-mobile--lan-testing-on-the-same-wi-fi)
9. [Troubleshooting Common Issues](#9-troubleshooting-common-issues)

---

## 1. What This Project Contains

UCEST One bridges the gap between public university visibility and high-density academic operations by replacing fragmented legacy web pages with a unified, high-performance platform.

### System Architecture

```
                                  ┌───────────────────────────┐
                                  │   Browser / Mobile Client │
                                  └─────────────┬─────────────┘
                                                │
                                  ┌─────────────▼─────────────┐
                                  │   Nginx Reverse Proxy     │
                                  │   (Port 3000 / Port 5173) │
                                  └──────┬─────────────┬──────┘
                   Static Assets / SPA   │             │ /api/*, /actuator/*
                                         │             │
                ┌────────────────────────▼───┐   ┌─────▼─────────────────────────┐
                │   React 18 SPA (Vite 5)    │   │   Spring Boot 3.2.5 REST API  │
                │   Orderful Design Tokens   │   │   Spring Security 6 (JWT)     │
                │   10 Pages + 3 Portals     │   │   Spring Data JPA (Java 17)   │
                └────────────────────────────┘   └─────────────┬─────────────────┘
                                                               │
                                                 ┌─────────────▼─────────────────┐
                                                 │   MySQL 8.0 Relational DB     │
                                                 │   12 Normalized Tables        │
                                                 │   BCrypt Password Hashes      │
                                                 └───────────────────────────────┘
```

---

### The 10 Public Pages

Every public route is designed with responsive breakpoints down to 375px mobile screens, semantic HTML5, and unique IDs:

| Page Route | Component | Key Highlights |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Hero command terminal, live notice feed with category filters, key metrics (98.4% placement, 45+ labs), quick portal cards |
| `/about` | `About.jsx` | Institutional heritage, leadership profiles (Principal & Vice-Principal), governance structure, accreditation badges |
| `/academics` | `Academics.jsx` | 6 B.Tech & 8 M.Tech program specifications, AICTE compliance, Academic Regulations (R22/R18), grading rules |
| `/admissions` | `Admissions.jsx` | TS EAMCET / ECET / PGECET cutoffs, intake seat matrix (60 Regular + 6 Lateral per branch), fee breakdown |
| `/departments/cse`| `CseDepartment.jsx` | **Featured department deep-dive** with 6 interactive operational tabs (see details below) |
| `/examinations` | `Examinations.jsx` | Searchable notice board, semester timetable downloads, hall ticket alerts, revaluation protocols |
| `/research` | `Research.jsx` | 4 Advanced Research Centers (AI/ML, IoT, Cyber Defense, VLSI), funded projects, patent registry |
| `/campus-life` | `CampusLife.jsx` | Student clubs, technical symposiums (PULSE), central library stats, sports complexes, hostel info |
| `/contact` | `Contact.jsx` | Campus directory, department HOD extensions, emergency lines, interactive inquiry form with instant validation |
| `/login` | `Login.jsx` | Unified authentication terminal with role tabs (Student, Faculty, Admin) and 1-click **Quick-Fill presets** |

---

### Computer Science & Engineering (CSE) Deep Dive

Located at `/departments/cse`, this interactive flagship department console features 6 dedicated tabs:
1. **Curriculum:** Semester-wise R22 syllabus with course codes, lecture/practical credits, and syllabus breakdown.
2. **Faculty:** Directory of 28 faculty members with PhD credentials, specializations, Google Scholar links, and direct email contacts.
3. **Laboratories:** 8 specialized laboratories (AI & Deep Learning, Distributed Cloud Lab, IoT Systems, Networks & Cybersecurity) with hardware specs and server configurations.
4. **Research & Publications:** Active research grants (DST-SERB, AICTE RPS), published IEEE/ACM papers, and ongoing student patents.
5. **Placements:** 4-year placement history, top tier-1 recruiters (Microsoft, Amazon, Oracle, Google, TCS Digital), median salary metrics (8.5 LPA), and highest packages (44 LPA).
6. **Student Gallery & Innovations:** Hackathon wins, open-source projects, and student tech community initiatives.

---

### Role-Based Portals (Command Desks)

Authenticated behind stateless JWT security tokens:

* **Student Command Desk (`/portal/student`):**
  - **Academic Dashboard:** Live semester attendance percentage with automated visual warnings for $<75\%$ condonation risk.
  - **Semester Results Ledger:** SGPA/CGPA performance cards, grade breakdown per subject, and marks history.
  - **Class Timetable:** Interactive Monday–Friday hourly schedule with room numbers and faculty names.
  - **Fee Dues & Payment Ledger:** Tuition and exam fees balance tracking with simulated mock payment receipt generator.

* **Faculty Instruction Desk (`/portal/faculty`):**
  - **Course Management:** Assigned section overview (CSE-A, CSE-B) and registered student count.
  - **Interactive Attendance Register:** Daily attendance marking grid with batch "Mark All Present", toggle single absences, and real-time computation.
  - **Internal Marks Entry:** Formative and internal test mark entry with threshold validation.

* **Admin Governance Console (`/portal/admin`):**
  - **System Metrics:** Real-time counters of registered students, active faculty, and published notices.
  - **Institutional Notice Dispatcher:** Create, categorize (Academic, Examination, Event, Urgent), publish, and archive notices with instantaneous board reflection.
  - **User Provisioning:** Create new student and faculty accounts with role assignments and validation.

---

### Backend REST API & Security Architecture

Built with **Spring Boot 3.2.5** and **Java 17/25**:
* **Stateless JWT Authentication:**
  - `/api/auth/login`: Issues HS256-signed JWT token valid for 2 hours.
  - `/api/auth/me`: Decodes `SecurityContextHolder` to return current user profile and role authority (`ROLE_STUDENT`, `ROLE_FACULTY`, `ROLE_ADMIN`).
* **Controllers & Endpoints:**
  - `AuthController`: User credential authentication and token renewal.
  - `NoticeController`: Public retrieval, filtered category queries, and admin CRUD operations.
  - `StudentController`: Student academic profile, enrolled courses, attendance records, exam results, and fee transactions.
  - `FacultyController`: Faculty profile, assigned teaching courses, roster lists, and grade updates.
  - `DepartmentController`: Department metadata, faculty directories, curriculum catalogs, and lab configurations.
* **Actuator Health & Metrics:**
  - `/actuator/health`: Exposes component health (`db`, `diskSpace`, `ping`).

---

### Database Layer

Defined in [`db/schema.sql`](file:///d:/jn-one/db/schema.sql) and seeded via [`db/seed.sql`](file:///d:/jn-one/db/seed.sql):
* **12 Normalized Relational Tables:**
  1. `users` — Authentication credentials with BCrypt hashes and assigned roles.
  2. `departments` — Academic departments (CSE, ECE, EEE, MECH, CIVIL, IT).
  3. `students` — Enrollment records, roll numbers, admission years, current semester.
  4. `faculty` — Employee IDs, designations, specializations, qualifications.
  5. `courses` — Course codes, titles, credits, lecture/practical hours.
  6. `enrollments` — Student course registrations per academic year.
  7. `attendance` — Session-by-session attendance logs with timestamps and status.
  8. `marks` — Internal and end-semester grades, credit points, and grade points.
  9. `timetables` — Weekly class schedule, time slots, days of week, room numbers.
  10. `fees` — Fee breakdown, due dates, paid amounts, payment statuses (`PAID`, `PARTIAL`, `DUE`).
  11. `notices` — Institutional notices with priority flags, expiry dates, and categories.
  12. `department_labs` — Specialized laboratory facilities and hardware configurations.

---

### DevOps, Containerization & Infrastructure Monitoring

* **Docker & Docker Compose:**
  - `backend/Dockerfile`: Multi-stage build (`maven:3.9.6-eclipse-temurin-17-alpine` -> `eclipse-temurin:17-jre-alpine`) executing under non-root `ucest:ucest` user.
  - `frontend/Dockerfile`: Multi-stage build (Node 20 Alpine -> Nginx 1.25 Alpine) with gzip compression and reverse proxy.
  - `docker-compose.yml`: Coordinates `ucest-mysql` (MySQL 8), `ucest-backend`, and `ucest-frontend` on bridge network `ucest-network`.
* **Kubernetes (K8s):**
  - High-availability backend deployment with **2 replicas**, rolling update policy, and Actuator liveness/readiness probes.
  - 5Gi HostPath PersistentVolume and PVC for MySQL storage.
  - NodePort services exposing the frontend on port `30080` and backend on port `30081`.
* **Nagios Core Infrastructure Probes:**
  - Probes web tier, Actuator health, database components, MySQL port 3306 socket, and Public Notices API latency.
  - Automated PowerShell and Bash failure & recovery demonstration scripts.
* **CI/CD Pipeline:**
  - Cross-platform declarative `Jenkinsfile` compatible with Windows (`bat`) and Linux (`sh`).

---

## 2. Design System: Orderful Industrial Command Deck

The user interface follows the **Orderful Industrial Command Deck** design philosophy:
* **Surfaces:** Achromatic palette consisting of Vellum (`#f6f5f1`), Clean Paper (`#ffffff`), and Carbon (`#121316`).
* **Universal 8px Radius:** Every card, button, modal, form input, and table pill strictly adheres to `border-radius: 8px;`.
* **Typography:** Modern grotesk sans-serif with tight tracking (`-0.025em`) on display headings, and clean tabular monospacing for roll numbers, GPA, and timestamps.
* **Surgical Vermillion Accent (`#e42b0c`):** Reserved strictly for primary call-to-actions, urgent notice signals, and active interactive tab indicators.

---

## 3. Required Tools & Environment

Depending on what you want to run, here are the required tools:

### Minimal Setup (Frontend Only / View & Test Right Now)
* **Node.js:** v18.0.0 or higher (v20+ or v22 LTS recommended).
* **Package Manager:** `npm` (comes bundled with Node.js).
* **Web Browser:** Any modern browser (Chrome, Edge, Firefox, Brave, Safari).

### Full-Stack Local Development Setup (Backend + Database)
* **Java Development Kit (JDK):** JDK 17 or higher (Java 25 runtime supported; project targets Java 17 bytecode).
* **Build Tool:** Maven (or use the included `mvnw.cmd` / `./mvnw` wrapper).
* **Database:** MySQL Server 8.0 installed locally (listening on port 3306).

### Containerized & DevOps Deployment Setup
* **Docker Desktop:** Version 4.28+ / Engine 24+ with **WSL 2 backend enabled** on Windows.
* **Kubernetes (Optional):** Docker Desktop Kubernetes option enabled, or Minikube / Kind.
* **Jenkins (Optional):** Jenkins 2.440+ installed locally on Windows or running in Docker.

---

## 4. Step-by-Step Installation & Setup

### Step 1: Clone the Repository
Open PowerShell or your preferred terminal:
```powershell
git clone https://github.com/mohit230723/jntuh-one.git
cd jntuh-one
```

### Step 2: Install Node Dependencies
Install root project dependencies and frontend packages:
```powershell
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 3: Initialize Environment Variables
Ensure the local `.env` file exists:
```powershell
# On Windows PowerShell:
Copy-Item .env.example .env

# On Linux / macOS:
cp .env.example .env
```

---

## 5. Configuration & Changes to Make

### Environment Variables (`.env`)
The `.env` file in the root folder controls all runtime ports and database credentials:

```env
# === Database (MySQL 8) ===
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=ucest_one
MYSQL_USER=ucest_user
MYSQL_PASSWORD=ucest_password

# === Backend Service ===
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/ucest_one?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=root
JWT_SECRET=UcestOneSecretKeyForJwtSigningMustBeAtLeast256BitsLong2026!
JWT_EXPIRATION=7200000

# === Frontend Service ===
VITE_API_BASE_URL=/api
PORT=3000
```

> **What to change:**
> - If your local MySQL root password is not `root`, update `SPRING_DATASOURCE_PASSWORD` and `MYSQL_ROOT_PASSWORD` in `.env`.
> - If running backend via Docker, `SPRING_DATASOURCE_URL` uses hostname `db` instead of `localhost`.

### Database Initialization (For Local MySQL without Docker)
If you are running a native MySQL server installed on your machine:
```powershell
# Connect to your local MySQL CLI:
mysql -u root -p

# Inside MySQL prompt:
CREATE DATABASE ucest_one CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;

# Execute schema and seed data:
mysql -u root -p ucest_one < db/schema.sql
mysql -u root -p ucest_one < db/seed.sql
```

---

## 6. How to Run the Project (All Execution Modes)

### Mode 1: Rapid Frontend Dev Server (Active Now)
The fastest way to test and interact with the UI:
```powershell
npm run dev
```
* **Live Address:** `http://localhost:5173/`
* **Features:** Hot Module Reloading (HMR), instantaneous updates upon editing any component, mock authentication fallbacks so all portals work out-of-the-box even without a running database.

---

### Mode 2: Full Local Stack (Vite + Spring Boot + MySQL)
Run both backend and frontend concurrently:
```powershell
# In terminal 1 (start backend API):
cd backend
.\mvnw.cmd spring-boot:run

# In terminal 2 (start frontend):
npm run dev
```
* **Frontend:** `http://localhost:5173/`
* **Backend REST API:** `http://localhost:8080/api`
* **Actuator Health Metrics:** `http://localhost:8080/actuator/health`

---

### Mode 3: Multi-Container Docker Compose Stack
To run MySQL 8, Spring Boot 3, and Nginx in container isolation:

1. **Ensure Docker Desktop is running:**
   Launch Docker Desktop from your Windows Start menu and verify the whale icon in the taskbar is steady green.
2. **Launch the stack:**
   ```powershell
   npm run docker:up
   # Or directly: docker compose up --build
   ```
3. **Access Services:**
   - **Frontend Web UI:** `http://localhost:3000/`
   - **Backend API:** `http://localhost:8080/`
   - **MySQL Database:** `localhost:3306`

---

### Mode 4: Kubernetes Local Cluster (2 Backend Replicas)
Deploy to a local Kubernetes cluster (Docker Desktop K8s or Minikube):
```powershell
# Apply all manifests via Kustomize:
kubectl apply -k k8s/

# Verify running pods:
kubectl get pods -n ucest-one
```
* **Frontend NodePort:** `http://localhost:30080/`
* **Backend NodePort:** `http://localhost:30081/`

---

### Mode 5: Nagios Core Infrastructure Monitoring
To run the automated failure detection and recovery verification:
```powershell
powershell -ExecutionPolicy Bypass -File monitoring/nagios/demo-failure-recovery.ps1
```
*(Demonstrates Nagios detecting service interruption and validating recovery with exit code 0).*

---

### Mode 6: Automated Route & Selenium E2E Testing
* **Automated Route Runner (Fast):**
  ```powershell
  npm run test:e2e
  ```
  *(Checks all 13 public and protected routes — executes in <2 seconds).*
* **Selenium 4 Functional E2E Suite (Headless Chrome):**
  ```powershell
  npm run test:e2e:maven
  ```

---

## 7. Demo Accounts & Login Presets

Pre-configured seed accounts are ready for testing on the `/login` screen:

| Role | Roll No / Username | Password | Purpose & Scope |
| :--- | :--- | :--- | :--- |
| **Student** | `23011A0501` | `Student@123` | B.Tech CSE Year III — View attendance (88%), SGPA (8.72), timetable, fee receipts |
| **Faculty** | `FAC-CSE-102` | `Faculty@123` | Associate Professor — View courses, take student attendance, enter internal marks |
| **Admin** | `admin` | `Admin@123` | Dean / Registrar — Publish notices, manage user accounts, review campus statistics |

> 💡 **Quick-Fill Buttons:** On the `/login` page, you can simply click the **"Quick Fill Student"**, **"Quick Fill Faculty"**, or **"Quick Fill Admin"** buttons to auto-populate credentials instantly.

---

## 8. How to Deploy for Friends to See the Frontend

Here are the 4 ways you can share the project right now:

### Method 1: Instant 30-Second Tunnel (No Sign-up, Laptop Must Be On)
While your dev server is running on `http://localhost:5173/`:

1. Open a new PowerShell terminal and run:
   ```powershell
   npx localtunnel --port 5173
   ```
2. It will output a public URL like:
   ```text
   your url is: https://lucky-badger-42.loca.lt
   ```
3. Send this link to your friends!  
   *(When they open it for the first time, it asks for the tunnel password: your public IP address, which you can check at [whatismyipaddress.com](https://whatismyipaddress.com)).*

*Alternative with Ngrok:*
```powershell
npx ngrok http 5173
```

---

### Method 2: Permanent Free Cloud Hosting via Vercel (Recommended)
This gives you a permanent, 24/7 public link (e.g. `https://jntuh-one.vercel.app`) that stays online even when your laptop is turned off.

1. Go to **[vercel.com](https://vercel.com)** and sign in with your GitHub account.
2. Click **"Add New..."** -> **"Project"**.
3. Locate your repository **`mohit230723/jntuh-one`** and click **Import**.
4. Configure the build settings:
   - **Root Directory:** Click "Edit" and choose `frontend` (or leave root if Vercel detects it).
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.
6. Within 45 seconds, Vercel gives you a live global HTTPS URL!

*(Note: We have already added [`frontend/vercel.json`](file:///d:/jn-one/frontend/vercel.json) to the repository so all SPA routes like `/departments/cse` and `/portal/student` work perfectly on page refresh without 404 errors!)*

---

### Method 3: Instant Drag & Drop via Netlify Drop (No GitHub Required)
1. Build the production bundle on your laptop:
   ```powershell
   npm run build:frontend
   ```
   *(This creates a optimized production folder at `d:\jn-one\frontend\dist`).*
2. Open your browser and go to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
3. Drag and drop the `d:\jn-one\frontend\dist` folder onto the web page.
4. Netlify will deploy it in 10 seconds and generate a live shareable URL!

---

### Method 4: Mobile / LAN Testing on the Same Wi-Fi
To open the frontend on your phone or let friends connected to your home/college Wi-Fi see it:

1. Start Vite with the host flag:
   ```powershell
   cd frontend
   npm run dev -- --host
   ```
2. The terminal will print:
   ```text
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://192.168.1.15:5173/
   ```
3. Anyone connected to the same Wi-Fi can type that `http://192.168.X.X:5173/` address on their phone or laptop and see UCEST One instantly!

---

## 9. Troubleshooting Common Issues

* **Issue: `failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine`**  
  *Cause:* Docker Desktop application is not started on Windows.  
  *Fix:* Open Docker Desktop from the Start menu and wait until the bottom-left indicator turns green before running `npm run docker:up`.

* **Issue: `kubectl error validating data: failed to download openapi`**  
  *Cause:* Kubernetes cluster is not turned on.  
  *Fix:* In Docker Desktop Settings, go to **Kubernetes** and check **"Enable Kubernetes"** -> Apply & Restart.

* **Issue: Page Refresh shows 404 on Hosted Cloud**  
  *Cause:* Single-Page Applications (SPA) require server rewrites to `index.html`.  
  *Fix:* Handled automatically via [`frontend/vercel.json`](file:///d:/jn-one/frontend/vercel.json) and [`frontend/public/_redirects`](file:///d:/jn-one/frontend/public/_redirects).

---

## 10. Summary & Repository Links

- **GitHub Repository:** [https://github.com/mohit230723/jntuh-one](https://github.com/mohit230723/jntuh-one)
- **Active Dev Branch:** `develop`
- **Production Release Tag:** `v1.0.0` on `main`
- **Interactive Walkthrough Guide:** [`docs/walkthrough.md`](file:///d:/jn-one/docs/walkthrough.md)
- **API Specifications:** [`docs/api_contracts.md`](file:///d:/jn-one/docs/api_contracts.md)
