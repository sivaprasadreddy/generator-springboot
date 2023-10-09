# Generator SpringBoot
The Yeoman generator for generating Spring Boot microservices.

## Prerequisites
* Node 16+
* JDK 17+

## Installation
```shell
$ npm install -g yo
$ npm install -g generator-springboot
```

## How to use?
Run the following command and answer the questions:

```shell
$ yo springboot
```

## Features
The generator-springboot generates a Spring Boot application with the following features configured:

* Spring Boot project with Maven and Gradle support
* Spring Data JPA integration with an option to select databases like MySQL, Postgresql, MariaDB.
* Flyway and Liquibase database migration support.
* Spring Cloud AWS support with LocalStack configuration.
* CORS configuration
* Swagger UI Integration
* SpringBoot Actuator configuration
* Testcontainers based Testing and Local dev mode setup
* DockerCompose configuration for application, ELK, Prometheus, Grafana
* GitHub Actions Configuration
* Dockerfile
* Jenkinsfile
* SonarQube and JaCoCo based static analysis tools configuration
* Code formatting using Spotless and google-java-format
* JUnit 5

### Generate a SpringBoot Microservice
After installing the `generator-springboot`, you can generate a new Spring Boot application as follows:

```shell
$ yo springboot
Generating SpringBoot Application
? What is the application name? blog
? What is the default package name? com.sivalabs.blog
? Which type of database you want to use? Postgresql
? Which type of database migration tool you want to use? FlywayDB
? Select the features you want? ELK Docker configuration, Prometheus, Grafana Docker configuration, Localstack Docker configuration
? Which build tool do you want to use? Maven
    force blog/.yo-rc.json
   create blog/mvnw
   create blog/mvnw.cmd
   create blog/.gitignore
   create blog/.mvn/wrapper/maven-wrapper.jar
   create blog/.mvn/wrapper/maven-wrapper.properties
   create blog/pom.xml
   create blog/Dockerfile
   create blog/Jenkinsfile
   create blog/lombok.config
   create blog/sonar-project.properties
   create blog/README.md
   create blog/.github/workflows/maven.yml
   create blog/src/main/resources/db/migration/postgresql/V1__01_init.sql
   create blog/docker/docker-compose.yml
   create blog/docker/docker-compose-app.yml
   create blog/docker/docker-compose-monitoring.yml
   create blog/config/prometheus/prometheus.yml
   create blog/config/grafana/provisioning/dashboards/basic-dashboard.json
   create blog/config/grafana/provisioning/dashboards/dashboard.yml
   create blog/config/grafana/provisioning/dashboards/jvm-micrometer_rev10.json
   create blog/config/grafana/provisioning/datasources/datasource.yml
   create blog/docker/docker-compose-elk.yml
   create blog/config/elk/logstash.conf
   create blog/.localstack/01_init.sh
   create blog/src/main/java/com/sivalabs/blog/Application.java
   create blog/src/main/java/com/sivalabs/blog/config/WebMvcConfig.java
   create blog/src/main/java/com/sivalabs/blog/config/SwaggerConfig.java
   create blog/src/main/java/com/sivalabs/blog/config/ApplicationProperties.java
   create blog/src/main/java/com/sivalabs/blog/config/Initializer.java
   create blog/src/main/java/com/sivalabs/blog/config/GlobalExceptionHandler.java
   create blog/src/main/java/com/sivalabs/blog/config/logging/Loggable.java
   create blog/src/main/java/com/sivalabs/blog/config/logging/LoggingAspect.java
   create blog/src/main/java/com/sivalabs/blog/utils/AppConstants.java
   create blog/src/main/resources/application.properties
   create blog/src/main/resources/application-local.properties
   create blog/src/main/resources/logback-spring.xml
   create blog/src/test/java/com/sivalabs/blog/ApplicationIntegrationTest.java
   create blog/src/test/java/com/sivalabs/blog/SchemaValidationTest.java
   create blog/src/test/java/com/sivalabs/blog/common/ContainersConfig.java
   create blog/src/test/java/com/sivalabs/blog/common/AbstractIntegrationTest.java
   create blog/src/test/java/com/sivalabs/blog/TestApplication.java
   create blog/src/test/java/com/sivalabs/blog/SqsListenerIntegrationTest.java
   create blog/src/test/resources/application-test.properties
   create blog/src/test/resources/logback-test.xml

No change to package.json was detected. No package manager install will be executed.
[INFO] Scanning for projects...
[INFO]
[INFO] -----------------------< com.sivalabs.blog:blog >-----------------------
[INFO] Building blog 0.0.1-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- spotless:2.39.0:apply (default-cli) @ blog ---
[INFO] Index file does not exist. Fallback to an empty index
[INFO] Writing clean file: /Users/siva/blog/src/test/java/com/sivalabs/blog/TestApplication.java
[INFO] Writing clean file: /Users/siva/blog/src/test/java/com/sivalabs/blog/SqsListenerIntegrationTest.java
[INFO] Writing clean file: /Users/siva/blog/src/test/java/com/sivalabs/blog/SchemaValidationTest.java
[INFO] Writing clean file: /Users/siva/blog/src/test/java/com/sivalabs/blog/common/AbstractIntegrationTest.java
[INFO] Writing clean file: /Users/siva/blog/src/test/java/com/sivalabs/blog/common/ContainersConfig.java
[INFO] Writing clean file: /Users/siva/blog/src/main/java/com/sivalabs/blog/config/GlobalExceptionHandler.java
[INFO] Writing clean file: /Users/siva/blog/src/main/java/com/sivalabs/blog/config/SwaggerConfig.java
[INFO] Writing clean file: /Users/siva/blog/src/main/java/com/sivalabs/blog/config/logging/LoggingAspect.java
[INFO] Spotless.Java is keeping 15 files clean - 8 were changed to be clean, 7 were already clean, 0 were skipped because caching determined they were already clean
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.192 s
[INFO] Finished at: 2023-08-30T11:30:00+05:30
[INFO] ------------------------------------------------------------------------
==========================================
Your application is generated successfully
  cd blog
  > ./mvnw spring-boot:run
==========================================
```

