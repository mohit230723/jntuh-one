# DECISIONS.md — Architecture Decision Records

> **Purpose**: Log significant technical decisions and their rationale.

## Decisions

## [DECISION-001] Java Runtime Version

**Date**: 2026-10-11
**Status**: Accepted

### Context
The project specification requires Java 17, but the developer's system has Java 25.0.4 LTS installed.

### Decision
Use Java 25 as the runtime but configure Maven `pom.xml` with `<java.version>17</java.version>`.

### Rationale
Spring Boot 3.x is fully compatible with Java 25. No system changes required.

### Consequences
- Build artifacts are Java 17 compatible
- Stick to Java 17 language features for portability

---

## [DECISION-002] Solo Developer, All Four Roles

**Date**: 2026-10-11
**Status**: Accepted

### Context
The project was designed for a 4-person team (P1-P4). The developer performs all four roles independently.

### Decision
One developer switches between P1 (DevOps), P2 (Backend), P3 (Frontend), P4 (QA/Research) roles as needed.

### Consequences
- Sequential execution, no true parallelism
- Simpler integration (one mental model)
- Role labels help organize mentorship

---

## [DECISION-003] CSE as Featured Department

**Date**: 2026-10-11
**Status**: Accepted

### Decision
CSE (Computer Science & Engineering) gets full-detail implementation. Other 11 departments get basic info.

---

## [DECISION-004] Commit Strategy — Per Phase

**Date**: 2026-10-11
**Status**: Accepted

### Context
GSD default is one commit per task. Developer prefers fewer, larger commits.

### Decision
Commit after each **phase** completion rather than after each individual task. Intermediate saves via git stash or WIP commits at developer's discretion.

### Consequences
- Fewer, more meaningful commits
- Larger diffs per commit
- Easier to manage for solo developer

---

## [DECISION-005] Root-Level npm run dev

**Date**: 2026-10-11
**Status**: Accepted

### Context
Developer wants a single `npm run dev` command from the project root to start development.

### Decision
Create a root `package.json` with `concurrently` to orchestrate frontend (Vite) and backend (Spring Boot via Maven wrapper) dev servers. Frontend runs on its own for UI work; full-stack mode available when backend is ready.

### Consequences
- Root package.json acts as workspace orchestrator
- `npm run dev` starts frontend dev server
- `npm run dev:full` starts frontend + backend together (Phase 3+)

---

## [DECISION-006] GitHub Repository

**Date**: 2026-10-11
**Status**: Accepted

### Decision
Repository: https://github.com/mohit230723/jntuh-one
User: mohit230723

---

*Last updated: 2026-10-11*
