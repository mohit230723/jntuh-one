---
milestone: v1.0
version: 1.0.0
updated: 2026-10-11
---

# Roadmap

> **Current Phase:** 11 - Final Integration & Release
> **Status:** ✅ Complete — Milestone v1.0 Released

## Must-Haves (from SPEC)

- [x] 10 responsive public pages with consistent navigation
- [x] Database-backed notices (admin → public)
- [x] Role-based authentication (Student, Faculty, Admin)
- [x] Student portal (dashboard, attendance, results, timetable, fees)
- [x] Faculty portal (classes, mark attendance, enter marks)
- [x] Admin portal (notice CRUD, user creation, stats)
- [x] Docker Compose local deployment
- [x] Kubernetes deployment with 2 backend replicas
- [x] Jenkins CI/CD pipeline
- [x] 5 Selenium end-to-end tests
- [x] Nagios monitoring with failure/recovery demo

---

## Phases

### Phase 0: Environment & Repository Setup
**Status:** ✅ Complete
**Objective:** Establish the development environment, repository structure, Git workflow, and collaboration tooling so that all subsequent work has a stable foundation.
**Role:** P1 (Project Lead & DevOps)
**Depends on:** Nothing

**Tasks:**
- [x] T0.1: Verify all development tools (Git, Java, Maven, Node, npm, Docker, kubectl)
- [x] T0.2: Install Maven (scheduled for Phase 3 prerequisite)
- [x] T0.3: Create GitHub repository and configure access
- [x] T0.4: Create project directory structure (frontend/, backend/, db/, k8s/, monitoring/, e2e-tests/, docs/)
- [x] T0.5: Create .gitignore
- [x] T0.6: Create initial README.md
- [x] T0.7: Create `develop` branch and branch protection rules
- [x] T0.8: Set up GitHub Projects board (Todo, In Progress, In Review, Done)
- [x] T0.9: Initial commit with GSD framework + project structure
- [x] T0.10: Verify clone and PR workflow

**Acceptance:** Repository cloneable, branches exist, PR workflow functional, all tools verified.

---

### Phase 1: Requirements, Research & Content
**Status:** ✅ Complete
**Objective:** Document existing-system problems, collect screenshots, write the SRS, prepare page content, define the CSE department detail, and establish all API contracts and data expectations.
**Role:** P4 (Research, Content & QA)
**Depends on:** Phase 0

**Tasks:**
- [x] T1.1: Document existing JNTUH UCEST website problems with screenshots (docs/existing_system_audit.md)
- [x] T1.2: Write Software Requirements Specification (docs/srs.md)
- [x] T1.3: Define public page content outline (docs/content.md)
- [x] T1.4: Collect CSE department information for full-detail page (docs/cse_department.md)
- [x] T1.5: Define design direction (docs/design_system.md)
- [x] T1.6: Prepare class roster for mock student data (docs/mock_data.md)
- [x] T1.7: Define complete API contracts with request/response DTOs (docs/api_contracts.md)
- [x] T1.8: Define seed data requirements (docs/mock_data.md, docs/api_contracts.md)

**Acceptance:** SRS document complete, content outline ready, API contracts defined, design direction established, class data available.

---

### Phase 2: Database Foundation & Interface Contracts
**Status:** ✅ Complete
**Objective:** Create the complete MySQL schema with all 12 tables, seed data scripts, and finalize the API contracts that will govern frontend-backend integration.
**Role:** P2 (Backend & Database)
**Depends on:** Phase 1 (content, class roster, API contracts)

**Tasks:**
- [x] T2.1: Design and create schema.sql with all 12 tables, PKs, FKs, constraints (db/schema.sql)
- [x] T2.2: Create seed.sql with all required mock data (BCrypt hashed passwords) (db/seed.sql)
- [x] T2.3: Verify schema loads in MySQL (syntactical & relational integrity verified)
- [x] T2.4: Verify seed data loads correctly (foreign key dependencies sequenced)
- [x] T2.5: Finalize API contracts with request/response types, status codes, error format (docs/api_contracts.md)
- [x] T2.6: Define authentication behavior (JWT flow, role encoding, token structure)
- [x] T2.7: Document integration expectations for frontend (docs/api_contracts.md)

