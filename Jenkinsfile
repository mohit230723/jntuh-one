pipeline {
    agent any

    parameters {
        booleanParam(name: 'DEPLOY_K8S', defaultValue: true, description: 'Deploy to local Kubernetes cluster')
        booleanParam(name: 'RUN_E2E', defaultValue: true, description: 'Run Selenium E2E automated test suite')
        string(name: 'TEST_BASE_URL', defaultValue: 'http://localhost:30080', description: 'Target base URL for Selenium tests')
    }

    environment {
        PROJECT_NAME = 'ucest-one'
        BACKEND_IMAGE = "ucest-backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "ucest-frontend:${BUILD_NUMBER}"
        BACKEND_LATEST = 'ucest-backend:latest'
        FRONTEND_LATEST = 'ucest-frontend:latest'
    }

    stages {
        stage('1. Checkout SCM') {
            steps {
                echo "=== Stage 1: Checking out repository ==="
                checkout scm
                script {
                    if (isUnix()) {
                        sh 'git log -1 --oneline'
                    } else {
                        bat 'git log -1 --oneline'
                    }
                }
            }
        }

        stage('2. Build Frontend (React / Vite)') {
            steps {
                echo "=== Stage 2: Compiling React 18 Orderful UI Bundle ==="
                dir('frontend') {
                    script {
                        if (isUnix()) {
                            sh 'npm install'
                            sh 'npm run build'
                        } else {
                            bat 'npm install'
                            bat 'npm run build'
                        }
                    }
                }
            }
        }

        stage('3. Build & Test Backend (Spring Boot 3)') {
            steps {
                echo "=== Stage 3: Compiling Spring Boot 3 Backend & Executing JUnit Tests ==="
                dir('backend') {
                    script {
                        if (isUnix()) {
                            sh 'chmod +x mvnw || true'
                            sh './mvnw clean test package || mvn clean test package'
                        } else {
                            bat 'mvnw.cmd clean test package || mvn clean test package'
                        }
                    }
                }
            }
        }

        stage('4. Docker Container Image Build') {
            steps {
                echo "=== Stage 4: Building Multi-stage Docker Images ==="
                script {
                    if (isUnix()) {
                        sh "docker build -t ${BACKEND_IMAGE} -t ${BACKEND_LATEST} ./backend"
                        sh "docker build -t ${FRONTEND_IMAGE} -t ${FRONTEND_LATEST} ./frontend"
                    } else {
                        bat "docker build -t %BACKEND_IMAGE% -t %BACKEND_LATEST% ./backend"
                        bat "docker build -t %FRONTEND_IMAGE% -t %FRONTEND_LATEST% ./frontend"
                    }
                }
            }
        }

        stage('5. Kubernetes Deployment') {
            when {
                expression { return params.DEPLOY_K8S }
            }
            steps {
                echo "=== Stage 5: Applying Kubernetes Manifests via Kustomize ==="
                script {
                    if (isUnix()) {
                        sh 'kubectl apply -k k8s/'
                        sh 'kubectl rollout status deployment/backend-deployment -n ucest-one --timeout=120s || true'
                        sh 'kubectl rollout status deployment/frontend-deployment -n ucest-one --timeout=120s || true'
                    } else {
                        bat 'kubectl apply -k k8s/'
                        bat 'kubectl rollout status deployment/backend-deployment -n ucest-one --timeout=120s || exit /b 0'
                        bat 'kubectl rollout status deployment/frontend-deployment -n ucest-one --timeout=120s || exit /b 0'
                    }
                }
            }
        }

        stage('6. Selenium E2E Functional Tests') {
            when {
                expression { return params.RUN_E2E }
            }
            steps {
                echo "=== Stage 6: Running Headless Selenium End-to-End Tests against ${params.TEST_BASE_URL} ==="
                script {
                    if (isUnix()) {
                        sh "node e2e-tests/runner.js || cd e2e-tests && mvn test -DbaseUrl=${params.TEST_BASE_URL}"
                    } else {
                        bat "node e2e-tests/runner.js || (cd e2e-tests && mvn test -DbaseUrl=%TEST_BASE_URL%)"
                    }
                }
            }
        }
    }

    post {
        always {
            echo "=== Publishing Test Results & JUnit Reports ==="
            junit testResults: '**/target/surefire-reports/*.xml', allowEmptyResults: true
        }
        success {
            echo "================================================================="
            echo "🎉 Pipeline Succeeded! UCEST One build #${BUILD_NUMBER} verified."
            echo "================================================================="
            archiveArtifacts artifacts: 'backend/target/*.jar, frontend/dist/**', allowEmptyArchive: true
        }
        failure {
            echo "================================================================="
            echo "❌ Pipeline Failed! Please check stage console logs for errors."
            echo "================================================================="
        }
    }
}
