# Public Website Content Outline (10 Pages)

> **Document ID:** DOC-103  
> **Phase:** Phase 1 — Requirements, Research & Content  
> **Role:** P4 (Research, Content & QA)  
> **Scope:** Full structural and textual specification for all 10 public pages.

---

## 1. Page 1: Home (`/`)

### 1.1 Hero Section
- **Headline**: "Empowering Innovators, Engineering the Future"
- **Sub-headline**: "JNTUH University College of Engineering, Science & Technology — Premier Autonomous Institution of Technical Excellence Since 1965."
- **Call-to-Action Buttons**:
  - Primary CTA: "Explore Academics" (links to `/academics`)
  - Secondary CTA: "Student & Faculty Portal" (links to `/login`)
- **Key Metric Badges**:
  - `NBA Tier-1` Accredited
  - `NAAC A+` Grade
  - `60+ Years` of Engineering Legacy
  - `44 LPA` Highest Placement Package

### 1.2 Principal's Welcome
- **Title**: "From the Principal's Desk"
- **Principal Name**: Dr. G. K. Viswanadh (Professor & Principal)
- **Summary Message**: Welcoming aspiring engineers to an ecosystem of rigorous academics, hands-on R&D labs, and industry leadership.
- **Key Focus**: Fostering innovation, entrepreneurship, and global technical competencies.

### 1.3 Announcements & Circulars Ticker
- Live feed pulling from `/api/public/notices` with category badges:
  - `EXAM`: Semester End Examination Time Table Notification
  - `ACADEMIC`: Registration for B.Tech R22 Odd Semester Open Electives
  - `EVENTS`: Annual Technical Symposium Pragnya 2026 Registrations Open
  - `GENERAL`: Hostels Re-admission Schedule for Academic Year

### 1.4 Highlights & Core Pillars
- **Academic Distinction**: Autonomous R22 curriculum aligned with NEP 2020.
- **Cutting-Edge Infrastructure**: 45+ specialized research laboratories.
- **Top-Tier Placements**: Over 85% placement rate with Fortune 500 tech firms.
- **Vibrant Campus Life**: 20+ student clubs, technical societies, and sports facilities.

### 1.5 Department Showcase Teaser
- Interactive cards featuring top departments with direct links to `/departments` and `/departments/cse`.

---

## 2. Page 2: About Us (`/about`)

### 2.1 Institutional Heritage
- Established in 1965 as Nagarjuna Sagar Engineering College.
- Shifted to Kukatpally campus in 1970; constituent college of JNTU Hyderabad.
- Autonomous status granted in 2010.

### 2.2 Vision & Mission
- **Vision**: To be recognized as a world-class center of technical education and research producing socially responsible engineering leaders.
- **Mission**:
  1. Deliver rigorous, outcome-based engineering education.
  2. Cultivate research, innovation, and technological entrepreneurship.
  3. Establish strong collaborations with premier industry partners and research institutions.
  4. Inculcate ethical values, professional integrity, and leadership abilities.

### 2.3 Accreditation & Recognitions
- NBA Accreditation Tier-1 for all undergraduate engineering programs.
- NAAC Accreditation with 'A+' Grade.
- NIRF Top Tier Engineering College in Telangana State.

### 2.4 College Leadership
- Principal: Dr. G. K. Viswanadh
- Vice Principal: Dr. P. Sammulal
- Key Academic Officers and Department Heads list.

---

## 3. Page 3: Academics (`/academics`)

### 3.1 Academic Programs
- **Undergraduate (B.Tech - 4 Years)**:
  - Computer Science & Engineering (Intake: 60)
  - Artificial Intelligence & Machine Learning (Intake: 60)
  - Electronics & Communication Engineering (Intake: 60)
  - Electrical & Electronics Engineering (Intake: 60)
  - Mechanical Engineering (Intake: 60)
  - Civil Engineering (Intake: 60)
  - Chemical Engineering (Intake: 60)
  - Metallurgical Engineering (Intake: 60)
- **Postgraduate (M.Tech - 2 Years)**:
  - Advanced Computing, VLSI System Design, Power Electronics, Structural Engineering, Thermal Engineering.
- **Doctoral Programs (Ph.D.)**:
  - Full-time and part-time research across all core engineering disciplines.

### 3.2 Autonomous Academic Regulations (R22)
- Choice-Based Credit System (CBCS).
- Evaluation Model: 40% Continuous Internal Evaluation (CIE) + 60% Semester End Examination (SEE).
- Minimum attendance requirement: 75% aggregate to qualify for SEE.

### 3.3 Academic Calendar
- Key dates for Odd and Even Semesters: Commencement of classwork, Mid-1 examinations, Mid-2 examinations, Practical tests, and End semester evaluations.

---

## 4. Page 4: Departments Directory (`/departments`)

