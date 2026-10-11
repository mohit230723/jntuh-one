---
updated: 2026-10-11
---

# Project State

## Current Position

**Milestone:** v1.0
**Phase:** 3 - Application Foundations
**Status:** in_progress
**Plan:** In progress

## Last Action

Phase 2 completed: created relational database foundation:
- `db/schema.sql` (12 normalized tables with foreign keys, constraints, and indexes)
- `db/seed.sql` (complete mock data including departments, admin, 8 faculty, 60 CSE students, timetable, attendance, marks, fees, and notices)

## Next Steps

1. Execute Phase 3 (Roles: P2 Backend Foundation & P3 Frontend Foundation):
   - Subphase 3A: Backend Foundation (Spring Boot 3 + Maven Wrapper + Security + JPA Entities + Auth Controller)
   - Subphase 3B: Frontend Foundation (React 18 + Vite + Tailwind / Vanilla CSS tokens + React Router + Layout + Axios Client)
   - Connect root `npm run dev` to start dev server cleanly

## Active Decisions

| Decision | Choice | Made | Affects |
|----------|--------|------|---------|
| Java version | Java 25 runtime, target 17 in pom.xml | 2026-10-11 | Phase 3 (backend) |
| Featured department | CSE (Computer Science & Engineering) | 2026-10-11 | Phase 1 (content), Phase 4-5 (frontend) |
| Team structure | Solo developer, all 4 roles (P1-P4) | 2026-10-11 | All phases |
| GitHub repo | https://github.com/mohit230723/jntuh-one | 2026-10-11 | Phase 0 |
| Commit cadence | Commit per completed phase | 2026-10-11 | All phases |
| App dev server | Root `npm run dev` orchestration | 2026-10-11 | Frontend/Backend |

## Blockers

- [ ] Maven wrapper (`mvnw`) to be included in `backend/` to enable builds without global Maven installation

## Session Context

Phase 2 complete. Ready for Phase 3 (Application Foundations): Backend skeleton with JPA entities and JWT auth + Frontend skeleton with Vite and root `npm run dev` orchestration.
