---
milestone: v1.0
version: 1.0.0
updated: 2026-10-11
---

# Roadmap

> **Current Phase:** 0 - Environment & Repository Setup
> **Status:** planning

## Must-Haves (from SPEC)

- [ ] 10 responsive public pages with consistent navigation
- [ ] Database-backed notices (admin → public)
- [ ] Role-based authentication (Student, Faculty, Admin)
- [ ] Student portal (dashboard, attendance, results, timetable, fees)
- [ ] Faculty portal (classes, mark attendance, enter marks)
- [ ] Admin portal (notice CRUD, user creation, stats)
- [ ] Docker Compose local deployment
- [ ] Kubernetes deployment with 2 backend replicas
- [ ] Jenkins CI/CD pipeline
- [ ] 5 Selenium end-to-end tests
- [ ] Nagios monitoring with failure/recovery demo

---

## Phases

### Phase 0: Environment & Repository Setup
**Status:** ⬜ Not Started
**Objective:** Establish the development environment, repository structure, Git workflow, and collaboration tooling so that all subsequent work has a stable foundation.
**Role:** P1 (Project Lead & DevOps)
**Depends on:** Nothing

**Tasks:**
- [ ] T0.1: Verify all development tools (Git, Java, Maven, Node, npm, Docker, kubectl)
- [ ] T0.2: Install Maven
- [ ] T0.3: Create GitHub repository and configure access
- [ ] T0.4: Create project directory structure (frontend/, backend/, db/, k8s/, monitoring/, e2e-tests/, docs/)
- [ ] T0.5: Create .gitignore
- [ ] T0.6: Create initial README.md
- [ ] T0.7: Create `develop` branch and branch protection rules
- [ ] T0.8: Set up GitHub Projects board (Todo, In Progress, In Review, Done)
- [ ] T0.9: Initial commit with GSD framework + project structure
- [ ] T0.10: Verify clone and PR workflow

**Acceptance:** Repository cloneable, branches exist, PR workflow functional, all tools verified.

---

### Phase 1: Requirements, Research & Content
**Status:** ⬜ Not Started
**Objective:** Document existing-system problems, collect screenshots, write the SRS, prepare page content, define the CSE department detail, and establish all API contracts and data expectations.
**Role:** P4 (Research, Content & QA)
**Depends on:** Phase 0

**Tasks:**
- [ ] T1.1: Document existing JNTUH UCEST website problems with screenshots
- [ ] T1.2: Write Software Requirements Specification (docs/srs.md)
- [ ] T1.3: Define public page content outline (docs/content.md)
- [ ] T1.4: Collect CSE department information for full-detail page
- [ ] T1.5: Define design direction (navy-and-gold palette, typography, component patterns)
- [ ] T1.6: Prepare class roster for mock student data
- [ ] T1.7: Define complete API contracts with request/response DTOs
- [ ] T1.8: Define seed data requirements (admin, faculty, students, subjects, etc.)

**Acceptance:** SRS document complete, content outline ready, API contracts defined, design direction established, class data available.

---

### Phase 2: Database Foundation & Interface Contracts
**Status:** ⬜ Not Started
**Objective:** Create the complete MySQL schema with all 12 tables, seed data scripts, and finalize the API contracts that will govern frontend-backend integration.
**Role:** P2 (Backend & Database)
**Depends on:** Phase 1 (content, class roster, API contracts)

**Tasks:**
- [ ] T2.1: Design and create schema.sql with all 12 tables, PKs, FKs, constraints
- [ ] T2.2: Create seed.sql with all required mock data (BCrypt hashed passwords)
- [ ] T2.3: Verify schema loads in MySQL (Docker container)
- [ ] T2.4: Verify seed data loads correctly
- [ ] T2.5: Finalize API contracts with request/response types, status codes, error format
- [ ] T2.6: Define authentication behavior (JWT flow, role encoding, token structure)
- [ ] T2.7: Document integration expectations for frontend

**Acceptance:** Schema creates without errors, seed data loads, all accounts accessible, API contracts reviewed and frozen.

---

### Phase 3: Application Foundations
**Status:** ⬜ Not Started
**Objective:** Create the Spring Boot backend skeleton with authentication and the React frontend skeleton with layout, routing, and design system. Both can start in parallel once Phase 2 contracts are finalized.
**Role:** P2 (Backend) + P3 (Frontend)
**Depends on:** Phase 2

**Subphase 3A — Backend Foundation (P2):**
- [ ] T3A.1: Create Spring Boot project with Maven (spring initializr)
- [ ] T3A.2: Configure application.yml (MySQL, JWT, CORS, Actuator)
- [ ] T3A.3: Create JPA entities for all 12 tables
- [ ] T3A.4: Create repositories
- [ ] T3A.5: Implement JWT authentication (login endpoint, token generation, filter)
- [ ] T3A.6: Implement role-based authorization (Spring Security config)
- [ ] T3A.7: Verify /actuator/health responds
- [ ] T3A.8: Write JUnit tests for authentication
- [ ] T3A.9: Create backend Dockerfile

