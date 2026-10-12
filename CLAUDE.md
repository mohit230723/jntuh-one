# CLAUDE.md — UCEST One (JNTUH UCEST DevOps project)

Read this whole file before doing anything. It is the single source of truth for this repo.

## 1. What this project is

A college DevOps course project by a team of 4 students at JNTUH UCEST, Hyderabad.
We are building **UCEST One**: one modern website + one role-based portal that replaces BOTH
- the public site https://jntuhceh.ac.in/ and
- the Student Information System https://sis.jntuhceh.ac.in/ (9 separate logins today).

It is graded on two things, equally:
1. **The product** — it should feel like a top university site (IIT/MIT level), something the team could pitch to the principal.
2. **The DevOps process** — the lecturer wants to see every DevOps stage done properly with the tools from the syllabus, by a real team.

Data is mock/seeded (one class, one department in depth). Nothing connects to real college systems.
Security target: medium (BCrypt, JWT with expiry, role checks on every API, validation, CORS, no secrets in Git).

## 2. Syllabus tools — every one must have a real, working job

| Stage | Tool | Must be demonstrable |
|---|---|---|
| Plan | GitHub Projects + Issues | Board with issues per feature, linked to PRs |
| Code | Git + GitHub | Feature branches, PRs, reviews by teammates, tags |
| Build | Maven | `mvn clean verify` builds backend and runs JUnit |
| Unit test | JUnit 5 | Meaningful tests, green in Jenkins |
| Containerise | Docker + Docker Compose | `docker compose up --build` runs the full stack |
| CI/CD | Jenkins (Jenkinsfile, Multibranch, Windows `bat`) | Build → test → images → deploy, real pass/fail |
| Deploy | Kubernetes (Docker Desktop) | 3 services, 2 backend replicas, self-healing demo |
| Functional test | Selenium WebDriver (Java) | Browser tests against the deployed site |
| Monitor | Nagios Core (jasonrivers/nagios container) | Real Nagios checks, green → red → green demo |

NOT in our syllabus, do not add: GitHub Actions, Ansible. Vercel is optional extra only; the graded deployment is Kubernetes.

## 3. Team and environment

- 4 members, all on **Windows** with Docker Desktop. Jenkins, Kubernetes and Nagios run on one laptop.
- Lead / DevOps (P1): the repo owner's teammate who is giving you this file. Backend & DB (P2), Frontend (P3), Research/Content/QA (P4, least technical).
- Commands you give the user must work in Windows PowerShell unless you are told otherwise.

## 4. Current state of the repo (audited 2026-10-12 — verify, don't trust)

Already present: Spring Boot 3.2 backend (controllers, JWT security, 12-table MySQL schema + seed), React 18 + Vite frontend
(10 public pages + student/faculty/admin dashboards), Dockerfiles, docker-compose, k8s manifests (Kustomize), Jenkinsfile,
Selenium e2e project, Nagios config, many docs (SRS, audit, API contracts, runbook, walkthrough).

Known problems found in the audit — these are your priorities:

**DevOps-process problems (highest impact on marks)**
1. All 14 commits are by ONE author, made in 2 days, directly on `main`. `main` and `develop` point at the same commit. No feature branches, no PRs, no reviews. This does not look like a team. Fix going forward: every change from now on goes feature branch → PR into `develop` → teammate review → merge; then `develop` → `main` PR at release. Help the user give each teammate real PRs to open from their own GitHub accounts. Do NOT rewrite history or fake dates/authors.
2. `Jenkinsfile` hides failures: `kubectl rollout status ... || true` / `|| exit /b 0`, and `mvn ... || mvn ...` fallbacks. Selenium stage runs `node e2e-tests/runner.js` first instead of the Java Selenium suite. A pipeline that cannot go red proves nothing. Make every stage fail honestly, run `mvn -B test` in `e2e-tests`, publish JUnit reports for both backend and e2e.
3. `monitoring/nagios/health-checker.js` is a Node "Nagios simulator". Keep it out of the demo; the real Nagios container must do the checks. Make sure `docker compose -f monitoring/nagios/docker-compose.nagios.yml up` actually starts and the configs referenced exist.
4. Only 6 JUnit tests. Target ≥ 10 meaningful ones (login ok/bad, 403 wrong role, notice filter, attendance %, SGPA, faculty marks attendance, admin creates notice, validation errors).
5. Repo clutter that a lecturer will read as "AI did this": `.agent/`, `.agents/`, `.gsd/`, `adapters/`, `GSD-STYLE.md`, `model_capabilities.yaml`, `docs/model-selection-playbook.md`, `docs/token-optimization-guide.md`, and `.gsd/STATE.md` claims like "verified" and "rehearsed" that were never done. Propose moving these out of the repo (ask before deleting).

