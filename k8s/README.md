# Kubernetes Deployment Guide — UCEST One

> Production Kubernetes orchestration manifests for UCEST One on Docker Desktop Kubernetes or local development clusters.

---

## 1. Architecture Overview

```
                         Internet / Browser
                                 │
                  ┌──────────────┴──────────────┐
                  │                             │
         NodePort 30080                NodePort 30081
                  │                             │
                  ▼                             ▼
       [frontend-service]               [backend-service]
          (ClusterIP)                      (ClusterIP)
                  │                             │
       ┌──────────┴──────────┐       ┌──────────┴──────────┐
       ▼                     ▼       ▼                     ▼
[frontend-pod-1]      [frontend-pod-2] [backend-pod-1] [backend-pod-2]
  (Nginx SPA)           (Nginx SPA)   (Spring Boot 3) (Spring Boot 3)
       │                     │                 │
       └─────────────────────┴─────────────────┼──────────────────┐
                                               ▼                  ▼
                                       [mysql-service] (Port 3306)
                                               │
                                               ▼
                                         [mysql-pod]
                                      (MySQL 8.0 Engine)
                                               │
                                               ▼
                                      [mysql-pvc] (5Gi PV)
```

### Deployed Resources:
- **Namespace:** `ucest-one`
- **ConfigMap:** `ucest-config` (Service URLs, connection params)
- **Secrets:** `ucest-one-secret` (BCrypt credentials, JWT token secret)
- **Storage:** `mysql-pv` (5Gi PersistentVolume) and `mysql-pvc` (PersistentVolumeClaim)
- **Database:** `mysql-deployment` (1 replica) with automated schema & seed mounting
- **Backend:** `backend-deployment` (**2 replicas** with liveness/readiness probes)
- **Frontend:** `frontend-deployment` (**2 replicas** with HTTP probes)
- **Services:**
  - `frontend-service`: NodePort `30080` (access at `http://localhost:30080`)
  - `backend-service`: NodePort `30081` (access at `http://localhost:30081`)
  - `mysql-service`: ClusterIP `3306`

---

## 2. Prerequisites

1. Docker Desktop installed with **Kubernetes enabled** (Settings → Kubernetes → Enable Kubernetes).
2. `kubectl` CLI configured:
   ```bash
   kubectl cluster-info
   ```

---

## 3. Build Container Images

Before deploying to local Kubernetes, build the application images so they are available in your local Docker registry:

```bash
# Build Backend image
docker build -t ucest-backend:latest ./backend

# Build Frontend image
docker build -t ucest-frontend:latest ./frontend
```

---

## 4. Deploy Manifests

Apply the complete declarative stack via Kustomize:

```bash
# Apply entire Kustomize bundle
kubectl apply -k k8s/
```

Alternatively, apply individual files:
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/mysql-pv.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/services.yaml
```

---

## 5. Verification & Health Monitoring

Check deployment status and rollout progression:

```bash
# Monitor all pods in ucest-one namespace
kubectl get pods -n ucest-one -w

# Check exposed services and NodePorts
kubectl get services -n ucest-one

# Verify backend replica set (should report 2 desired, 2 current, 2 ready)
kubectl get deployment backend-deployment -n ucest-one
```

Once pods report `Running` and `2/2` or `1/1` ready:

- **Frontend Application:** Open browser at [http://localhost:30080](http://localhost:30080)
- **Backend Actuator Health:** Open [http://localhost:30081/actuator/health](http://localhost:30081/actuator/health)
- **Public Notices API:** Open [http://localhost:30081/api/public/notices](http://localhost:30081/api/public/notices)

---

## 6. Self-Healing Demonstration

Kubernetes maintains desired state through ReplicaSets. You can prove self-healing empirically:

1. List the 2 running backend pods:
   ```bash
   kubectl get pods -n ucest-one -l app=backend
   ```
2. Delete one of the pods:
   ```bash
   kubectl delete pod <pod-name-from-previous-step> -n ucest-one
   ```
3. Watch the ReplicaSet immediately detect the deficit and terminate the old pod while launching a new pod:
   ```bash
   kubectl get pods -n ucest-one -l app=backend -w
   ```
   *Notice the new pod transitions from `ContainerCreating` -> `Running` within seconds, maintaining high availability.*

---

## 7. Teardown / Cleanup

To delete all Kubernetes resources created for UCEST One:

```bash
kubectl delete -k k8s/
# Or delete the namespace to purge all namespaced resources
kubectl delete namespace ucest-one
```
