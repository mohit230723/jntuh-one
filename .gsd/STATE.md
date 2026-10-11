---
updated: 2026-10-12
---

# Project State

## Current Position

**Milestone:** v1.0
**Phase:** 9 - Jenkins CI/CD Pipeline
**Status:** in_progress
**Plan:** In progress

## Last Action

Phase 8 completed:
- **Selenium Functional Testing (P4 QA):**
  - Created `e2e-tests/pom.xml` with Selenium 4.21, JUnit 5 Jupiter, AssertJ 3.25, and Boni Garcia WebDriverManager.
  - Implemented `BaseE2ETest.java` with headless Chrome (`--headless=new`, `--window-size=1920,1080`), automatic driver binaries, and dynamic `-DbaseUrl` targeting.
  - Implemented Test 1 (`HomePageE2ETest.java`): verifies homepage rendering, brand mark, top marquee dispatch banner, latest circulars heading, and notice cards.
  - Implemented Test 2 (`ExaminationsPageE2ETest.java`): verifies exam grading scale, `#search-notices-input` keyword filtering, and `#category-tab-exam` category filtering.
  - Implemented Test 3 (`StudentPortalE2ETest.java`): authenticates student account (`#quick-fill-student` / `23011A0501`), validates `/portal/student` dashboard, and switches `#tab-attendance`, `#tab-results`, and `#tab-fees`.
  - Implemented Test 4 (`FacultyPortalE2ETest.java`): authenticates faculty account (`#quick-fill-faculty` / `FAC-CSE-102`), validates `/portal/faculty` class cohorts, and switches `#faculty-tab-marks` and `#faculty-tab-attendance`.
  - Implemented Test 5 (`AdminPortalE2ETest.java`): authenticates admin account (`#quick-fill-admin` / `admin`), validates `/portal/admin` command console, and switches `#admin-tab-notices` and `#admin-tab-users`.
  - Created automated verification runner `e2e-tests/runner.js` and verified 13/13 passing routes against local server with zero errors.
  - Documented testing instructions in `e2e-tests/README.md`.

## Next Steps

1. Execute Phase 9 (Jenkins CI/CD Pipeline - Role: P1 DevOps):
   - T9.1: Configure pipeline parameters and environment variables.
   - T9.2: Create multi-stage declarative `Jenkinsfile` (Checkout, Frontend Build, Backend Build & JUnit, Docker Image Build, Kubernetes Deployment, Selenium E2E execution, Post actions & notifications).
   - T9.3: Create Jenkins setup guide in `docs/jenkins_setup.md` with laptop installation steps, required plugins, and credentials mapping.
   - T9.4: Validate Jenkinsfile syntax.

## Active Decisions

| Decision | Choice | Made | Affects |
|----------|--------|------|---------|
| Java version | Java 25 runtime, target 17 in pom.xml | 2026-10-11 | Phase 3 (backend) |
| Featured department | CSE (Computer Science & Engineering) | 2026-10-11 | Phase 1 (content), Phase 4-5 (frontend) |
| Team structure | Solo developer, all 4 roles (P1-P4) | 2026-10-11 | All phases |
| GitHub repo | https://github.com/mohit230723/jntuh-one | 2026-10-11 | Phase 0 |
| Commit cadence | Commit per completed phase | 2026-10-11 | All phases |
| App dev server | Root `npm run dev` orchestration | 2026-10-11 | Frontend/Backend |
| Design System | Orderful Industrial Command Deck | 2026-10-12 | Phase 3+ (Frontend) |

## Blockers

None. Development server is running and verified locally on `http://localhost:5173/`.
