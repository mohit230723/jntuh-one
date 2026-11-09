# Jenkins CI/CD Pipeline Setup Guide — UCEST One

> Step-by-step documentation for configuring, running, and troubleshooting the automated CI/CD pipeline on Jenkins.

---

## 1. Pipeline Architecture

```
[Git Push to develop] ──► [Jenkins Webhook / Poll SCM]
                                    │
                                    ▼
                          ┌──────────────────┐
                          │ 1. Checkout SCM  │
                          └─────────┬────────┘
                                    ▼
                          ┌──────────────────┐
                          │ 2. Frontend Build│ (Vite / React 18 / Orderful CSS)
                          └─────────┬────────┘
                                    ▼
                          ┌──────────────────┐
                          │ 3. Backend Build │ (Spring Boot 3 / JUnit 5 Tests)
                          └─────────┬────────┘
                                    ▼
                          ┌──────────────────┐
                          │ 4. Docker Build  │ (ucest-backend & ucest-frontend)
                          └─────────┬────────┘
                                    ▼
                          ┌──────────────────┐
                          │ 5. K8s Deploy    │ (kubectl apply -k k8s/)
                          └─────────┬────────┘
                                    ▼
                          ┌──────────────────┐
                          │ 6. Selenium E2E  │ (Headless Chrome E2E suite)
                          └─────────┬────────┘
                                    ▼
                          ┌──────────────────┐
                          │ Post: Reports    │ (JUnit test publish & archiving)
                          └──────────────────┘
```

---

## 2. Prerequisites & Installed Tools

Since Jenkins is already installed on the Windows laptop, ensure the following are accessible in the Jenkins system PATH:

- **Java JDK 17+**: `java -version`
- **Node.js 18+ / npm**: `node -v` and `npm -v`
- **Docker Desktop**: `docker --version`
- **Kubernetes CLI**: `kubectl version --client`
- **Git CLI**: `git --version`

---

## 3. Required Jenkins Plugins

Navigate to **Manage Jenkins** → **Plugins** → **Available Plugins**, and verify or install:

1. **Pipeline: Declarative** (`pipeline-model-definition`)
2. **Git Plugin** (`git`)
3. **JUnit Plugin** (`junit`) — *Required for surefire XML test reporting*
4. **HTML Publisher Plugin** (optional, for code coverage/reports)
5. **NodeJS Plugin** (optional, if using Jenkins tool-managed Node)

---

## 4. Creating the Pipeline Job in Jenkins

1. Go to **Jenkins Dashboard** → **New Item**.
2. Enter Name: **`UCEST-One-Pipeline`**.
3. Select **Pipeline** (or **Multibranch Pipeline**) and click **OK**.
4. In the Configuration page:
   - Check **This project is parameterized** (parameters defined in `Jenkinsfile` will be automatically populated after first run).
   - Under **Build Triggers**: Check **Poll SCM** (`H/5 * * * *` for every 5 minutes) or GitHub hook trigger.
   - Under **Pipeline**:
     - **Definition:** `Pipeline script from SCM`
     - **SCM:** `Git`
     - **Repository URL:** `https://github.com/mohit230723/jntuh-one.git`
     - **Credentials:** Add your GitHub personal access token (if private) or None (if public).
     - **Branch Specifier:** `*/develop`
     - **Script Path:** `Jenkinsfile`
5. Click **Save**.

---

## 5. Running the Pipeline

1. Click **Build with Parameters** (or **Build Now** for the initial run).
2. Available Parameters:
   - `DEPLOY_K8S`: `true` (deploys to local Kubernetes cluster via Kustomize)
   - `RUN_E2E`: `true` (runs automated Selenium E2E tests)
   - `TEST_BASE_URL`: `http://localhost:30080` (or `http://localhost:5173` for dev server)
3. Monitor the build in **Console Output** or **Pipeline Stage View**.
4. At pipeline completion:
   - Check **Test Result** tab: Displays passing JUnit unit and integration tests.
   - Check **Build Artifacts**: Download generated `app.jar` and `dist/` bundle.

---

## 6. Windows-Specific Considerations

The `Jenkinsfile` is engineered with cross-platform awareness:
- Uses `isUnix()` checks to execute `sh` on Linux and `bat` on Windows automatically.
- Does not depend on hardcoded Unix paths or bash shells.
- Supports both `mvnw.cmd` and global `mvn` fallbacks.
- Captures test results from both `backend/target/surefire-reports` and `e2e-tests/target/surefire-reports`.
