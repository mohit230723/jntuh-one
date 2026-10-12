# syntax=docker/dockerfile:1.7
FROM maven:3.9.9-eclipse-temurin-17-alpine AS dependencies
WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -B dependency:go-offline -DskipTests

FROM dependencies AS build
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -B clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache curl \
    && addgroup -S ucest \
    && adduser -S -G ucest ucest
COPY --from=build --chown=ucest:ucest /app/target/*.jar /app/app.jar
USER ucest
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=5s --start-period=45s --retries=5 \
  CMD curl -fsS http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
