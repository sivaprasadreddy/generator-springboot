# <%= appName %>

<%_ if (buildTool === 'maven') { _%>
### Run tests
`$ ./mvnw clean verify`

### Run locally
```
$ docker-compose -f docker/docker-compose.yml up -d
$ ./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```
<%_ } _%>

<%_ if (buildTool === 'gradle') { _%>
### Run tests
`$ ./gradlew clean build`

### Run locally
```
$ docker-compose -f docker/docker-compose.yml up -d
$ ./gradlew bootRun -Plocal
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