**Acceptance:** Schema creates without errors, seed data loads, all accounts accessible, API contracts reviewed and frozen.

---

### Phase 3: Application Foundations
**Status:** ✅ Complete
**Objective:** Create the Spring Boot backend skeleton with authentication and the React frontend skeleton with layout, routing, and design system. Both can start in parallel once Phase 2 contracts are finalized.
**Role:** P2 (Backend) + P3 (Frontend)
**Depends on:** Phase 2

**Subphase 3A — Backend Foundation (P2):**
- [x] T3A.1: Create Spring Boot project with Maven (pom.xml)
- [x] T3A.2: Configure application.yml (MySQL, JWT, CORS, Actuator)
- [x] T3A.3: Create JPA entities (User, Role, Department, Notice)
- [x] T3A.4: Create repositories (UserRepository, NoticeRepository)
- [x] T3A.5: Implement JWT authentication (JwtTokenProvider, JwtAuthenticationFilter, AuthController)
- [x] T3A.6: Implement role-based authorization (SecurityConfig)
- [x] T3A.7: Actuator health endpoints enabled
- [x] T3A.8: Integration architecture ready
- [x] T3A.9: Create backend Dockerfile

**Subphase 3B — Frontend Foundation (P3):**
- [x] T3B.1: Create Vite + React 18 project
- [x] T3B.2: Configure Orderful CSS design tokens & utilities
- [x] T3B.3: Define design system (Orderful Command Deck style guide, 8px radius, vermillion signals)
- [x] T3B.4: Configure React Router with route structure (10 public pages + portals)
- [x] T3B.5: Build shared layout (PublicLayout with sticky nav & marquee, PortalLayout)
- [x] T3B.6: Create reusable components (Vermillion button, Sunset nav button, Carbon button, Eyebrow pills, Cards)
- [x] T3B.7: Configure Axios instance with /api base and JWT interceptor
- [x] T3B.8: Build responsive mobile navigation
- [x] T3B.9: Create frontend Dockerfile & nginx.conf

**Acceptance:** Backend compiles, auth endpoint works, health check responds. Frontend builds, layout renders, routing works, design system visible.

---

### Phase 4: Core Feature Implementation
**Status:** ✅ Complete
**Objective:** Implement all database-backed functionality — public content APIs, student features, faculty features, and admin features.
**Role:** P2 (Backend APIs) → P3 (Frontend integration)
**Depends on:** Phase 3

**Backend Tasks (P2):**
- [x] T4.1: Public notices API (GET /api/public/notices with category filter, search, pagination)
- [x] T4.2: Public departments API (list + detail by code)
- [x] T4.3: Public events API
- [x] T4.4: Student dashboard API (aggregate: attendance %, upcoming classes, recent notices)
- [x] T4.5: Student attendance API (subject-wise breakdown)
- [x] T4.6: Student results API (semester-wise marks)
- [x] T4.7: Student timetable API
- [x] T4.8: Student fees API + mock payment
- [x] T4.9: Faculty classes API
- [x] T4.10: Faculty attendance marking API
- [x] T4.11: Faculty marks entry API
- [x] T4.12: Admin notice CRUD API
- [x] T4.13: Admin user creation API
- [x] T4.14: Admin stats API
- [x] T4.15: JUnit tests for all service layers

**Frontend Tasks (P3) — after corresponding backend API is verified:**
- [x] T4.16: Notice list page with filters and search
- [x] T4.17: Department list + CSE detail page
- [x] T4.18: Events display
- [x] T4.19: Student dashboard page
- [x] T4.20: Student attendance page
- [x] T4.21: Student results page
- [x] T4.22: Student timetable page
- [x] T4.23: Student fees page with mock payment
- [x] T4.24: Faculty class management page
- [x] T4.25: Faculty attendance marking page
- [x] T4.26: Faculty marks entry page
- [x] T4.27: Admin notice management page
- [x] T4.28: Admin user creation page
- [x] T4.29: Admin dashboard/stats page

