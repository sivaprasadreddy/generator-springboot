# <%= appName %>

<%_ if (buildTool === 'maven') { _%>
### Run tests
`$ ./mvnw clean verify`

### Run locally
```shell
$ docker-compose -f docker/docker-compose.yml up -d
$ ./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```
### Using Testcontainers at Development Time
```shell
`./mvnw spotless:apply spring-boot:test-run
```
<%_ } _%>

<%_ if (buildTool === 'gradle') { _%>
### Run tests
`$ ./gradlew clean build`

### Run locally
```shell
$ docker-compose -f docker/docker-compose.yml up -d
$ ./gradlew bootRun -Plocal
```
### Using Testcontainers at Development Time
```
`./gradlew spotlessApply springBootTestRun
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
