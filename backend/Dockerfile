FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
RUN apt-get install maven -y
RUN apk add --no-cache freetype fontconfig
RUN apk add --no-cache msttcorefonts-installer fontconfig
RUN update-ms-fonts
WORKDIR /app
COPY . .

RUN mvn clean install -DskipTests

FROM openjdk:21-jdk-slim

EXPOSE 8080

COPY --from=build /app/target/backend.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]
