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

## [DECISION-007] Visual Design System — Orderful Command Deck Aesthetic

**Date**: 2026-10-12
**Status**: Accepted

### Context
Developer provided the official style reference: "industrial command deck — a logistics dispatcher's printed control sheet in black ink and surgical vermillion, every page restrained enough to let a single CTA shout."

### Decision
Adopt the Orderful design system across the entire UCEST One platform:
- **Palette**: Achromatic Vellum (`#f5f5f5`) canvas, Paper (`#ffffff`) surfaces, Carbon (`#1f1f1f`) panels, Ink Black (`#000000`), Slate typography (`#101828`, `#364153`, `#4a5565`), punctuated exclusively by Surgical Vermillion (`#e42b0c` / Sunset Flux gradient) for primary action CTAs and navigation focus.
- **Geometry**: Universal 8px radius across all containers, cards, buttons, inputs, tags, and navbars. (Strictly no 4px, 6px, 12px, or pill radii).
- **Typography**: Editorial geometric grotesk (Telegraf / Inter / Söhne) with tight negative tracking on display (`-2.16px` at 72px, `-1.5px` at 60px) and restrained weights (300-500).
- **Shadows**: Single disciplined two-layer stack (`rgba(0,0,0,0.1) 0 1px 3px 0, rgba(0,0,0,0.1) 0 1px 2px -1px`).

### Consequences
- Unmistakable, high-impact enterprise B2B command deck feel
- Exceptional scannability, clarity, and authority
- Clean, maintainable CSS token architecture

---

*Last updated: 2026-10-12*