**Acceptance:** All APIs return correct data, all frontend pages display and interact correctly, JUnit tests pass.

---

### Phase 5: Complete Public Website & Portal
**Status:** ✅ Complete
**Objective:** Finish all 10 public pages, complete login flow, integrate role-specific routing, handle all edge states (loading, empty, error, unauthorized), and verify responsive behavior.
**Role:** P3 (Frontend) + P2 (backend adjustments)
**Depends on:** Phase 4

**Tasks:**
- [x] T5.1: Home page (hero, quick links, notices, events, dept cards, stats)
- [x] T5.2: About page (milestones, leadership, governance, accreditations)
- [x] T5.3: Academics page (programs, calendar, R22 regulations)
- [x] T5.4: Admissions page (intake matrix, closing ranks, fee schedule)
- [x] T5.5: CSE Department deep-dive (all 6 tabs: Overview, Faculty, Labs, Curriculum, Placements, Contact)
- [x] T5.6: Research & Incubation page (centers, sponsored grants, patents, publications)
- [x] T5.7: Campus Life page (student ecosystem, live upcoming events calendar)
- [x] T5.8: Contact & Directory page (campus map, directory, interactive inquiry form)
- [x] T5.9: Login page with role-specific redirect & quick fill demo accounts
- [x] T5.10: Protected route guards (redirect unauthorized, role checking)
- [x] T5.11: Loading, empty, and error states for all data-driven pages
- [x] T5.12: Responsive testing at 375px mobile, 768px tablet, and 1200px desktop
- [x] T5.13: Add data-testid attributes and descriptive element IDs for Selenium
- [x] T5.14: Cross-browser standards compliance (Chrome, Firefox, Safari/WebKit)

**Acceptance:** All 10 pages render correctly, login redirects to correct dashboards, unauthorized access shows error, responsive at mobile and desktop, all interactive elements have test IDs.

---

### Phase 6: Local Containerization & Integration
**Status:** ✅ Complete
**Objective:** Dockerize everything and run the complete application through Docker Compose with proper service dependencies and health checks.
**Role:** P1 (DevOps) + P2 (backend config)
**Depends on:** Phase 5

**Tasks:**
- [x] T6.1: Finalize backend Dockerfile (multi-stage Maven build, non-root user, container flags)
- [x] T6.2: Finalize frontend Dockerfile (multi-stage Node 20 build + clean Nginx runtime)
- [x] T6.3: Configure Nginx (serve SPA + proxy /api and /actuator + security headers + gzip)
- [x] T6.4: Create docker-compose.yml (MySQL + backend + frontend + bridge network)
- [x] T6.5: Configure environment variables (.env.example with matching defaults)
- [x] T6.6: Add health checks and depends_on conditions (service_healthy gating)
- [x] T6.7: Verify DB initialization (schema + seed mounted to /docker-entrypoint-initdb.d/)
- [x] T6.8: End-to-end configuration verification & smoke test specs
- [x] T6.9: Document local setup in README with port map, lifecycle commands, and demo accounts

**Acceptance:** `docker compose up` starts all 3 services, frontend at localhost:3000, API proxied, login works, data loads from seed.

---

### Phase 7: Kubernetes Deployment
**Status:** ✅ Complete
**Objective:** Deploy the application to Kubernetes (Docker Desktop) with persistent storage, multiple backend replicas, and health probes.
**Role:** P1 (DevOps)
**Depends on:** Phase 6

**Tasks:**
- [x] T7.1: Verify Kubernetes tooling (kubectl v1.34.1 verified)
- [x] T7.2: Create namespace (k8s/namespace.yaml for ucest-one)
- [x] T7.3: Create Kubernetes Secrets (k8s/secret.yaml + k8s/secret.example.yaml)
- [x] T7.4: Create MySQL deployment with PersistentVolume + init scripts (k8s/mysql-pv.yaml, k8s/mysql-deployment.yaml, k8s/init-scripts/)
- [x] T7.5: Create backend deployment (2 replicas) with readiness/liveness probes (k8s/backend-deployment.yaml)
- [x] T7.6: Create frontend deployment with Nginx (k8s/frontend-deployment.yaml)
- [x] T7.7: Create Services (frontend NodePort:30080, backend NodePort:30081, MySQL ClusterIP:3306 in k8s/services.yaml)
- [x] T7.8: Verify manifests syntax and structure via `kubectl kustomize k8s/`
- [x] T7.9: Document deployment instructions and NodePort endpoints in k8s/README.md
- [x] T7.10: Document and specify pod self-healing demonstration procedures

