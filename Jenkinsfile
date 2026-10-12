// UCEST One — CI/CD pipeline (Jenkins on Windows, so every step uses `bat`).
// Rule: no `|| true`, `|| exit /b 0` or fallback commands. If a command fails,
// the stage fails and the build goes red.
pipeline {
    agent any

    parameters {
        booleanParam(name: 'DEPLOY_K8S', defaultValue: true, description: 'Deploy to the Docker Desktop Kubernetes cluster')
        booleanParam(name: 'RUN_E2E', defaultValue: true, description: 'Run the Selenium E2E suite against the deployed site')
        string(name: 'TEST_BASE_URL', defaultValue: 'http://localhost:30080', description: 'URL the Selenium tests open')
    }

    environment {
        BACKEND_IMAGE  = "ucest-backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "ucest-frontend:${BUILD_NUMBER}"
        K8S_NAMESPACE  = 'ucest-one'
    }

    options {
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                bat 'git log -1 --oneline'
            }
        }

        stage('Backend: build + JUnit') {
            steps {
                dir('backend') {
                    bat 'mvn -B clean verify'
                }
            }
            post {
                always {
                    junit testResults: 'backend/target/surefire-reports/*.xml', allowEmptyResults: false
                }
            }
        }

        stage('Frontend: build') {
            steps {
                dir('frontend') {
                    bat 'npm ci'
                    bat 'npm run build'
                }
            }
        }

        stage('Docker images') {
            steps {
                bat "docker build -t ${BACKEND_IMAGE} -t ucest-backend:latest ./backend"
                bat "docker build -t ${FRONTEND_IMAGE} -t ucest-frontend:latest ./frontend"
            }
        }

        stage('Deploy to Kubernetes') {
            when { expression { params.DEPLOY_K8S } }
            steps {
                // secret.yaml is not in Git: it is stored in Jenkins as a "Secret file" credential.
                withCredentials([file(credentialsId: 'ucest-k8s-secret', variable: 'K8S_SECRET_FILE')]) {
                    bat 'kubectl apply -f k8s/namespace.yaml'
                    bat 'kubectl apply -f "%K8S_SECRET_FILE%"'
                }
                bat 'kubectl apply -k k8s/'
                // Point the deployments at this build's images, which triggers a rolling update.
                bat "kubectl set image deployment/backend-deployment backend=${BACKEND_IMAGE} -n ${K8S_NAMESPACE}"
                bat "kubectl set image deployment/frontend-deployment frontend=${FRONTEND_IMAGE} -n ${K8S_NAMESPACE}"
                bat "kubectl rollout status deployment/backend-deployment -n ${K8S_NAMESPACE} --timeout=180s"
                bat "kubectl rollout status deployment/frontend-deployment -n ${K8S_NAMESPACE} --timeout=120s"
                bat "kubectl get pods -n ${K8S_NAMESPACE} -o wide"
            }
        }

        stage('Selenium E2E') {
            when { expression { params.RUN_E2E } }
            steps {
                dir('e2e-tests') {
                    bat "mvn -B test -DbaseUrl=${params.TEST_BASE_URL}"
                }
            }
            post {
                always {
                    junit testResults: 'e2e-tests/target/surefire-reports/*.xml', allowEmptyResults: false
                }
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'backend/target/*.jar', fingerprint: true
            echo "Build #${BUILD_NUMBER} passed: tested, packaged and deployed."
        }
        failure {
            echo "Build #${BUILD_NUMBER} FAILED. Open the red stage above to see why."
        }
    }
}