**Subphase 3B — Frontend Foundation (P3):**
- [ ] T3B.1: Create Vite + React 18 project
- [ ] T3B.2: Configure Tailwind CSS
- [ ] T3B.3: Define design system (colors, typography, spacing, component tokens)
- [ ] T3B.4: Configure React Router with route structure
- [ ] T3B.5: Build shared layout (header, navigation, footer)
- [ ] T3B.6: Create reusable components (Button, Card, Input, Badge, etc.)
- [ ] T3B.7: Configure Axios instance with /api base and JWT interceptor
- [ ] T3B.8: Build responsive mobile navigation
- [ ] T3B.9: Create frontend Dockerfile

**Acceptance:** Backend compiles, auth endpoint works, health check responds. Frontend builds, layout renders, routing works, design system visible.

---

### Phase 4: Core Feature Implementation
**Status:** ⬜ Not Started
**Objective:** Implement all database-backed functionality — public content APIs, student features, faculty features, and admin features.
**Role:** P2 (Backend APIs) → P3 (Frontend integration)
**Depends on:** Phase 3

**Backend Tasks (P2):**
- [ ] T4.1: Public notices API (GET /api/public/notices with category filter, search, pagination)
- [ ] T4.2: Public departments API (list + detail by code)
- [ ] T4.3: Public events API
- [ ] T4.4: Student dashboard API (aggregate: attendance %, upcoming classes, recent notices)
- [ ] T4.5: Student attendance API (subject-wise breakdown)
- [ ] T4.6: Student results API (semester-wise marks)
- [ ] T4.7: Student timetable API
- [ ] T4.8: Student fees API + mock payment
- [ ] T4.9: Faculty classes API
- [ ] T4.10: Faculty attendance marking API
- [ ] T4.11: Faculty marks entry API
- [ ] T4.12: Admin notice CRUD API
- [ ] T4.13: Admin user creation API
- [ ] T4.14: Admin stats API
- [ ] T4.15: JUnit tests for all service layers

**Frontend Tasks (P3) — after corresponding backend API is verified:**
- [ ] T4.16: Notice list page with filters and search
- [ ] T4.17: Department list + CSE detail page
- [ ] T4.18: Events display
- [ ] T4.19: Student dashboard page
- [ ] T4.20: Student attendance page
- [ ] T4.21: Student results page
- [ ] T4.22: Student timetable page
- [ ] T4.23: Student fees page with mock payment
- [ ] T4.24: Faculty class management page
- [ ] T4.25: Faculty attendance marking page
- [ ] T4.26: Faculty marks entry page
- [ ] T4.27: Admin notice management page
- [ ] T4.28: Admin user creation page
- [ ] T4.29: Admin dashboard/stats page

**Acceptance:** All APIs return correct data, all frontend pages display and interact correctly, JUnit tests pass.

---

### Phase 5: Complete Public Website & Portal
**Status:** ⬜ Not Started
**Objective:** Finish all 10 public pages, complete login flow, integrate role-specific routing, handle all edge states (loading, empty, error, unauthorized), and verify responsive behavior.
**Role:** P3 (Frontend) + P2 (backend adjustments)
**Depends on:** Phase 4

**Tasks:**
- [ ] T5.1: Home page (hero, quick links, notices, events, dept cards, stats)
- [ ] T5.2: About page
- [ ] T5.3: Academics page
- [ ] T5.4: Admissions page
- [ ] T5.5: Placements & Research page
- [ ] T5.6: Campus Life page
- [ ] T5.7: Disclosures page
- [ ] T5.8: Contact page
- [ ] T5.9: Login page with role-specific redirect
- [ ] T5.10: Protected route guards (redirect unauthorized)
- [ ] T5.11: Loading, empty, and error states for all data-driven pages
- [ ] T5.12: Responsive testing at 375px and desktop
- [ ] T5.13: Add data-testid attributes for Selenium
- [ ] T5.14: Cross-browser basic check

**Acceptance:** All 10 pages render correctly, login redirects to correct dashboards, unauthorized access shows error, responsive at mobile and desktop, all interactive elements have test IDs.

---

### Phase 6: Local Containerization & Integration
**Status:** ⬜ Not Started
**Objective:** Dockerize everything and run the complete application through Docker Compose with proper service dependencies and health checks.
**Role:** P1 (DevOps) + P2 (backend config)
**Depends on:** Phase 5

**Tasks:**
- [ ] T6.1: Finalize backend Dockerfile (multi-stage Maven build)
- [ ] T6.2: Finalize frontend Dockerfile (build + Nginx)
- [ ] T6.3: Configure Nginx (serve SPA + proxy /api to backend)
- [ ] T6.4: Create docker-compose.yml (MySQL + backend + frontend)
- [ ] T6.5: Configure environment variables (.env.example)
- [ ] T6.6: Add health checks and depends_on conditions
- [ ] T6.7: Verify DB initialization (schema + seed on first run)
- [ ] T6.8: End-to-end smoke test through Docker Compose
- [ ] T6.9: Document local setup in README

**Acceptance:** `docker compose up` starts all 3 services, frontend at localhost:3000, API proxied, login works, data loads from seed.