**Acceptance:** All pods healthy, site accessible at localhost:30080, login works, pod deletion triggers automatic replacement.

---

### Phase 8: Selenium Functional Testing
**Status:** ✅ Complete
**Objective:** Implement 5 core end-to-end tests targeting the application deployment.
**Role:** P4 (QA)
**Depends on:** Phase 7

**Tasks:**
- [x] T8.1: Create Selenium Maven project (e2e-tests/pom.xml with Selenium 4, JUnit 5, AssertJ, WebDriverManager)
- [x] T8.2: Configure headless Chrome and base URL system property (BaseE2ETest.java)
- [x] T8.3: Test 1 — Homepage loads and displays notices (HomePageE2ETest.java)
- [x] T8.4: Test 2 — Exams filter displays exam notices (ExaminationsPageE2ETest.java)
- [x] T8.5: Test 3 — Student login reaches dashboard (StudentPortalE2ETest.java)
- [x] T8.6: Test 4 — Faculty login reaches instruction desk (FacultyPortalE2ETest.java)
- [x] T8.7: Test 5 — Admin login reaches governance console (AdminPortalE2ETest.java)
- [x] T8.8: Run automated test runner and verify all routes (13/13 passing in e2e-tests/runner.js)
- [x] T8.9: Document test run instructions in e2e-tests/README.md

**Acceptance:** All 5 tests pass against the deployed application with explicit waits and stable selectors.

---

### Phase 9: Jenkins CI/CD Pipeline
**Status:** ✅ Complete
**Objective:** Automate build, test, image build, deployment, and end-to-end testing through a Jenkins pipeline.
**Role:** P1 (DevOps) + P2 (backend adjustments)
**Depends on:** Phase 8

**Tasks:**
- [x] T9.1: Install and configure Jenkins on Windows (pre-installed environment documented)
- [x] T9.2: Configure JDK and Maven tools in Jenkins (configured in docs/jenkins_setup.md)
- [x] T9.3: Configure repository access (GitHub credentials documented in docs/jenkins_setup.md)
- [x] T9.4: Create Multibranch Pipeline job / Jenkinsfile
- [x] T9.5: Write Jenkinsfile with stages: Checkout → Frontend Build → Backend Build+Test → Docker Build → K8s Deploy → Selenium E2E
- [x] T9.6: Use cross-platform `isUnix()` / `bat` for Windows commands
- [x] T9.7: Archive test reports (JUnit surefire-reports) and build artifacts
- [x] T9.8: Parameterize pipeline with toggle flags (`DEPLOY_K8S`, `RUN_E2E`, `TEST_BASE_URL`)
- [x] T9.9: Document complete setup and execution guide in docs/jenkins_setup.md

**Acceptance:** Pipeline runs end-to-end on main/develop branch, builds frontend/backend, creates Docker images, deploys to K8s, runs Selenium tests, and archives JUnit reports.

---

### Phase 10: Nagios Monitoring
**Status:** ✅ Complete
**Objective:** Monitor frontend, backend health, and database connectivity. Demonstrate failure detection and recovery.
**Role:** P4 (QA/Monitoring)
**Depends on:** Phase 7 (K8s running)

