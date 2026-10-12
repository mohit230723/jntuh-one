# Jenkins CI/CD Setup — UCEST One

Jenkins runs on the team lead's Windows laptop (http://localhost:8080). The pipeline is defined in
[`Jenkinsfile`](../Jenkinsfile) and uses `bat` steps only.

## 1. What the pipeline does

```
Checkout → Backend: mvn clean verify (+ JUnit report) → Frontend: npm ci + build
        → Docker images (tag = build number) → Deploy to Kubernetes → Selenium E2E (+ JUnit report)
```

Every step fails the build if its command fails. There are no `|| true` / `|| exit /b 0` fallbacks,
so a red build always means something is really broken.

| Stage | Command | Fails when |
|---|---|---|
| Backend | `mvn -B clean verify` | compile error or any JUnit test fails |
| Frontend | `npm ci`, `npm run build` | missing dependency or build error |
| Docker images | `docker build -t ucest-backend:<build> ...` | Dockerfile error |
| Deploy to Kubernetes | `kubectl apply`, `kubectl set image`, `kubectl rollout status` | pods do not become ready in time |
| Selenium E2E | `mvn -B test -DbaseUrl=http://localhost:30080` | any browser test fails |

JUnit reports from `backend/target/surefire-reports` and `e2e-tests/target/surefire-reports` appear
on each build's **Tests** page.

## 2. One-time setup on the Jenkins laptop

### 2.1 Tools on PATH
`git`, `java` (17+), `mvn`, `node`/`npm`, `docker`, `kubectl` and Google Chrome must be installed.
After installing a tool, **restart the Jenkins service** so it sees the new PATH:

```powershell
Restart-Service Jenkins
```

### 2.2 Run Jenkins as your Windows user
By default the Jenkins service runs as `LocalSystem`, which cannot use your Docker Desktop
session or your Kubernetes config (`%USERPROFILE%\.kube\config`).

1. Press Win+R, run `services.msc`, open **Jenkins** → **Log On** tab.
2. Select **This account**, enter your Windows account and password, click **OK**.
3. Restart the Jenkins service.

### 2.3 Plugins
Manage Jenkins → Plugins: **Pipeline**, **Git**, **GitHub Branch Source**, **JUnit**,
**Credentials Binding** (all included in "suggested plugins").

### 2.4 Kubernetes secret as a Jenkins credential
`k8s/secret.yaml` is never committed. Create it locally from `k8s/secret.example.yaml`, then:

Manage Jenkins → Credentials → (global) → **Add Credentials**
- Kind: **Secret file**
- File: your `k8s/secret.yaml`
- ID: **`ucest-k8s-secret`** (the Jenkinsfile uses this exact ID)

## 3. Create the job (Multibranch Pipeline)

1. **New Item** → name `ucest-one` → **Multibranch Pipeline** → OK.
2. **Branch Sources** → Add source → **GitHub**
   - Repository HTTPS URL: `https://github.com/mohit230723/jntuh-one`
   - Credentials: a GitHub personal access token (needed to avoid API rate limits)
3. **Build Configuration**: by Jenkinsfile, script path `Jenkinsfile`.
4. **Scan Multibranch Pipeline Triggers**: periodically, every **2 minutes**
   (GitHub webhooks cannot reach a laptop, so Jenkins polls).
5. Save. Jenkins finds `main`, `develop`, every feature branch and every pull request, and builds each one.

Feature branches can be built with `DEPLOY_K8S` and `RUN_E2E` unticked (Build with Parameters)
so they only build and unit-test; `main` deploys.

## 4. Demo: the pipeline really fails

1. On a branch, break a test (e.g. change an expected value in `PublicNoticeControllerTest`) and push.
2. Jenkins builds the branch → **Backend** stage is red, Tests page shows the failing test.
3. Revert, push → green.

## 5. Troubleshooting

| Symptom | Fix |
|---|---|
| `'mvn' is not recognized` | Install Maven, then `Restart-Service Jenkins` |
| `error: current-context is not set` / kubectl talks to `localhost:8080` | Jenkins runs as LocalSystem — see 2.2 |
| `Could not find credentials entry with ID 'ucest-k8s-secret'` | Add the Secret file credential — see 2.4 |
| `rollout status` times out | `kubectl get pods -n ucest-one`, then `kubectl describe pod <name> -n ucest-one` |
| Selenium: `SessionNotCreatedException` | Install / update Google Chrome on the Jenkins laptop |