### Generate REST API with CRUD operations
You can generate REST API with CRUD operation using the following command:

**IMPORTANT:** You should run the following command from within the generated project folder.

```shell
$ cd blog
$ yo springboot:controller Customer --base-path /api/customers
```

This sub-generator will generate the following:

* JPA entity
* Spring Data JPA Repository
* Service
* Spring MVC REST Controller with CRUD operations
* Unit and Integration Tests for REST Controller
* Flyway or Liquibase migration to create table

```shell
$ yo springboot:controller Customer --base-path /api/customers
Generating JPA entity, repository, service and controller
EntityName: Customer, basePath: /api/customers
    force .yo-rc.json
   create src/main/java/com/sivalabs/blog/entities/Customer.java
   create src/main/java/com/sivalabs/blog/model/response/PagedResult.java
   create src/main/java/com/sivalabs/blog/repositories/CustomerRepository.java
   create src/main/java/com/sivalabs/blog/services/CustomerService.java
   create src/main/java/com/sivalabs/blog/web/controllers/CustomerController.java
   create src/test/java/com/sivalabs/blog/web/controllers/CustomerControllerTest.java
   create src/test/java/com/sivalabs/blog/web/controllers/CustomerControllerIT.java
   create src/test/java/com/sivalabs/blog/services/CustomerServiceTest.java
   create src/main/resources/db/migration/postgresql/V2__create_customers_table.sql

No change to package.json was detected. No package manager install will be executed.
[INFO] Scanning for projects...
[INFO]
[INFO] -----------------------< com.sivalabs.blog:blog >-----------------------
[INFO] Building blog 0.0.1-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- spotless:2.39.0:apply (default-cli) @ blog ---
[INFO] Writing clean file: /Users/siva/blog/src/test/java/com/sivalabs/blog/web/controllers/CustomerControllerTest.java
[INFO] Writing clean file: /Users/siva/blog/src/test/java/com/sivalabs/blog/web/controllers/CustomerControllerIT.java
[INFO] Writing clean file: /Users/siva/blog/src/test/java/com/sivalabs/blog/services/CustomerServiceTest.java
[INFO] Writing clean file: /Users/siva/blog/src/main/java/com/sivalabs/blog/web/controllers/CustomerController.java
[INFO] Writing clean file: /Users/siva/blog/src/main/java/com/sivalabs/blog/model/response/PagedResult.java
[INFO] Writing clean file: /Users/siva/blog/src/main/java/com/sivalabs/blog/services/CustomerService.java
[INFO] Writing clean file: /Users/siva/blog/src/main/java/com/sivalabs/blog/entities/Customer.java
[INFO] Spotless.Java is keeping 23 files clean - 7 were changed to be clean, 1 were already clean, 15 were skipped because caching determined they were already clean
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.190 s
[INFO] Finished at: 2023-08-30T11:32:50+05:30
[INFO] ------------------------------------------------------------------------
```
