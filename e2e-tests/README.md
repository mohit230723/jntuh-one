# Selenium E2E Automated Test Suite — UCEST One

> Automated End-to-End browser test suite verifying core functional workflows across the public website and role-based academic portals.

---

## 1. Test Suite Architecture

- **Engine:** Selenium WebDriver 4.21.0 + ChromeDriver (Headless Mode)
- **Framework:** JUnit 5 (Jupiter) with AssertJ fluent assertions
- **Driver Management:** Boni Garcia WebDriverManager 5.8.0 (zero manual driver setup)
- **Base Class:** `edu.jntuh.ucest.e2e.BaseE2ETest`
- **Dynamic Target:** Accepts `-DbaseUrl=<URL>` parameter, defaulting to `http://localhost:5173`

```
e2e-tests/
├── pom.xml                               # Maven build & test dependency management
├── runner.js                             # Node automated verification runner
└── src/test/java/edu/jntuh/ucest/e2e/
    ├── BaseE2ETest.java                  # Headless driver initialization & helper methods
    ├── HomePageE2ETest.java              # Test 1: Public Homepage & Notice Ticker
    ├── ExaminationsPageE2ETest.java      # Test 2: Circulars search & category filter
    ├── StudentPortalE2ETest.java         # Test 3: Student login & command desk
    ├── FacultyPortalE2ETest.java         # Test 4: Faculty login & instruction desk
    └── AdminPortalE2ETest.java           # Test 5: Admin login & governance console
```

---

## 2. Test Cases Overview

| # | Test Class | Coverage & Invariants Verified |
|---|------------|--------------------------------|
| **1** | `HomePageE2ETest` | Asserts page title, brand mark (`UCEST ONE*`), emergency dispatch marquee, latest official circulars heading, and notice cards. |
| **2** | `ExaminationsPageE2ETest` | Asserts R22 grading matrix, interactive keyword filtering via `#search-notices-input`, and category filtering via `#category-tab-exam`. |
| **3** | `StudentPortalE2ETest` | Authenticates via `#quick-fill-student` (`23011A0501` / `student123`), validates redirect to `/portal/student`, asserts welcome banner with roll number, and toggles `#tab-attendance`, `#tab-results`, and `#tab-fees`. |
| **4** | `FacultyPortalE2ETest` | Authenticates via `#quick-fill-faculty` (`FAC-CSE-102` / `faculty123`), validates redirect to `/portal/faculty`, asserts assigned courses, and switches `#faculty-tab-marks` and `#faculty-tab-attendance`. |
| **5** | `AdminPortalE2ETest` | Authenticates via `#quick-fill-admin` (`admin` / `admin123`), validates redirect to `/portal/admin`, asserts KPI metrics cards, and switches `#admin-tab-notices` and `#admin-tab-users`. |

---

## 3. How to Run the Tests

### Option A: Automated Node Verification Runner
Ideal for instant validation against local dev server:

```bash
# Run against active local server (default: http://localhost:5173)
node e2e-tests/runner.js

# Or against Docker Compose container deployment:
BASE_URL=http://localhost:3000 node e2e-tests/runner.js

# Or against Kubernetes NodePort deployment:
BASE_URL=http://localhost:30080 node e2e-tests/runner.js
```

### Option B: Maven Selenium Test Suite (Headless Chrome)
Ideal for CI/CD pipelines (Jenkins / GitHub Actions):

```bash
cd e2e-tests

# Run against local development server:
mvn clean test -DbaseUrl=http://localhost:5173

# Run against Docker Compose deployment:
mvn clean test -DbaseUrl=http://localhost:3000

# Run against Kubernetes deployment:
mvn clean test -DbaseUrl=http://localhost:30080
```

---

## 4. Verification Output

The test suite produces standard JUnit Surefire XML reports in `e2e-tests/target/surefire-reports/` suitable for Jenkins and automated build dashboards.
