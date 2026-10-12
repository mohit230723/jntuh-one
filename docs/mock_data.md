# Mock Datasets & Class Roster Specification

> **Document ID:** DOC-106  
> **Phase:** Phase 1 — Requirements, Research & Content  
> **Role:** P4 (Research, Content & QA)  
> **Target Audience:** Phase 2 (Database seed.sql) & Phase 3 (Backend/Frontend)

---

## 1. System Administrative Accounts

| User ID | Username / Email | Password (Plain) | BCrypt Hash (Cost 10) | Role | Full Name |
|---|---|---|---|---|---|
| `ADM-001` | `admin@ucest.edu` | `admin123` | `$2a$10$wK1k6V9wT0m3N0L...` | `ROLE_ADMIN` | Dr. S. K. Sharma (Registrar) |

---

## 2. Teaching Faculty Accounts (8 CSE Faculty)

| Faculty ID | Email | Password (Plain) | Role | Name | Designation | Assigned Subjects |
|---|---|---|---|---|---|---|
| `FAC-CSE-101` | `kavitha.cse@jntuh.ac.in` | `faculty123` | `ROLE_FACULTY` | Dr. A. Kavitha | Prof & HOD | Cloud Computing (PE) |
| `FAC-CSE-102` | `vijaykumar.cse@jntuh.ac.in` | `faculty123` | `ROLE_FACULTY` | Mr. P. Vijay Kumar | Asst. Professor | CS501PC: DBMS, CS503PC: Web Tech |
| `FAC-CSE-103` | `gvr.cse@jntuh.ac.in` | `faculty123` | `ROLE_FACULTY` | Dr. G. Venkatarami Reddy | Assoc. Professor | CS502PC: Computer Networks |
| `FAC-CSE-104` | `radhika.cse@jntuh.ac.in` | `faculty123` | `ROLE_FACULTY` | Mrs. S. Radhika | Asst. Professor | CS504PC: DAA |
| `FAC-CSE-105` | `sateesh.cse@jntuh.ac.in` | `faculty123` | `ROLE_FACULTY` | Dr. B. Sateesh Kumar | Assoc. Professor | CS505PC: Software Engineering |
| `FAC-CSE-106` | `sammulal.cse@jntuh.ac.in` | `faculty123` | `ROLE_FACULTY` | Dr. P. Sammulal | Professor | CS701PC: Data Mining |
| `FAC-CSE-107` | `ramesh.cse@jntuh.ac.in` | `faculty123` | `ROLE_FACULTY` | Dr. D. Ramesh | Professor | CS702PC: Information Security |
| `FAC-CSE-108` | `anitha.cse@jntuh.ac.in` | `faculty123` | `ROLE_FACULTY` | Mrs. T. Anitha | Asst. Professor | CS506PC: DBMS Lab |

---

## 3. Student Roster: B.Tech CSE Class of 2023-2027 (Semester V)

*60 Students (Roll Numbers: `23011A0501` through `23011A0560`). Default Password: `student123`*

| Roll Number | Full Name | Gender | Email | Overall Attendance | Current CGPA | Fee Status |
|---|---|---|---|---|---|---|
| `23011A0501` | A. Rahul Sharma | M | `23011a0501@ucest.edu` | 88.5% | 8.92 | PAID |
| `23011A0502` | B. Sneha Reddy | F | `23011a0502@ucest.edu` | 92.0% | 9.45 | PAID |
| `23011A0503` | C. Sai Krishna | M | `23011a0503@ucest.edu` | 76.5% | 7.80 | PENDING (₹5,000) |
| `23011A0504` | D. Ananya Rao | F | `23011a0504@ucest.edu` | 94.0% | 9.15 | PAID |
| `23011A0505` | E. Karthik Varma | M | `23011a0505@ucest.edu` | 68.0% *(Warning)* | 6.75 | PAID |
| `23011A0506` | G. Divya Sree | F | `23011a0506@ucest.edu` | 85.0% | 8.40 | PAID |
| `23011A0507` | H. Vikramaditya | M | `23011a0507@ucest.edu` | 81.0% | 8.10 | PAID |
| `23011A0508` | J. Pooja Patel | F | `23011a0508@ucest.edu` | 90.5% | 9.05 | PAID |
| `23011A0509` | K. Nikhil Teja | M | `23011a0509@ucest.edu` | 62.0% *(Critical)*| 6.20 | PENDING (₹12,000)|
| `23011A0510` | L. Manasa Devi | F | `23011a0510@ucest.edu` | 87.0% | 8.70 | PAID |
| `23011A0511` | M. Tarun Kumar | M | `23011a0511@ucest.edu` | 79.0% | 7.95 | PAID |
| `23011A0512` | N. Harini Priya | F | `23011a0512@ucest.edu` | 91.0% | 9.20 | PAID |
| `23011A0513` | P. Abhinav Reddy | M | `23011a0513@ucest.edu` | 83.5% | 8.30 | PAID |
| `23011A0514` | R. Swathi Krishna | F | `23011a0514@ucest.edu` | 89.0% | 8.85 | PAID |
| `23011A0515` | S. Pradeep Rao | M | `23011a0515@ucest.edu` | 74.0% *(Warning)* | 7.40 | PENDING (₹8,000) |
| ... | *(Rolls `23011A0516` to `23011A0560` programmatically populated in Phase 2 seed.sql)* | ... | ... | ... | ... | ... |

