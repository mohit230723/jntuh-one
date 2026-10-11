# Existing JNTUH UCEST System Audit & Pain Point Analysis

> **Document ID:** DOC-101  
> **Phase:** Phase 1 — Requirements, Research & Content  
> **Role:** P4 (Research, Content & QA)  
> **Target System:** JNTUH University College of Engineering, Science & Technology (jntuhceh.ac.in)

---

## 1. Executive Summary

The existing web presence for JNTUH UCEST (formerly JNTUH CEH) suffers from fragmentation, legacy user interface design, unoptimized mobile performance, and a completely disconnected user experience between public information pages and academic services.

Students, faculty, and prospective candidates currently navigate multiple disparate systems:
1. The public institution website (`jntuhceh.ac.in`)
2. The autonomous examination portal
3. Department-specific standalone Google Sites or outdated static pages
4. Paper-based or offline notice boards for urgent circulars

**UCEST One** replaces this fractured architecture with a cohesive, responsive web platform featuring unified branding, centralized database-backed circulars, and role-based student/faculty/admin portals.

---

## 2. Identified Pain Points

### 2.1 Visual Design & Brand Identity
- **Issue:** Visual styling resembles early-2000s web design with outdated table layouts, inconsistent font pairings (Times New Roman mixed with default sans-serif), and unaligned marquee banners.
- **Impact:** Fails to convey the prestige of premier state engineering college established in 1965 with NBA Tier-1 accreditation.
- **UCEST One Solution:** Modern, academic aesthetic with a distinguished navy-and-gold color palette, clean typography (Inter / Outfit), card-based layout, and micro-interactions.

### 2.2 Mobile Responsiveness & Accessibility
- **Issue:** The current website is not mobile-responsive. Horizontal scrolling is required on mobile devices, table layouts break on narrow screens, and touch targets are too small.
- **Impact:** Over 75% of student traffic originates from mobile devices, leading to high frustration and missed critical notifications.
- **UCEST One Solution:** Mobile-first responsive design utilizing modern CSS Grid and Flexbox, with touch-friendly navigation, collapsible drawers, and readable viewports.

### 2.3 Information Architecture & Navigation
- **Issue:** Navigation menus are overloaded with deep, disorganized dropdown trees (up to 4 levels deep). Links are duplicated across headers, footers, and sidebars with contradictory naming.
- **Impact:** Prospective students struggle to find cutoff ranks or syllabus details; current students struggle to locate exam timetables or fee schedules.
- **UCEST One Solution:** Clean, structured primary navigation with 10 well-defined public pages and clear role-based portal access buttons.

### 2.4 Circulars & Notice Management
- **Issue:** Notices are posted as raw PDF files with cryptically coded filenames (e.g., `not_2024_08_02_v2.pdf`) inside non-searchable HTML tables or marquee elements. Expired notices remain indefinitely.
- **Impact:** Critical notifications regarding exam fee deadlines, hall ticket downloads, or timetable changes are buried and unsearchable.
- **UCEST One Solution:** Database-driven notice system with category filtering (Academic, Exam, Events, General), date badges, keyword search, priority pinning, and administrative publishing workflow.

### 2.5 Portal Disconnection & Manual Workflows
- **Issue:** No single sign-on or unified portal. Student attendance, internal marks, and exam timetables are managed via external portals or spreadsheet printouts on department bulletin boards.
- **Impact:** Students cannot check their cumulative attendance percentages or internal marks progression in real-time. Faculty spend hours manually tabulating attendance.
- **UCEST One Solution:** Authenticated role-based portals (Student, Faculty, Admin) backed by a relational MySQL schema and JWT authorization.

---

## 3. Comparative Matrix: Existing vs. UCEST One

| Evaluation Metric | Existing College Web Presence | UCEST One (Unified Platform) |
| :--- | :--- | :--- |
| **Visual Design** | Legacy 2000s styling, harsh borders, marquee text | Modern academic aesthetic, Navy & Gold theme, subtle elevation |
| **Responsiveness** | Desktop-only table structures; breaks on mobile | 100% mobile, tablet, and desktop responsive |
| **Notices & Circulars** | Raw unsearchable PDFs in marquee tables | Real-time database-backed notice board with search & category tags |
| **Portal Integration** | Disconnected external sites or offline boards | Single unified portal with role-based JWT authentication |
| **Student Dashboard** | Non-existent or fragmented third-party tool | Centralized dashboard: attendance %, marks, timetable, fees |
| **Faculty Workflow** | Paper sheets / Excel uploads | Web-based class attendance marking & marks entry |
| **Department Showcase** | Varying, broken, or missing department sub-pages | Standardized template with comprehensive CSE spotlight |
| **DevOps & Architecture** | Monolithic shared hosting, manual FTP updates | Containerized Docker & K8s deployment, CI/CD pipeline, Nagios monitoring |
| **Testing & Reliability** | Manual, ad-hoc, prone to downtime | Automated Selenium E2E suite, health endpoints, active recovery demo |

---

## 4. UI/UX Transformation Targets

```
[ Existing JNTUH CEH Site ]                  [ UCEST One Platform ]
┌───────────────────────────────┐            ┌─────────────────────────────────────────┐
│ [Marquee: EXAM FEE EXTENDED]  │            │ [Navbar: Brand | 10 Pages | Portal Login]│
│ Table Header (Blue/Grey)      │            ├─────────────────────────────────────────┤
│ - Home | About | Depts | Exam │            │ [Hero: Modern campus view + CTA]        │
├───────────────────────────────┤            ├─────────────────────────────────────────┤
│ Left Sidebar: 35 links        │            │ [Notices Ticker: Filterable & Searchable]│
│ Center: Wall of text          │   ──────►   ├─────────────────────────────────────────┤
│ Right: Broken image banners   │            │ [Card Grid: Academic Programs & Depts]  │
├───────────────────────────────┤            ├─────────────────────────────────────────┤
│ Footer: Bare text links       │            │ [Footer: Accreditation, Links, Contact] │
└───────────────────────────────┘            └─────────────────────────────────────────┘
```

---

*Verified by: P4 (Research, Content & QA Lead)*
