# Multi-stage Dockerfile for Spring Boot 3 Backend
# Stage 1: Build artifact with Maven & OpenJDK 17
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Cache dependencies layer
COPY pom.xml .
RUN mvn dependency:go-offline -B || true

# Build application artifact
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal production JRE runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Install curl for health check probing
RUN apk add --no-cache curl

# Run as non-privileged service user
RUN addgroup -S ucest && adduser -S ucest -G ucest
USER ucest:ucest

COPY --from=build --chown=ucest:ucest /app/target/*.jar app.jar

EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
