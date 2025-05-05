FROM ubuntu:22.04 AS build

# Instalações necessárias para compilação
RUN apt-get update && \
    apt-get install -y openjdk-21-jdk maven && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY pom.xml .
# Cache de dependências Maven
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# Imagem final reduzida
FROM eclipse-temurin:21-jre-jammy

# Instala libs extras que o Jasper pode precisar
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libfreetype6 \
    fonts-dejavu \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app/target/backend.jar .

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend.jar"]