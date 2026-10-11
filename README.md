# UCEST One

> Unified university website and student portal for JNTUH UCEST.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

UCEST One replaces the existing JNTUH UCEST public website and separate student information system with a single, modern platform. It provides:

- **Public Website** — 10 responsive pages with consistent navigation, searchable notices, and department information
- **Student Portal** — Dashboard, attendance tracking, semester results, timetable, and fee management
- **Faculty Portal** — Class management, attendance marking, and internal marks entry
- **Admin Portal** — Notice management, user creation, and system statistics

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router, Axios |
| Backend | Spring Boot 3, Java 17, Maven, Spring Security, JWT |
| Database | MySQL 8 |
| DevOps | Docker, Kubernetes, Jenkins, Selenium, Nagios |

## Project Structure

```
ucest-one/
├── frontend/          # React + Vite application
├── backend/           # Spring Boot API server
├── db/                # SQL schema and seed scripts
│   ├── schema.sql
│   └── seed.sql
├── k8s/               # Kubernetes manifests
├── monitoring/        # Nagios configuration
├── e2e-tests/         # Selenium end-to-end tests
├── docs/              # Documentation and screenshots
├── .gsd/              # GSD project management
├── docker-compose.yml
├── Jenkinsfile
├── package.json       # Root orchestrator
└── .env.example
```

## Quick Start

### Prerequisites

- Node.js 18+
- Java 17+ (25 LTS recommended)
- Maven
- Docker & Docker Compose
- Git

### Development

```bash
# Clone the repository
git clone https://github.com/mohit230723/jntuh-one.git
cd jntuh-one

# Install root dependencies
npm install

# Start frontend development server
npm run dev

# Start full-stack (frontend + backend)
npm run dev:full
```

### Docker Compose (Full Stack)

```bash
# Copy environment template
cp .env.example .env
# Edit .env with your values

# Start all services
npm run docker:up

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
```

### Kubernetes

```bash
# Frontend: http://localhost:30080
# Backend: http://localhost:30081
```

See [docs/](docs/) for detailed setup instructions.

## Demo Accounts

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Student | (from seed data) | student123 |
| Faculty | (from seed data) | faculty123 |

> ⚠️ These are mock credentials for demonstration only.

## Team

Built as a software engineering project with the GSD (Get Shit Done) framework.

## License

MIT
