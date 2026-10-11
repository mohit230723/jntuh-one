---
updated: 2026-10-12
---

# Project State

## Current Position

**Milestone:** v1.0
**Phase:** 8 - Selenium Functional Testing
**Status:** in_progress
**Plan:** In progress

## Last Action

Phase 7 completed:
- **Kubernetes Deployment (P1 DevOps):**
  - Created `k8s/namespace.yaml` defining isolated `ucest-one` namespace.
  - Created `k8s/configmap.yaml` and `k8s/secret.yaml` (with `k8s/secret.example.yaml`) for database credentials, JWT keys, and service discovery endpoints.
  - Created `k8s/mysql-pv.yaml` defining 5Gi PersistentVolume and PersistentVolumeClaim for resilient database storage.
  - Created `k8s/mysql-deployment.yaml` with automated schema & seed initialization volume mounts, resource boundaries, and health probes.
  - Created `k8s/backend-deployment.yaml` with **2 replicas** for high availability, rolling update strategy, container JVM flags, and Actuator liveness/readiness probes.
  - Created `k8s/frontend-deployment.yaml` with 2 replicas and HTTP probes.
  - Created `k8s/services.yaml` exposing `frontend-service` on NodePort 30080, `backend-service` on NodePort 30081, and internal `mysql-service` on ClusterIP 3306.
  - Orchestrated via `k8s/kustomization.yaml` and verified client-side validation using `kubectl kustomize k8s/` exiting cleanly with code 0.
  - Documented deployment lifecycle and self-healing validation procedures in `k8s/README.md`.

## Next Steps

1. Execute Phase 8 (Selenium Functional Testing - Role: P4 QA):
   - T8.1: Setup Java Selenium test framework in `e2e-tests/` with Maven pom.xml and TestNG/JUnit 5.
   - T8.2: Configure headless Chrome WebDriver with dynamic base URL support (`http://localhost:5173`, `http://localhost:3000`, or `http://localhost:30080`).
   - T8.3: Implement Test 1 — Public homepage notice ticker and navigation.
   - T8.4: Implement Test 2 — Examinations page search and category filtering.
   - T8.5: Implement Test 3 — Student login authentication and dashboard metrics verification.
   - T8.6: Implement Test 4 — Faculty login and attendance register interaction.
   - T8.7: Implement Test 5 — Admin login and notice creation lifecycle.
   - T8.8: Configure test execution reporting and run E2E test verification.

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
