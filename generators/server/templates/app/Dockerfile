FROM eclipse-temurin:17.0.9_9-jre-focal as builder
WORKDIR application
<%_ if (buildTool === 'maven') { _%>
ARG JAR_FILE=target/<%= appName %>-<%= DEFAULT_APP_VERSION %>.jar
<%_ } _%>
<%_ if (buildTool === 'gradle') { _%>
ARG JAR_FILE=build/libs/<%= appName %>-<%= DEFAULT_APP_VERSION %>.jar
<%_ } _%>
COPY ${JAR_FILE} application.jar
RUN java -Djarmode=layertools -jar application.jar extract

# the second stage of our build will copy the extracted layers
FROM eclipse-temurin:17.0.9_9-jre-focal
WORKDIR application
COPY --from=builder application/dependencies/ ./
COPY --from=builder application/spring-boot-loader/ ./
COPY --from=builder application/snapshot-dependencies/ ./
COPY --from=builder application/application/ ./
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
