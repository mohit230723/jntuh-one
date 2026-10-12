# UCEST One

> Unified university website and student portal for JNTUH UCEST.
> built for Devops presentation 

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Guide: Comprehensive](https://img.shields.io/badge/Guide-PROJECT__GUIDE.md-orange.svg)](PROJECT_GUIDE.md)

> 📖 **Full Engineering & Deployment Guide:** For detailed architecture, setup, configuration, and cloud deployment instructions, see [PROJECT_GUIDE.md](PROJECT_GUIDE.md).

## Overview

UCEST One replaces the existing JNTUH UCEST public website and separate student information system with a single, modern platform. It provides:

- **Public Website** — 10 responsive pages with consistent navigation, searchable notices, and department information
- **Student Portal** — Dashboard, attendance tracking, semester results, timetable, and fee management
- **Faculty Portal** — Class management, attendance marking, and internal marks entry
- **Admin Portal** — Notice management, user creation, and system statistics

## Tech Stack

| Layer | Technology | Description |
|-------|------------|-------------|
| Frontend | React 18, Vite 5, React Router 6, Axios, Lucide Icons | Orderful Industrial Command Deck (Vanilla CSS tokens, 8px universal radius, surgical vermillion action signals) |
| Backend | Spring Boot 3.2.5, Java 17, Spring Security 6, Spring Data JPA | Stateless JWT authentication, Actuator health metrics, MySQL 8 driver |
| Database | MySQL 8.0 Relational Engine | 12 normalized tables, BCrypt credential seeds, referential integrity |
| Containerization | Docker & Docker Compose | Multi-stage builds, Alpine runtimes, Nginx reverse proxy, health checks |
| Orchestration | Kubernetes (Docker Desktop) | Multi-replica backend, PersistentVolume, NodePort services, self-healing |
| CI/CD & QA | Jenkins, Selenium WebDriver, Nagios | Automated build pipeline, E2E functional test suite, active monitoring |

## Project Structure

```
ucest-one/
├── frontend/          # React + Vite application (Orderful design system)
│   ├── Dockerfile     # Multi-stage Node 20 build + Alpine Nginx runtime
│   └── nginx.conf     # SPA routing fallback + /api reverse proxy
├── backend/           # Spring Boot 3 REST API server
│   ├── Dockerfile     # Multi-stage Maven build + Eclipse Temurin 17 JRE
│   └── src/           # Controllers, Entities, Repositories, Security
├── db/                # MySQL database definitions
│   ├── schema.sql     # 12 normalized DDL tables with FK constraints
│   └── seed.sql       # Initial mock data with BCrypt credentials
├── k8s/               # Kubernetes deployment manifests
├── monitoring/        # Nagios service monitoring configuration
├── e2e-tests/         # Selenium end-to-end test suite
├── docs/              # Specifications, SRS, design system, API contracts
├── .gsd/              # Get Shit Done (GSD) roadmap and tracking state
├── docker-compose.yml # Full-stack container orchestration
├── Jenkinsfile        # CI/CD automation pipeline
├── package.json       # Root project orchestrator
└── .env.example       # Environment variables template
```

## Quick Start

### Prerequisites

- Node.js 18+ (Node 22 recommended)
- Java 17+ (Java 25 runtime supported, targets Java 17 bytecode)
- Docker Desktop 29+ & Docker Compose v5+
- Git

---

### Method A: Local Development (Hot Module Reloading)

Ideal for rapid frontend and portal development:

```bash
# Clone the repository
git clone https://github.com/mohit230723/jntuh-one.git
cd jntuh-one

# Install root orchestrator and frontend dependencies
npm install

# Start the frontend dev server (Vite HMR)
npm run dev
```

The application will be live immediately at:
👉 **`http://localhost:5173/`**

---

### Method B: Docker Compose (Full Stack Isolated Deployment)

Runs MySQL 8, Spring Boot 3 backend, and Nginx frontend in coordinated containers:

```bash
# 1. Copy the environment variables template
cp .env.example .env

# 2. Build and launch all 3 container services
npm run docker:up
# Or directly: docker compose up --build
```

#### Service Map & Ports:

| Service | Container Name | URL / Port | Purpose |
|---------|----------------|------------|---------|
| **Frontend** | `ucest-frontend` | `http://localhost:3000/` | Nginx serving React SPA + proxying `/api` |
| **Backend API** | `ucest-backend` | `http://localhost:8080/` | Spring Boot REST endpoints & Actuator |
| **Health Metric** | `ucest-backend` | `http://localhost:8080/actuator/health` | Service health status |
| **Database** | `ucest-mysql` | `localhost:3306` | MySQL 8 with initialized schema & seed |

#### Container Operations:

```bash
# View running container status
docker compose ps

# View real-time container logs
docker compose logs -f

# Stop all containers
npm run docker:down

# Stop containers and wipe volumes/data
npm run docker:clean
```

---

## Demo Accounts

Pre-seeded credentials with BCrypt hashes ready for login:

| Role | Username | Password | Access Scope |
|------|----------|----------|--------------|
| **Admin** | `admin` | `admin123` | Institutional overview, Notice publishing & archiving, User provisioning |
| **Student** | `22011A0501` | `student123` | Personal dashboard, Attendance ledger, Grade cards, Timetable, Fee mock payments |
| **Faculty** | `fac_cs101` | `faculty123` | Assigned classes, Student rosters, Interactive attendance register, Marks entry |

> 💡 *Quick-Fill presets are also provided directly on the `/login` screen for one-click access.*

---

## Team & Governance

Built as an engineering platform following the **Get Shit Done (GSD)** methodology.

## License

MIT License. Designed and maintained for JNTUH UCEST.

test
