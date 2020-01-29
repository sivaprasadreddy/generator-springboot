FROM fabric8/java-alpine-openjdk8-jre
VOLUME /tmp
<%_ if (buildTool === 'maven') { _%>
ADD target/<%= appName %>-<%= DEFAULT_APP_VERSION %>.jar app.jar
<%_ } _%>
<%_ if (buildTool === 'gradle') { _%>
ADD build/libs/<%= appName %>-<%= DEFAULT_APP_VERSION %>.jar app.jar
<%_ } _%>
RUN sh -c 'touch /app.jar'
ENV JAVA_OPTS="-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8787,suspend=n"
ENV SPRING_PROFILES_ACTIVE "docker"
EXPOSE 8080 8787
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=$SPRING_PROFILES_ACTIVE -jar /app.jar" ]