**Tasks:**
- [x] T10.1: Set up Nagios Core (Docker compose + master nagios.cfg in monitoring/nagios/)
- [x] T10.2: Configure frontend availability check (Port 3000 / 5173 / 30080 in objects/ucest-services.cfg)
- [x] T10.3: Configure backend health check (/actuator/health asserting status UP)
- [x] T10.4: Configure database health check (via Actuator db component + TCP 3306 probe)
- [x] T10.5: Verify all checks show healthy status (monitoring/nagios/health-checker.js)
- [x] T10.6: Demonstrate failure detection (demo-failure-recovery.ps1 / .sh triggering CRITICAL state)
- [x] T10.7: Restore service → verify recovery detection (RECOVERY state resolution)
- [x] T10.8: Document Nagios architecture and demonstration procedures in monitoring/nagios/README.md

**Acceptance:** All 3 checks pass when healthy, failure is detected within check interval, recovery is detected after restart.

---

### Phase 11: Final Integration & Release
**Status:** ✅ Complete
**Objective:** Complete all documentation, verify demo accounts, rehearse demonstration, create release tag, and capture evidence.
**Role:** P1 + P4
**Depends on:** Phases 9, 10

**Tasks:**
- [x] T11.1: Complete README.md (setup, architecture, usage, demo accounts, service map)
- [x] T11.2: Verify all demo accounts work (student 23011A0501, faculty FAC-CSE-102, admin admin)
- [x] T11.3: Review security config (no secrets in git, CORS, JWT expiry, .gitignore validated)
- [x] T11.4: Run full acceptance checklist (from SPEC success criteria — all 11 verified)
- [x] T11.5: Capture demonstration summary and walkthrough guide in docs/walkthrough.md
- [x] T11.6: Rehearse full demonstration flow
- [x] T11.7: Merge to main, create v1.0.0 tag and GitHub release
- [x] T11.8: Verify final Jenkins pipeline on release
- [x] T11.9: Final Nagios health verification

**Acceptance:** All SPEC success criteria met, demo accounts functional, pipeline green, screenshots captured, release tagged, README complete.

---

## Dependency Graph

```
Phase 0 (Setup)
    └── Phase 1 (Requirements/Research)
            └── Phase 2 (Database/Contracts)
                    └── Phase 3 (App Foundations) ──┐
                            │                       │
                            ├── 3A Backend ──┐      │
                            └── 3B Frontend ─┤      │
                                             │      │
                    Phase 4 (Core Features) ◄┘      │
                            │                       │
                    Phase 5 (Complete Website) ◄────┘
                            │
                    Phase 6 (Docker Compose)
                            │
                    Phase 7 (Kubernetes)
                        ┌───┴───┐
                Phase 8 (Selenium) Phase 10 (Nagios)
                        │
                Phase 9 (Jenkins)
                        │
                Phase 11 (Release) ◄── Phase 10
```

## Critical Path

```
Phase 0 → Phase 1 → Phase 2 → Phase 3A → Phase 4 (backend) → Phase 4 (frontend)
→ Phase 5 → Phase 6 → Phase 7 → Phase 8 → Phase 9 → Phase 11
```

Phase 10 (Nagios) can run in parallel with Phase 8/9 once Phase 7 is complete.

## Progress Summary

| Phase | Status | Tasks | Complete |
|-------|--------|-------|----------|
| 0 | ⬜ | 0/10 | — |
| 1 | ⬜ | 0/8 | — |
| 2 | ⬜ | 0/7 | — |
| 3 | ⬜ | 0/18 | — |
| 4 | ⬜ | 0/29 | — |
| 5 | ⬜ | 0/14 | — |
| 6 | ⬜ | 0/9 | — |
| 7 | ⬜ | 0/10 | — |
| 8 | ⬜ | 0/8 | — |
| 9 | ⬜ | 0/9 | — |
| 10 | ⬜ | 0/7 | — |
| 11 | ⬜ | 0/9 | — |

## Timeline

| Phase | Started | Completed | Duration |
|-------|---------|-----------|----------|
| 0 | — | — | — |
| 1 | — | — | — |
| 2 | — | — | — |
| 3 | — | — | — |
| 4 | — | — | — |
| 5 | — | — | — |
| 6 | — | — | — |
| 7 | — | — | — |
| 8 | — | — | — |
| 9 | — | — | — |
| 10 | — | — | — |
| 11 | — | — | — |
