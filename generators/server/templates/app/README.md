# <%= appName %>

<%_ if (buildTool === 'maven') { _%>
### Format code

```shell
$ ./mvnw spotless:apply
```

### Run tests

```shell
$ ./mvnw clean verify
```

### Run locally

```shell
$ docker-compose -f docker/docker-compose.yml up -d
$ ./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

### Using Testcontainers at Development Time
You can run `TestApplication.java` from your IDE directly.
You can also run the application using Maven as follows:

```shell
./mvnw spring-boot:test-run
```
<%_ } _%>

<%_ if (buildTool === 'gradle') { _%>
### Format code

```shell
$ ./gradlew spotlessApply
```

### Run tests

```shell
$ ./gradlew clean build
```

### Run locally

```shell
$ docker-compose -f docker/docker-compose.yml up -d
$ ./gradlew bootRun -Plocal
```

### Using Testcontainers at Development Time
You can run `TestApplication.java` from your IDE directly.
You can also run the application using Gradle as follows:

```shell
$ ./gradlew bootTestRun
```
<%_ } _%>

### Useful Links
* Swagger UI: http://localhost:8080/swagger-ui.html
* Actuator Endpoint: http://localhost:8080/actuator
<%_ if (features.includes('elk')) { _%>
* Prometheus: http://localhost:9090/
* Grafana: http://localhost:3000/ (admin/admin)
* Kibana: http://localhost:5601/
<%_ } _%>