*(The designated primary demo student account for walkthroughs is `23011A0501` / `student123`).*

---

## 4. Subject Catalog (Semester V)

| Subject Code | Subject Title | Credits | Type | Faculty Assigned |
|---|---|---|---|---|
| `CS501PC` | Database Management Systems | 4 | Professional Core | Mr. P. Vijay Kumar |
| `CS502PC` | Computer Networks | 4 | Professional Core | Dr. G. Venkatarami Reddy |
| `CS503PC` | Web Technologies | 3 | Professional Core | Mr. P. Vijay Kumar |
| `CS504PC` | Design and Analysis of Algorithms | 4 | Professional Core | Mrs. S. Radhika |
| `CS505PC` | Software Engineering | 3 | Professional Core | Dr. B. Sateesh Kumar |
| `CS506PC` | Database Management Systems Lab | 1.5 | Practical Lab | Mrs. T. Anitha |
| `CS507PC` | Web Technologies Lab | 1.5 | Practical Lab | Mr. P. Vijay Kumar |

---

## 5. Weekly Timetable Specification (CSE Section A - Sem V)

| Time Slot | Monday | Tuesday | Wednesday | Thursday | Friday |
|---|---|---|---|---|---|
| **09:30 - 10:30** | CS501PC (DBMS) | CS504PC (DAA) | CS502PC (CN) | CS503PC (WT) | CS505PC (SE) |
| **10:30 - 11:30** | CS502PC (CN) | CS501PC (DBMS) | CS504PC (DAA) | CS505PC (SE) | CS503PC (WT) |
| **11:30 - 11:45** | *Tea Break* | *Tea Break* | *Tea Break* | *Tea Break* | *Tea Break* |
| **11:45 - 12:45** | CS503PC (WT) | CS505PC (SE) | CS501PC (DBMS) | CS502PC (CN) | CS504PC (DAA) |
| **12:45 - 01:45** | *Lunch Break* | *Lunch Break* | *Lunch Break* | *Lunch Break* | *Lunch Break* |
| **01:45 - 03:45** | CS506PC (DBMS Lab) | Library / Sports | CS507PC (WT Lab) | Remedial / Seminars | Coding Club |

---

## 6. Seed Notice Data (6 Sample Initial Notices)

1. **Semester End Examination Schedule Notification** (`EXAM`, Pinned: `true`)
   - Description: "Autonomous B.Tech V Semester regular & supplementary examinations schedule released. Download timetable."
2. **Condonation of Attendance Notification** (`ACADEMIC`, Pinned: `true`)
   - Description: "Students with aggregate attendance between 65% and 75% on medical grounds must submit documentation by 25th Oct."
3. **Campus Placement Drive — Oracle & Salesforce** (`GENERAL`, Pinned: `false`)
   - Description: "Registrations for eligible final year and pre-final year students open on T&P portal."
4. **Pragnya 2026 Annual Technical Fest** (`EVENTS`, Pinned: `false`)
   - Description: "National level technical symposium organized by CSE Department scheduled for Nov 14-16."
5. **Hostel Fee Dues Clearance Circular** (`GENERAL`, Pinned: `false`)
   - Description: "All hostel residents are advised to clear outstanding mess charges before semester registration."
6. **Odd Semester Open Elective Allocation** (`ACADEMIC`, Pinned: `false`)
   - Description: "List of allocated open electives for III Year B.Tech students published on department notice board."

---

*Authored by: P4 (Research, Content & QA Lead)*
