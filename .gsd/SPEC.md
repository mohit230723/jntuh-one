# SPEC.md — Project Specification

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: No code may be written until this spec is marked `FINALIZED`.

## Vision

Build **UCEST One** — a unified, modern university website and integrated student portal to replace the existing JNTUH UCEST public website and its separate student information system. The project delivers a consistent experience across public information pages and authenticated role-based dashboards, powered by a single database with mock data. Nothing connects to real college systems.

## Goals

1. **Unified Public Website** — 10 polished, responsive public pages replacing the fragmented existing site, with consistent navigation, structured content, searchable notices, and reusable department templates
2. **Integrated Student Portal** — Role-based authenticated dashboards (Student, Faculty, Admin) with attendance, results, timetable, fees, class management, marks entry, notice management, and user administration
3. **Full-Stack Engineering** — Production-quality implementation with Spring Boot 3 backend, React 18 frontend, MySQL 8 database, JWT authentication, and proper security practices
4. **Automated DevOps Pipeline** — Containerized deployment via Docker Compose and Kubernetes, CI/CD via Jenkins, end-to-end testing via Selenium, and monitoring via Nagios
5. **Learning & Demonstration** — The developer (solo, all 4 roles) understands every component and can explain and demonstrate the system independently

## Non-Goals (Out of Scope)

- Connection to real JNTUH systems or databases
- Real payment processing (fee payment is mock only)
- HOD, examination cell, hostel, or principal role portals
- Email/SMS alert systems
- Progressive Web App (PWA) functionality
- AI chatbot integration
- Multi-language/internationalization support
- Real-time notifications (WebSocket)

## Secondary Priorities (If Time Permits)

- Parent access portal
- Dark mode toggle
- Mock fee payment flow
- Global search across all content

## Users

| Role | Description |
|------|-------------|
| **Public Visitor** | Anyone browsing the public website — prospective students, parents, faculty candidates |
| **Student** | Authenticated student viewing dashboard, attendance, results, timetable, fees, notices |
| **Faculty** | Authenticated faculty managing classes, marking attendance, entering internal marks, posting notices |
| **Admin** | Authenticated administrator managing notices, creating users, viewing system counts |

## Constraints

### Technical
- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Axios
- **Backend**: Spring Boot 3, Java 17 target (running on Java 25 LTS), Maven, Spring Security, Spring Data JPA, JWT
- **Database**: MySQL 8 with SQL schema and seed scripts
- **DevOps**: Docker, Docker Compose, Kubernetes (Docker Desktop), Jenkins, Selenium, Nagios
- **OS**: Development on Windows; Jenkins on Windows (use `bat` steps)
- **Security**: BCrypt passwords, JWT 2hr expiry, role-based auth, no secrets in git, env-based config

### Team
- **Solo developer** performing all 4 roles (P1-P4) sequentially
- AI mentor guides through each role's responsibilities

### Design
- Navy-and-gold visual direction unless changed
- Responsive: tested at ~375px mobile and desktop widths
- Polished university aesthetic, not a basic CRUD demo

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18 | UI framework |
| Vite | Latest | Build tool |
| Tailwind CSS | Latest | Utility-first styling |
| React Router | v6 | Client-side routing |
| Axios | Latest | HTTP client |
| Nginx | Latest | Production container serving |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Spring Boot | 3.x | Application framework |
| Java | 17 target (25 runtime) | Language |
| Maven | Latest | Build & dependency management |
| Spring Security | — | Authentication & authorization |
| Spring Data JPA | — | Database ORM |
| JWT (jjwt) | — | Token authentication |
| JUnit 5 | — | Testing |
| Spring Boot Actuator | — | Health endpoints |

### Database
| Technology | Version | Purpose |
|-----------|---------|---------|
| MySQL | 8 | Relational database |

### DevOps
| Technology | Purpose |
|-----------|---------|
| Git + GitHub | Version control, collaboration |
| GitHub Projects + Issues | Task tracking |
| Docker + Docker Compose | Local containerization |
| Kubernetes (Docker Desktop) | Production deployment target |
| Jenkins | CI/CD pipeline |
| Selenium WebDriver | End-to-end functional testing |
| Nagios Core | Service monitoring |

## Database Schema (12 Tables)

1. `users` — authentication and role management
2. `departments` — 12 JNTUH UCEST departments
3. `students` — student profiles linked to users
4. `faculty` — faculty profiles linked to users
5. `subjects` — course subjects per department/semester
6. `teaching` — faculty-subject-class assignments
7. `attendance` — daily attendance records
8. `marks` — internal/semester marks
9. `timetable` — weekly class schedule
10. `notices` — announcements (public + role-targeted)
11. `events` — upcoming campus events
12. `fees` — fee records with payment status

## API Surface (Planned)

| Method | Path | Auth | Role |
|--------|------|------|------|
| POST | /api/auth/login | No | — |
| GET | /api/public/notices | No | — |
| GET | /api/public/departments | No | — |
| GET | /api/public/departments/{code} | No | — |
| GET | /api/public/events | No | — |
| GET | /api/student/dashboard | Yes | STUDENT |
| GET | /api/student/attendance | Yes | STUDENT |
| GET | /api/student/results | Yes | STUDENT |
| GET | /api/student/timetable | Yes | STUDENT |
| GET | /api/student/fees | Yes | STUDENT |
| POST | /api/student/fees/{term}/pay | Yes | STUDENT |
| GET | /api/faculty/classes | Yes | FACULTY |
| POST | /api/faculty/attendance | Yes | FACULTY |
| POST | /api/faculty/marks | Yes | FACULTY |
| POST | /api/admin/notices | Yes | ADMIN |
| PUT | /api/admin/notices/{id} | Yes | ADMIN |
| DELETE | /api/admin/notices/{id} | Yes | ADMIN |
| POST | /api/admin/users | Yes | ADMIN |
| GET | /api/admin/stats | Yes | ADMIN |
| GET | /actuator/health | No | — |

## Success Criteria

### Application
- [ ] 10 public pages implemented with consistent navigation
- [ ] Responsive design tested at 375px and desktop
- [ ] Public notices are database-backed (admin publishes → public page updates)
- [ ] Login works for Student, Faculty, and Admin roles
- [ ] Student dashboard shows attendance, results, timetable, fees
- [ ] Faculty can view classes, mark attendance, enter marks
- [ ] Admin can manage notices and create users
- [ ] Unauthorized access is properly rejected
- [ ] Mock data loads correctly from seed scripts

### Engineering
- [ ] Code organized in clean project structure
- [ ] Backend JUnit tests pass for critical business logic
- [ ] Frontend builds without errors
- [ ] Docker Compose runs the full application (frontend + backend + MySQL)
- [ ] No secrets committed to git
- [ ] README documents setup and usage

### DevOps
- [ ] Kubernetes deployment with 2 backend replicas works
- [ ] Health checks operational, pod self-healing demonstrated
- [ ] Jenkins pipeline builds, tests, and deploys
- [ ] 5 Selenium tests pass against deployed application
- [ ] Nagios detects service failure and recovery

### Learning
- [ ] Developer can explain architectural decisions
- [ ] Developer can describe frontend-backend-database interaction
- [ ] Developer can explain the CI/CD pipeline
- [ ] Developer can demonstrate the system without AI assistance

---

*Last updated: 2026-10-11*
