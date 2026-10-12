# UCEST One — Team Handbook (run it, demo it, explain it)

Everything about the project in one place: what it is, how each part works, how to run it from a
fresh Windows laptop, the demo script, what we fixed, and viva questions.

---

## 1. What we built (30-second pitch)

JNTUH UCEST today has **two separate websites** (jntuhceh.ac.in and sis.jntuhceh.ac.in) and
**9 separate logins** (Student, Parent, Faculty, HOD, Hostel, Exams, …). Notices are stale and
mislabelled, results are spread over three sites, and there is no search.

**UCEST One** replaces both with **one website + one login**. The role stored with your account
(student / faculty / admin) decides which dashboard you see.

| Who | Can do |
|---|---|
| Public | Home, departments (CSE in depth), notices with category filter + search, admissions, campus life |
| Student | Dashboard: attendance %, CGPA/SGPA, timetable, fees with mock payment + receipt |
| Faculty | My classes, mark attendance, enter internal marks |
| Admin | Post / pin / archive notices (they appear on the public site immediately), add users, stats |

Data is **mock/seeded** (one CSE class); nothing connects to real college systems.

---

## 2. Architecture

```
 Browser
   │  http://localhost:30080 (Kubernetes)  or  :3000 (Docker Compose)
   ▼
 ┌─────────────────────────┐   /api/*  proxied   ┌──────────────────────────┐    JDBC    ┌──────────┐
 │ frontend                │ ──────────────────► │ backend                  │ ─────────► │ MySQL 8  │
 │ React 18 + Vite build   │                     │ Spring Boot 3.2, Java 17 │            │ 12 tables│
 │ served by nginx         │                     │ JWT + BCrypt, role rules │            │ + seed   │
 └─────────────────────────┘                     └──────────────────────────┘            └──────────┘
```

* **Frontend** (`frontend/`): React pages, built by Vite into static files, served by **nginx**.
  nginx also forwards every `/api/...` request to the backend (`proxy_pass http://backend:8080`),
  so the browser only ever talks to one address.
* **Backend** (`backend/`): Spring Boot REST API.
  * Login: `POST /api/auth/login` checks the password with **BCrypt** and returns a **JWT** (expires in 2 h).
  * The browser sends the JWT as `Authorization: Bearer …` on every portal call.
  * `SecurityConfig` decides who can call what: `/api/public/**` anyone, `/api/student/**` students,
    `/api/faculty/**` faculty, `/api/admin/**` admin. No/invalid token → **401**, wrong role → **403**.
* **Database** (`db/schema.sql`, `db/seed.sql`): MySQL loads these automatically the first time the
  database volume is created.

### Demo accounts

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Student | `23011A0501` (…0515) | `student123` |
| Faculty | `FAC-CSE-102` (101–108) | `faculty123` |

The login page has **Quick Fill** buttons for these.

---

## 3. The DevOps toolchain — what each tool does for us