---

### Phase 7: Kubernetes Deployment
**Status:** ⬜ Not Started
**Objective:** Deploy the application to Kubernetes (Docker Desktop) with persistent storage, multiple backend replicas, and health probes.
**Role:** P1 (DevOps)
**Depends on:** Phase 6

**Tasks:**
- [ ] T7.1: Enable Kubernetes in Docker Desktop
- [ ] T7.2: Create namespace (ucest-one)
- [ ] T7.3: Create Kubernetes Secrets (secret.example.yaml + actual secrets)
- [ ] T7.4: Create MySQL deployment with PersistentVolume + init scripts
- [ ] T7.5: Create backend deployment (2 replicas) with readiness/liveness probes
- [ ] T7.6: Create frontend deployment with Nginx
- [ ] T7.7: Create Services (frontend NodePort:30080, backend NodePort:30081, MySQL ClusterIP:3306)
- [ ] T7.8: Verify all pods reach Ready state
- [ ] T7.9: Verify application at localhost:30080
- [ ] T7.10: Demonstrate pod self-healing (delete backend pod → observe replacement)

**Acceptance:** All pods healthy, site accessible at localhost:30080, login works, pod deletion triggers automatic replacement.

---

### Phase 8: Selenium Functional Testing
**Status:** ⬜ Not Started
**Objective:** Implement 5 core end-to-end tests targeting the Kubernetes deployment.
**Role:** P4 (QA)
**Depends on:** Phase 7

**Tasks:**
- [ ] T8.1: Create Selenium Maven project (e2e-tests/)
- [ ] T8.2: Configure headless Chrome and base URL system property
- [ ] T8.3: Test 1 — Homepage loads and displays notices
- [ ] T8.4: Test 2 — Exams filter displays exam notices
- [ ] T8.5: Test 3 — CSE department page opens
- [ ] T8.6: Test 4 — Student login reaches dashboard
- [ ] T8.7: Test 5 — Incorrect credentials produce error
- [ ] T8.8: Run all 5 tests, capture results

**Acceptance:** All 5 tests pass against the deployed application with explicit waits and stable selectors.

---

### Phase 9: Jenkins CI/CD Pipeline
**Status:** ⬜ Not Started
**Objective:** Automate build, test, image build, deployment, and end-to-end testing through a Jenkins pipeline.
**Role:** P1 (DevOps) + P2 (backend adjustments)
**Depends on:** Phase 8

**Tasks:**
- [ ] T9.1: Install and configure Jenkins on Windows
- [ ] T9.2: Configure JDK and Maven tools in Jenkins
- [ ] T9.3: Configure repository access (GitHub credentials)
- [ ] T9.4: Create Multibranch Pipeline job
- [ ] T9.5: Write Jenkinsfile with stages: Checkout → Backend Build+Test → Frontend Build → Docker Build → K8s Deploy (main only) → Selenium (main only)
- [ ] T9.6: Use `bat` for Windows commands
- [ ] T9.7: Archive test reports and artifacts
- [ ] T9.8: Demonstrate failed build (intentional test failure → fix → green build)
- [ ] T9.9: Demonstrate successful deployment through pipeline

**Acceptance:** Pipeline runs end-to-end on main branch, deploys to K8s, Selenium tests pass, reports archived. PR builds validate without deploying.

---

### Phase 10: Nagios Monitoring
**Status:** ⬜ Not Started
**Objective:** Monitor frontend, backend health, and database connectivity. Demonstrate failure detection and recovery.
**Role:** P4 (QA/Monitoring)
**Depends on:** Phase 7 (K8s running)

**Tasks:**
- [ ] T10.1: Set up Nagios Core (Docker or native)
- [ ] T10.2: Configure frontend availability check
- [ ] T10.3: Configure backend health check (/actuator/health)
- [ ] T10.4: Configure database health check (via backend health endpoint)
- [ ] T10.5: Verify all checks show healthy status
- [ ] T10.6: Demonstrate failure detection (stop a service → Nagios alerts)
- [ ] T10.7: Restore service → verify recovery detection

**Acceptance:** All 3 checks pass when healthy, failure is detected within check interval, recovery is detected after restart.

---

### Phase 11: Final Integration & Release
**Status:** ⬜ Not Started
**Objective:** Complete all documentation, verify demo accounts, rehearse demonstration, create release tag, and capture evidence.
**Role:** P1 + P4
**Depends on:** Phases 9, 10

**Tasks:**
- [ ] T11.1: Complete README.md (setup, architecture, usage, screenshots)
- [ ] T11.2: Verify all demo accounts work (student, faculty, admin)
- [ ] T11.3: Review security config (no secrets in git, CORS, JWT expiry)
- [ ] T11.4: Run full acceptance checklist (from SPEC success criteria)
- [ ] T11.5: Capture demonstration screenshots
- [ ] T11.6: Rehearse full demonstration flow
- [ ] T11.7: Merge to main, create v1.0.0 tag and GitHub release
- [ ] T11.8: Verify final Jenkins pipeline on release
- [ ] T11.9: Final Nagios health verification

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