### 4.1 Department Directory Grid
1. Computer Science and Engineering (CSE) — *Featured Detail Page*
2. Electronics and Communication Engineering (ECE)
3. Electrical and Electronics Engineering (EEE)
4. Mechanical Engineering (ME)
5. Civil Engineering (CE)
6. Chemical Engineering (CHE)
7. Metallurgical Engineering (MTE)
8. Mathematics Department
9. Physics Department
10. Chemistry Department
11. Humanities and Social Sciences
12. Physical Education

*Each card includes: Department Head name, Student intake, Established year, and link.*

---

## 5. Page 5: Featured Department — CSE (`/departments/cse`)

*(Full-detail departmental blueprint specified in `docs/cse_department.md`)*
- Complete HOD Profile
- 12 Faculty Members with designations, credentials, and research domains
- 5 Advanced Laboratories description
- R22 B.Tech Curriculum breakdown
- Student Placements and Industry recruiters

---

## 6. Page 6: Admissions (`/admissions`)

### 6.1 Admission Pathways
- **B.Tech First Year**: Convenor Quota via TG-EAPCET (formerly TS-EAMCET).
- **Lateral Entry (Second Year B.Tech)**: Via TG-ECET for Diploma holders.
- **M.Tech Admissions**: Via GATE / TG-PGECET rankings.
- **NRI / International Students**: Through institutional international affairs cell.

### 6.2 Seat Matrix & Cutoff Trends
- Opening and closing rank distributions for General, OBC, SC, ST categories for CSE, ECE, EEE, and other branches.

### 6.3 Annual Fee Structure
- Tuition Fee, Autonomous Examination Fee, Library & Laboratory Deposit, Student Welfare Fund.

---

## 7. Page 7: Examinations (`/examinations`)

### 7.1 Autonomous Examination Cell
- Role of Controller of Examinations (CoE) and Addl. Controllers.
- Examination governance, paper setting, and confidential evaluation protocols.

### 7.2 Grading System & Evaluation
- 10-point letter grading scale:
  - `O` (Outstanding): 10 Grade Points (>= 90%)
  - `A+` (Excellent): 9 Grade Points (80 - 89%)
  - `A` (Very Good): 8 Grade Points (70 - 79%)
  - `B+` (Good): 7 Grade Points (60 - 69%)
  - `B` (Above Average): 6 Grade Points (50 - 59%)
  - `C` (Pass): 5 Grade Points (40 - 49%)
  - `F` (Fail): 0 Grade Points (< 40%)
- SGPA and CGPA computation formulas and promotion criteria.

### 7.3 Downloadable Forms & Procedures
- Application for Re-evaluation / Recounting.
- Procedure for obtaining Consolidated Marks Memo (CMM) and Provisional Degree Certificate (PC).

---

## 8. Page 8: Campus Life (`/campus-life`)

### 8.1 Student Accommodation (Hostels)
- On-campus Boys' Hostels (Nagarjuna, Kinnera, Krishna) and Girls' Hostels (Godavari, Kaveri).
- Wi-Fi enabled, hygienic dining halls, solar hot water, and 24/7 security.

### 8.2 Clubs & Student Societies
- **Technical**: ACM Student Chapter, IEEE UCEST Student Branch, CSI Chapter, Robotics Club, Google Developer Groups (GDG) on Campus.
- **Cultural & Arts**: Literary Club, Music & Drama Society, Photography Club, NCC / NSS Wings.

### 8.3 Annual Festivals
- **Spandana**: Flagship annual national-level cultural extravaganza.
- **Pragnya**: Inter-collegiate national technical symposium.

### 8.4 Sports Complex & Gymnasium
- 400m athletic track, cricket pavilion, basketball courts, badminton courts, indoor sports arena.

---

## 9. Page 9: Research & Innovation (`/research`)

### 9.1 Research Centers & R&D Cell
- Centre for Artificial Intelligence and Data Science.
- Centre for VLSI and Embedded Systems.
- Advanced Materials and Metallurgy Testing Facility.

### 9.2 Funded Projects & Industry Grants
- Research grants from DST, SERB, DRDO, AICTE, and MeitY.

### 9.3 Intellectual Property & Incubation
- University Patent Cell assistance.
- UCEST Innovation & Startup Hub fostering student-led entrepreneurship.

---

## 10. Page 10: Contact Us (`/contact`)

### 10.1 Campus Location & Reach
- **Physical Address**: JNTUH University College of Engineering, Science & Technology, Kukatpally, Hyderabad, Telangana — 500085, India.
- **Nearest Transit**: JNTU College Metro Station (Red Line) — 200m walking distance.

### 10.2 Administrative Contact Directory
- Principal's Office: `principal.ceh@jntuh.ac.in` | `+91-40-23158661`
- Examination Branch: `examcell.ceh@jntuh.ac.in` | `+91-40-23158662`
- Academic Section: `academics.ceh@jntuh.ac.in`
- Training & Placement Cell: `placements.ceh@jntuh.ac.in`

### 10.3 Interactive Feedback & Query Form
- Input fields: Full Name, Email, Phone, Category (Admission, Academic, Examination, General), Message.
- Instant submission with validation.

---

*Authored by: P4 (Research, Content & QA Lead)*