| Stage | Tool | Where | What it proves |
|---|---|---|---|
| Plan | GitHub Issues + Projects | GitHub | Every task is an issue (#2–#27), assigned to a member, in milestone v1.1.0 |
| Code | Git + GitHub | branches + PRs | `feature/…` / `fix/…` branch → PR into `develop` → teammate review → merge; release `develop` → `main`, tag |
| Build | Maven | `backend/pom.xml` | `mvn clean verify` compiles and runs the tests |
| Unit test | JUnit 5 | `backend/src/test` | 15+ tests: login ok/bad, 401/403 rules, CORS, seed passwords, no password leak in JSON |
| Containerise | Docker + Compose | `Dockerfile`s, `docker-compose.yml` | Whole stack with one command |
| CI/CD | Jenkins | `Jenkinsfile` | build → test → images → K8s deploy → Selenium, and it **really goes red** on failure |
| Deploy | Kubernetes | `k8s/` | 3 services, 2 backend replicas, self-healing |
| Functional test | Selenium (Java) | `e2e-tests/` | Real Chrome clicks through the deployed site |
| Monitor | Nagios Core | `monitoring/nagios/` | Real checks; green → red → green |

---

## 4. Run it from zero (fresh Windows laptop)

### 4.1 Install once

| Tool | Install (PowerShell as Administrator) | Check |
|---|---|---|
| Git | `winget install --id Git.Git -e` | `git --version` |
| Docker Desktop | from docker.com, then start it | `docker info` |
| Kubernetes | Docker Desktop → Settings → Kubernetes → Enable → Apply & restart | `kubectl get nodes` shows `docker-desktop Ready` |
| Java 17+ | `winget install --id EclipseAdoptium.Temurin.17.JDK -e` | `java -version` |
| Maven | `choco install maven -y` | `mvn -v` |
| Node.js 20 | `winget install --id OpenJS.NodeJS.LTS -e` | `node -v` |
| Google Chrome | (for Selenium) | |
| GitHub CLI (optional) | `winget install --id GitHub.cli -e` then `gh auth login` | |

> After installing, **close and reopen the terminal** so PATH is refreshed.
> If `mvn` is still "not recognized": `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine')`.

### 4.2 Get the code

```powershell
git clone https://github.com/mohit230723/jntuh-one.git
cd jntuh-one
git switch develop
```

### 4.3 Option A — Docker Compose (quickest)

```powershell
Copy-Item .env.example .env
docker compose up --build -d
docker compose ps          # wait until db, backend, frontend are (healthy)
```

| URL | What |
|---|---|
| http://localhost:3000 | website |
| http://localhost:8081/actuator/health | backend health |
| http://localhost:8082 | phpMyAdmin (user root / root) |

Host ports are in `.env`: MySQL **3307** and backend **8081**, because the Jenkins laptop already
uses 3306 (local MySQL) and 8080 (Jenkins).

Stop: `docker compose down` · Reset the database (re-runs the seed): `docker compose down -v`

### 4.4 Option B — Kubernetes (the graded deployment)

```powershell
docker compose stop                                  # free memory if compose is running
docker build -t ucest-backend:latest ./backend
docker build -t ucest-frontend:latest ./frontend
Copy-Item k8s\secret.example.yaml k8s\secret.yaml    # git-ignored; change values if you like
kubectl apply -f k8s\namespace.yaml
kubectl apply -f k8s\secret.yaml
kubectl apply -k k8s\
kubectl rollout status deployment/backend-deployment -n ucest-one --timeout=240s
kubectl get pods -n ucest-one
```

| URL | What |
|---|---|
| http://localhost:30080 | website (NodePort) |
| http://localhost:30081/actuator/health | backend health (NodePort) |

Docker Desktop's Kubernetes uses the images you built locally (`imagePullPolicy: IfNotPresent`),
so no registry is needed. Remove everything: `kubectl delete namespace ucest-one`.

### 4.5 Nagios

```powershell
docker compose -f monitoring\nagios\docker-compose.nagios.yml up -d
```
Open http://localhost:8085/nagios (user `nagiosadmin`, password in that compose file).
Checks (every minute): frontend TCP :30080, backend TCP :30081, website, notices API through nginx,
backend health, database health via `/actuator/health/db`.

### 4.6 Tests by hand

```powershell
cd backend;   mvn -B clean verify;                                  cd ..
cd e2e-tests; mvn -B test "-DbaseUrl=http://localhost:30080";       cd ..
```

### 4.7 Jenkins (one-time, on the lead's laptop)

Full steps: [`docs/jenkins_setup.md`](jenkins_setup.md). Summary:
1. `services.msc` → **Jenkins** → Log On → **This account** = your Windows user → restart.
   (As `LocalSystem` it can't use Docker Desktop or your `.kube\config`.)
2. Manage Jenkins → Credentials → add **Secret file**, ID **`ucest-k8s-secret`**, file = `k8s\secret.yaml`.
3. New Item → **Multibranch Pipeline** → GitHub source `https://github.com/mohit230723/jntuh-one`
   → scan every 2 minutes → Save.

---

## 5. How the pipeline works (`Jenkinsfile`)

```
Checkout → Backend: mvn clean verify (JUnit report) → Frontend: npm ci + build
        → Docker images tagged with the build number → Deploy to K8s → Selenium (JUnit report)
```

* Every step is a Windows `bat` command. **No** `|| true`, `|| exit /b 0` or fallback commands:
  if a command fails, the build is red. (The old Jenkinsfile hid every failure.)
* Images get the build number as tag (`ucest-backend:17`), and `kubectl set image` points the
  deployment at that exact tag → Kubernetes does a **rolling update** (old pods replaced one at a time,
  `maxUnavailable: 0`, so the site stays up).
* `kubectl rollout status` waits until the new pods pass their **readiness probe**
  (`/actuator/health`); if they never get healthy the stage fails.
* The secret comes from the Jenkins credential, never from Git.
* Test reports from backend and Selenium show on the build's **Tests** page.

---

## 6. Demo script (≈10 minutes)

1. **Problem** — show the real sites: 9 SIS logins, "Results" menu → notifications page, 2018 circulars,
   © 2008 footer, no search (CLAUDE.md §6 list).
2. **Plan/Code** — GitHub: issues board, milestone v1.1.0, a PR with a teammate's review and the linked issue.
3. **Product** — http://localhost:30080: notices filter + search, CSE department, phone width (F12 → 375 px).
4. **Logins** — wrong password → "Invalid username or password". Student → real attendance/CGPA.
   Faculty → classes. **Admin posts a notice → open Home/Notices → it is there.**
5. **CI/CD** — merge a small change to `main` → Jenkins runs all stages green → change is live on :30080.
   Optional: push a branch with a broken test → red build.
6. **Self-healing**
   ```powershell
   kubectl get pods -n ucest-one
   kubectl delete pod <one-backend-pod> -n ucest-one
   kubectl get pods -n ucest-one -w        # new pod appears, 2/2 ready again in ~45 s
   ```
7. **Monitoring** — Nagios all green →
   `kubectl scale deployment backend-deployment -n ucest-one --replicas=0` → within ~2 min Backend Health,
   MySQL and Notices API go **CRITICAL** (frontend stays OK — correct!) →
   `--replicas=2` → green again.

---

## 7. What we found and fixed (with proof)

| # | Problem found in the audit | Fix | Proof |
|---|---|---|---|
| 2 | `.env.example` deleted but compose required its variables; stray nested-repo gitlink | Restored template with all vars + safe ports; removed gitlink | Fresh compose up healthy |
| 7 | **No demo login worked**: all 24 users had one BCrypt hash matching no password; README usernames wrong | New hashes per role; `SeedCredentialsTest` | Test fails on old seed, passes on new; 3 logins 200 |
| 8 | Public notices API **500**; would have leaked the author's password hash | Return `NoticeDto` instead of the database entity | Test asserts no `password` in JSON |
| 13 | **Login page let anyone in with any password** when the API failed; every page silently showed fake data (even fake "saved" for attendance/marks/payments) | Mocks only in local dev with `VITE_USE_MOCKS=true`; real error messages; removed fake numbers | Wrong password rejected; dashboards show DB values |
| 13 | Backend down → page hung 60 s then "404" | nginx 5 s timeout + clear JSON 503 | Error box after 5 s |
| 9 | Bad login / expired token gave 403 → frontend never sent expired sessions to login | JSON 401 vs 403; field-level 400 | 7 MockMvc tests (4 fail on old code) |
| — | **Browser logins blocked on Kubernetes** (CORS allowed only :3000/:5173) | Configurable origins incl. :30080 | Found by Selenium; `CorsConfigTest` |
| 3 | Jenkinsfile could never fail | Honest `bat` pipeline, JUnit per stage | Jenkins linter "validated"; broken test → non-zero exit |
| 4 | K8s: secret key names didn't match; kustomize needed the ignored secret; nginx looked for `backend` but Service was `backend-service` → frontend crash-loop | Matching keys, secret applied separately, `backend` alias Service | All pods Running; self-heal 45 s |
| 5 | Nagios pinged an unreachable host so nothing was checked; ports pointed at Jenkins | TCP/HTTP checks on NodePorts | green → red → green done |
| 18 | Selenium 0/5 passing | Rewritten with stable ids, 6 tests | 6/6 pass on K8s |

Also logged for later: faculty greeting shows username (#26), attendance totals mismatch (#27),
admin stats invented numbers when zero (#12), design rework (#14), missing pages (#15–17),
evidence-based audit doc (#19), repo clean-up (#21).

---

## 8. Team workflow (how we work from now on)

1. Pick an issue, assign yourself.
2. `git switch develop; git pull; git switch -c fix/<thing>`
3. Commit with conventional messages: `feat:`, `fix:`, `test:`, `ci:`, `docs:` — and `Closes #N`.
4. `git push -u origin fix/<thing>` → open PR **into `develop`** → ask a teammate to review.
5. Reviewer checks the "How I tested" section, approves; author merges.
6. Release: PR `develop` → `main`, then `git tag v1.1.0; git push origin v1.1.0`.

**Never push directly to `main`.** The repo owner should enable branch protection
(Settings → Branches → `main` and `develop`: require PR + 1 approval).

### Merge order for the open PRs
#30 (401) → #31 (CORS, built on #30) → #32 (K8s) → #33 (Nagios) → #34 (Selenium).

---

## 9. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `bind: 0.0.0.0:3306 … Only one usage` | Local MySQL service uses 3306 → keep `MYSQL_PORT=3307` in `.env` |
| `required variable MYSQL_ROOT_PASSWORD is missing` | No `.env` → `Copy-Item .env.example .env` |
| Login says "Invalid username or password" with the right password | Old database volume with old hashes → `docker compose down -v` (or delete the K8s namespace and the PV data) |
| Login works with curl but not in the browser | CORS: browser origin not allowed → set `APP_CORS_ALLOWED_ORIGINS` on the backend |
| Frontend container restarts: `host not found in upstream "backend"` | nginx started while backend is down → start backend first (compose does this automatically) |
| Page shows "server is temporarily unavailable" | Backend is down — that message is correct, not a bug |
| `kubectl` says `current-context is not set` | Kubernetes not enabled in Docker Desktop, or Jenkins running as LocalSystem |
| Pod stuck `CrashLoopBackOff` | `kubectl logs <pod> -n ucest-one` and `kubectl describe pod <pod> -n ucest-one` |
| `mvn` not recognized | Reopen terminal / restart Jenkins service after installing Maven |

---

## 10. Viva questions — short answers

* **Why Docker?** Same environment everywhere; one command starts DB + API + web.
* **Multi-stage Dockerfile?** Stage 1 has Maven/Node to build; final image only has the JRE/nginx and the
  built output → smaller and safer. Backend runs as a non-root user.
* **Compose vs Kubernetes?** Compose = one machine, for development. Kubernetes = desired state:
  we declare "2 backend replicas" and it keeps it true (restarts crashed pods, rolling updates).
* **Self-healing?** The Deployment's ReplicaSet notices only 1 of 2 pods exists and creates a new one.
* **Liveness vs readiness probe?** Liveness fails → container restarted. Readiness fails → pod gets
  no traffic (used during rollout so users never hit a starting pod).
* **NodePort vs ClusterIP?** NodePort (30080/30081) is reachable from the laptop; ClusterIP
  (`mysql-service`, `backend`) only inside the cluster.
* **Why does the pipeline matter if it can go red?** A pipeline that can't fail proves nothing; ours
  stops on any failing test, so a green build means tested code.
* **What is JWT?** A signed token with the username and role; the server checks the signature, so it
  doesn't need sessions (stateless → works with 2 replicas).
* **BCrypt?** One-way, salted, slow password hash; we never store or log plain passwords.
* **Where are secrets?** `.env` and `k8s/secret.yaml` are git-ignored; only `*.example` files are in Git;
  Jenkins gets the K8s secret from its credential store.
* **What does Nagios check?** TCP port open + HTTP 200 + body contains `UP`; the DB check goes through the
  backend's health endpoint because MySQL is internal-only in Kubernetes.
* **Unit vs functional test?** JUnit tests one class/endpoint in isolation (fast, in `mvn verify`);
  Selenium drives a real browser against the deployed site.
* **What was the hardest bug?** The fake login fallback hid that no login worked at all — removing the
  mocks made every real failure visible, which then let us fix them one by one.
