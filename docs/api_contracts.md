# REST API Interface Contracts & DTO Specification

> **Document ID:** DOC-107  
> **Phase:** Phase 1 — Requirements, Research & Content  
> **Role:** P4 (Research, Content & QA) / P2 (Backend & Database)  
> **Status:** Frozen for Phase 2 Implementation  
> **Base URL:** `/api`

---

## 1. Global Standards & Conventions

### 1.1 Content Negotiation & Encoding
- All requests containing bodies must send: `Content-Type: application/json`
- All JSON responses will be encoded in `UTF-8`.
- Timestamps formatted as ISO-8601 strings: `YYYY-MM-DDTHH:mm:ssZ`.

### 1.2 Authentication Header
All protected endpoints require Bearer JWT token:
```http
Authorization: Bearer <jwt-token>
```

### 1.3 Standard Error Format
```json
{
  "timestamp": "2026-10-11T12:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Detailed error explanation",
  "path": "/api/student/fees/pay"
}
```

---

## 2. Authentication API (`/api/auth`)

### 2.1 User Login
- **Method & Path**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "username": "23011A0501",
    "password": "student123"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 7200,
    "user": {
      "id": 1,
      "username": "23011A0501",
      "email": "23011a0501@ucest.edu",
      "name": "A. Rahul Sharma",
      "role": "ROLE_STUDENT",
      "department": "CSE"
    }
  }
  ```
- **Error Responses**: `401 Unauthorized` (Invalid credentials).

### 2.2 Get Authenticated Profile
- **Method & Path**: `GET /api/auth/me`
- **Access**: `ROLE_STUDENT`, `ROLE_FACULTY`, `ROLE_ADMIN`
- **Success Response (`200 OK`)**:
  ```json
  {
    "id": 1,
    "username": "23011A0501",
    "email": "23011a0501@ucest.edu",
    "name": "A. Rahul Sharma",
    "role": "ROLE_STUDENT",
    "department": "CSE"
  }
  ```

---

## 3. Public Website API (`/api/public`)

### 3.1 Get Notices (Paginated & Filterable)
- **Method & Path**: `GET /api/public/notices`
- **Query Parameters**:
  - `category` (optional): `ACADEMIC`, `EXAM`, `EVENTS`, `GENERAL`
  - `search` (optional): string keyword search
  - `page` (default 0), `size` (default 10)
- **Success Response (`200 OK`)**:
  ```json
  {
    "content": [
      {
        "id": 1,
        "title": "Semester End Examination Schedule Notification",
        "category": "EXAM",
        "description": "Autonomous B.Tech V Semester regular & supplementary examinations schedule released.",
        "postedDate": "2026-10-10",
        "pinned": true,
        "author": "Exam Branch"
      }
    ],
    "totalElements": 24,
    "totalPages": 3,
    "currentPage": 0
  }
  ```

### 3.2 Get Single Notice Detail
- **Method & Path**: `GET /api/public/notices/{id}`
- **Success Response (`200 OK`)**: Notice object. `404 Not Found` if missing.

### 3.3 Get Departments List
- **Method & Path**: `GET /api/public/departments`
- **Success Response (`200 OK`)**:
  ```json
  [
    {
      "code": "CSE",
      "name": "Computer Science and Engineering",
      "establishedYear": 1984,
      "hodName": "Dr. A. Kavitha",
      "intake": 60,
      "featured": true
    }
  ]
  ```

### 3.4 Get Department Details
- **Method & Path**: `GET /api/public/departments/{code}`
- **Success Response (`200 OK`)**: Full departmental payload including HOD, faculty roster, labs, and curriculum.

---

## 4. Student Portal API (`/api/student`)

### 4.1 Get Student Dashboard Summary
- **Method & Path**: `GET /api/student/dashboard`
- **Access**: `ROLE_STUDENT`
- **Success Response (`200 OK`)**:
  ```json
  {
    "rollNumber": "23011A0501",
    "name": "A. Rahul Sharma",
    "branch": "CSE",
    "semester": 5,
    "overallAttendancePercentage": 88.5,
    "cgpa": 8.92,
    "pendingFeeAmount": 0.0,
    "recentNoticesCount": 3
  }
  ```

### 4.2 Get Subject-Wise Attendance
- **Method & Path**: `GET /api/student/attendance`
- **Access**: `ROLE_STUDENT`
- **Success Response (`200 OK`)**:
  ```json
  {
    "overallPercentage": 88.5,
    "totalClassesConducted": 240,
    "totalClassesAttended": 212,
    "subjects": [
      {
        "subjectCode": "CS501PC",
        "subjectName": "Database Management Systems",
        "facultyName": "Mr. P. Vijay Kumar",
        "conducted": 48,
        "attended": 44,
        "percentage": 91.6,
        "warning": false
      },
      {
        "subjectCode": "CS504PC",
        "subjectName": "Design and Analysis of Algorithms",
        "facultyName": "Mrs. S. Radhika",
        "conducted": 50,
        "attended": 36,
        "percentage": 72.0,
        "warning": true
      }
    ]
  }
  ```

### 4.3 Get Semester Results & Grade Card
- **Method & Path**: `GET /api/student/results`
- **Access**: `ROLE_STUDENT`
- **Query Parameters**: `semester` (optional, defaults to latest)
- **Success Response (`200 OK`)**:
  ```json
  {
    "semester": 4,
    "sgpa": 8.85,
    "cgpa": 8.92,
    "creditsEarned": 21.0,
    "grades": [
      {
        "subjectCode": "CS401PC",
        "subjectName": "Discrete Mathematics",
        "grade": "O",
        "gradePoints": 10,
        "credits": 4.0,
        "status": "PASS"
      }
    ]
  }
  ```

### 4.4 Get Weekly Timetable
- **Method & Path**: `GET /api/student/timetable`
- **Access**: `ROLE_STUDENT`
- **Success Response (`200 OK`)**: Day-wise slots (`MONDAY` through `FRIDAY`).

### 4.5 Get Fee Summary & Invoices
- **Method & Path**: `GET /api/student/fees`
- **Access**: `ROLE_STUDENT`
- **Success Response (`200 OK`)**:
  ```json
  {
    "totalAcademicFee": 35000.0,
    "amountPaid": 35000.0,
    "pendingDue": 0.0,
    "transactions": [
      {
        "receiptNo": "UCEST-2026-FEE-8891",
        "amount": 35000.0,
        "paymentDate": "2026-08-14",
        "mode": "ONLINE",
        "status": "SUCCESS"
      }
    ]
  }
  ```

---

## 5. Faculty Portal API (`/api/faculty`)

### 5.1 Get Assigned Classes
- **Method & Path**: `GET /api/faculty/classes`
- **Access**: `ROLE_FACULTY`
- **Success Response (`200 OK`)**: List of assigned subjects, batches, and student counts.

### 5.2 Get Enrolled Students for a Subject
- **Method & Path**: `GET /api/faculty/classes/{subjectCode}/students`
- **Access**: `ROLE_FACULTY`
- **Success Response (`200 OK`)**: List of students with roll numbers and names.

### 5.3 Submit Daily Attendance
- **Method & Path**: `POST /api/faculty/attendance`
- **Access**: `ROLE_FACULTY`
- **Request Body**:
  ```json
  {
    "subjectCode": "CS501PC",
    "date": "2026-10-11",
    "timeSlot": "09:30 - 10:30",
    "attendanceList": [
      { "rollNumber": "23011A0501", "present": true },
      { "rollNumber": "23011A0502", "present": true },
      { "rollNumber": "23011A0505", "present": false }
    ]
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "status": "SUCCESS",
    "recordedCount": 60,
    "presentCount": 54,
    "absentCount": 6
  }
  ```

### 5.4 Submit Internal Marks
- **Method & Path**: `POST /api/faculty/marks`
- **Access**: `ROLE_FACULTY`
- **Request Body**:
  ```json
  {
    "subjectCode": "CS501PC",
    "examType": "MID_1",
    "maxMarks": 30,
    "marksList": [
      { "rollNumber": "23011A0501", "marksObtained": 28 },
      { "rollNumber": "23011A0502", "marksObtained": 30 }
    ]
  }
  ```
- **Success Response (`200 OK`)**: Status confirmation.

---

## 6. Admin Portal API (`/api/admin`)

### 6.1 Get System Overview Stats
- **Method & Path**: `GET /api/admin/stats`
- **Access**: `ROLE_ADMIN`
- **Success Response (`200 OK`)**:
  ```json
  {
    "totalStudents": 60,
    "totalFaculty": 12,
    "activeNotices": 6,
    "departmentsCount": 12,
    "totalFeeCollected": 1980000.0
  }
  ```

### 6.2 Create / Publish Notice
- **Method & Path**: `POST /api/admin/notices`
- **Access**: `ROLE_ADMIN`, `ROLE_FACULTY`
- **Request Body**:
  ```json
  {
    "title": "Autonomous B.Tech Recounting Notice",
    "category": "EXAM",
    "description": "Last date to apply for recounting is Oct 30.",
    "pinned": true
  }
  ```
- **Success Response (`201 Created`)**: Created Notice record.

### 6.3 Provision New User
- **Method & Path**: `POST /api/admin/users`
- **Access**: `ROLE_ADMIN`
- **Request Body**:
  ```json
  {
    "username": "23011A0561",
    "email": "23011a0561@ucest.edu",
    "password": "password123",
    "fullName": "New Student Name",
    "role": "ROLE_STUDENT",
    "department": "CSE"
  }
  ```
- **Success Response (`201 Created`)**: User summary with generated ID.

---

*Authored by: P4 (Research, Content & QA Lead)*  
*Reviewed & Accepted by: P2 (Backend & Database Lead)*
