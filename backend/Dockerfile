FROM ubuntu:latest AS build

RUN apt-get update && \
    apt-get install -y openjdk-21-jdk maven

WORKDIR /app
COPY . .

RUN mvn clean install -DskipTests

FROM openjdk:21-jdk

EXPOSE 8080

COPY --from=build /app/target/backend.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]