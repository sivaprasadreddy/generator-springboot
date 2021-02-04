# <%= appName %>

<%_ if (buildTool === 'maven') { _%>
### Run tests
`$ ./mvnw clean verify`

### Run locally
`$ ./mvnw docker:start spring-boot:run`
<%_ } _%>

<%_ if (buildTool === 'gradle') { _%>
### Run tests
`$ ./gradlew clean build`

### Run locally
`$ ./gradlew bootRun -Plocal`
<%_ } _%>

### Useful Links
* Swagger UI: http://localhost:8080/swagger-ui/index.html
* Actuator Endpoint: http://localhost:8080/actuator
<%_ if (features.includes('elk')) { _%>
* Prometheus: http://localhost:9090/
* Grafana: http://localhost:3000/ (admin/admin)
* Kibana: http://localhost:5601/
<%_ } _%>
