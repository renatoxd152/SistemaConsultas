FROM ubuntu:latest AS build

# Atualiza o sistema e instala dependências
RUN apt-get update && apt-get install -y \
    openjdk-21-jdk \
    maven \
    fontconfig \
    fonts-dejavu \
    ttf-mscorefonts-installer \
    --no-install-recommends && \
    fc-cache -f -v

WORKDIR /app
COPY . .

RUN mvn clean install -DskipTests

FROM openjdk:21-jdk-slim

EXPOSE 8080

COPY --from=build /app/target/backend.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]