**Product problems**
6. Frontend services catch API errors and silently fall back to mock data. This hides a broken backend. Mock fallback only when `import.meta.env.DEV` and a flag is set; in Docker/K8s the UI must show real data or a real error state.
7. `docs/existing_system_audit.md` contains invented claims ("75% mobile traffic", "NBA Tier-1", "4 levels deep"). Replace with evidence-based findings (Section 6 below) plus screenshots.
8. Design: current theme is "industrial command deck / vermillion". A college site needs a calm, trustworthy academic look (navy + gold suits JNTUH, good typography, real photos). Rework the design system once, centrally (tokens in `index.css`), not page by page.
9. Missing pages vs scope: Placements, Disclosures (AICTE/NIRF/RTI/anti-ragging/grievance), Notices hub with category filter + search, global search, 404 page. Parent read-only view is a should-have.
10. Verify the claimed demo logins in README actually work against the seeded DB.

## 5. Scope (target product)

Public site (one navigation, one design): Home, About, Academics, Departments (grid + one template page per dept, CSE in depth),
Notices & Exams (one searchable, filterable list — Exams, Results, Hostel, Fee, Events, Tenders, General; "New" badge),
Admissions, Placements & Research, Campus Life, Disclosures, Contact. Header has one **Login** button.

Portal (one login, role decides dashboard):
- Student: dashboard (attendance %, latest SGPA, today's timetable, my notices), attendance by subject, results by semester, timetable, fees with mock payment + receipt, profile.
- Faculty: my classes, mark attendance, enter internal marks, post notice to a class.
- Admin: notices CRUD (appears on public site instantly), add students/faculty, stats.

Must be responsive at 375 px, accessible (labels, contrast, keyboard), with loading/empty/error states.

## 6. Real problems on the current sites (use as evidence)

1. 9 separate SIS logins (Student, Parents, Faculty, HOD, Feedback, Hostel, Examinations, Admissions, Principal) + separate Faculty and HOD logins on the main site.
2. Mislabeled menu: under News Update, "Results" → /more/notifications and "Notifications" → /more/tenders.
3. Stale homepage: 2018–2023 circulars still listed, NIRF-2018 in the top bar, footer "© 2008".
4. Results scattered across main site, results.jntuhceh.ac.in and SIS.
5. Exam timetables posted only as .zip/.pdf; no-dues affidavit as .doc.
6. Wrong links: Mechanical card image → EEE page (viewdept/2); Chemical card image → Chemistry; links labelled just "Images".
7. Departments spread over sit.jntuh.ac.in, ist.jntuh.ac.in and the main domain.
8. SIS footer links (Website Policies, Copyright, Terms of Service, Help) all go to "#".
9. No search on either site.
10. Paragraph-length notice titles.

## 7. Rules for how you work

- **Run it before you claim it.** Never write "verified", "tested" or "complete" unless you ran the command and saw it pass. Show the command and the output summary.
- **Small, reviewable changes.** One feature branch per task, named `feature/<area>-<thing>` or `fix/<thing>`. Conventional commits (`feat:`, `fix:`, `test:`, `ci:`, `docs:`, `refactor:`). Do not commit or push unless the user asks; when asked, never commit to `main` or `develop` directly.
- **The user must be able to explain everything at the viva.** After each change, give a 3–5 line plain-English explanation of what changed and why, in DevOps terms where relevant.
- **No secrets in Git.** `.env` and `k8s/secret.yaml` stay ignored; only `*.example` files are committed.
- **Windows first.** Jenkins steps use `bat`. Give PowerShell commands.
- **Ask before** deleting files, changing the DB schema in a breaking way, or changing ports/service names that K8s, Nagios and Selenium depend on (frontend NodePort 30080, backend 30081 unless the manifests say otherwise — check and keep them consistent everywhere).
- Keep code simple and readable for students; no over-engineering.

## 8. Order of work

1. **Audit & run**: build backend (`mvn clean verify`), build frontend, `docker compose up --build`, log in as each role. Report what is broken. Do not fix yet.
2. **Fix blockers** so the full stack runs in Docker Compose with real data.
3. **Honest pipeline**: Jenkinsfile fixes, JUnit to ≥10, Selenium Java suite green against compose, then against K8s.
4. **Product upgrade**: design system rework, missing pages, notices hub + search, error states, mobile.
5. **Kubernetes + Nagios**: deploy, self-heal demo, real Nagios green → red → green.
6. **Team workflow**: split remaining work into GitHub issues, one branch + PR per teammate, real reviews; release PR `develop` → `main`, tag `v1.1.0`.
7. **Clean repo + docs**: remove AI-framework clutter, rewrite README (run steps, demo logins, architecture, screenshots, team), evidence-based audit doc.

## 9. Demo (what must work at the end)

Problem slides from the audit → GitHub board, branches, reviewed PRs → public site on localhost:30080 (notices filter, CSE dept, phone width)
→ student / faculty / admin logins (admin posts a notice, it appears on the homepage) → a change merged to `main` runs the Jenkins pipeline
(build, JUnit, Docker, K8s deploy, Selenium) and appears live → delete a backend pod, it comes back → Nagios green, scale backend to 0, red, back to green.
