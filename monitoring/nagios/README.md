# Nagios Core Infrastructure Monitoring — UCEST One

> Production-ready Nagios Core monitoring configuration, health check probes, container deployment, and automated failure detection/recovery demonstration.

---

## 1. Monitoring Architecture

Nagios Core actively polls the UCEST One infrastructure across all tiers (Frontend, Backend REST & Actuator, MySQL Relational Database):

```
                   ┌──────────────────────────────────────┐
                   │          Nagios Core Engine          │
                   │       (Web Dashboard Port 8085)      │
                   └──────────────────┬───────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
    [Frontend Web UI]       [Backend Actuator API]       [MySQL Database]
     Port 3000 / 5173              Port 8080                Port 3306
  (HTTP 200 Availability)    (/actuator/health status)  (TCP Socket Listener)
```

### Monitored Host Targets (`objects/ucest-hosts.cfg`):
- `ucest-frontend`: Web tier serving React 18 SPA + Nginx.
- `ucest-backend`: API tier running Spring Boot 3 + Spring Data JPA.
- `ucest-database`: Data tier running MySQL 8.0 relational engine.

### Monitored Service Probes (`objects/ucest-services.cfg`):
1. **Frontend Web UI Availability:** Periodic HTTP GET on `/` asserting HTTP 200 OK.
2. **Backend Actuator Core Health:** Periodic HTTP GET on `/actuator/health` asserting `"status":"UP"`.
3. **Database Component Health:** Probes Actuator database health check asserting relational driver connectivity.
4. **MySQL Database Port Listener:** Probes TCP port 3306 for immediate socket handshakes.
5. **Public Notices API Latency:** Probes `/api/public/notices` with warning threshold for latency > 500ms.

---

## 2. Directory Structure

```
monitoring/nagios/
├── nagios.cfg                     # Master Nagios Core daemon configuration
├── docker-compose.nagios.yml      # Isolated Nagios Core container definition
├── health-checker.js              # Active probe execution runner (Node.js)
├── demo-failure-recovery.ps1      # PowerShell empirical failure & recovery simulation
├── demo-failure-recovery.sh       # Bash empirical failure & recovery simulation
├── README.md                      # Operational guide and architecture overview
└── objects/
    ├── templates.cfg              # Host and service inheritance templates
    ├── timeperiods.cfg            # 24x7 and business hours definitions
    ├── contacts.cfg               # Administrative alert recipients (admins group)
    ├── commands.cfg               # Check plugin command definitions (check_http, check_tcp)
    ├── ucest-hosts.cfg            # Host targets (Frontend, Backend, DB)
    └── ucest-services.cfg         # 5 Active service probe definitions
```

---

## 3. Running Nagios via Docker Compose

To spin up the Nagios Core container with all UCEST One monitoring configurations pre-mounted:

```bash
cd monitoring/nagios
docker compose -f docker-compose.nagios.yml up -d
```

### Accessing the Web Dashboard:
- **URL:** [http://localhost:8085](http://localhost:8085)
- **Username:** `nagiosadmin`
- **Password:** `admin123`

Navigate to **Current Status** → **Services** or **Tactical Overview** to inspect live service status badges.

---

## 4. Empirical Failure Detection & Recovery Demonstration

To demonstrate Nagios state transitions (OK → CRITICAL → RECOVERY):

### On Windows PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File monitoring/nagios/demo-failure-recovery.ps1
```

### On Linux / macOS / Git Bash:
```bash
bash monitoring/nagios/demo-failure-recovery.sh
```

### Simulation Stages:
1. **Baseline Assessment:** All probes report `[OK]` (HTTP 200, latency < 50ms, MySQL port open).
2. **Failure Induction:** Simulated transient outage (e.g. backend container termination) triggers `[CRITICAL]` alert state and notification dispatch.
3. **Recovery Verification:** Container rescheduling restores service, Nagios detects health recovery, and resolves alert state to `[RECOVERY / OK]`.
