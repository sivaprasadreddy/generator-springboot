# Change Log

## Version 0.1.5
* Upgrade Spring Boot version to 3.1.5
* Upgraded Maven and Gradle versions
* Implemented best practices to not expose entity
* Upgraded generator dependencies (chai, sinon, etc)
* Supports running application with Java 21 and Spring Boot 3.2.0

## Version 0.1.4
* Upgrade Spring Boot version to 3.1.3
* Upgraded Maven and Gradle versions
* Refine Testcontainers configuration
* Simplify LocalStack configuration
* Removed H2 database config

## Version 0.1.3
* Upgrade Spring Boot version to 3.1.1
* Introduced Testcontainers support for dev mode
* Fixed LocalStack configuration issues
* Upgraded generator dependencies (chai, sinon, etc)
* Upgraded Maven and Gradle versions
* Updated googleJavaFormat configuration.

## Version 0.1.2
* Fixes issue with mysql and mariadb when flyway is selected ([#58](https://github.com/sivaprasadreddy/generator-springboot/issues/58))
* Support Mariadb Sequences ([#59](https://github.com/sivaprasadreddy/generator-springboot/issues/59))
* Support other liquibase formats ([#69](https://github.com/sivaprasadreddy/generator-springboot/issues/69))
* Upgraded SpringBoot to 3.0.2 and other library versions

## Version 0.1.1
* Upgraded SpringBoot to 3.0.0 and other library versions
* Upgraded AWS to 3.0.0-M3, compatible version with SpringBoot 3 which uses AWS 2.0 API
* Tweaked code to get All entries from datasource using pagination
* Supporting developing application in VSCode
* Enhanced support for logback encoder when elk stack is selected
* Fixes issue while generating api and tables when `tablename` contains camelCase([#47](https://github.com/sivaprasadreddy/generator-springboot/issues/47))
* Upgraded liquibase configuration to use Out of the Box format and location

## Version 0.1.0
* Upgraded SpringBoot to 2.7.4 and other library versions
* Fixed code formatting
* Fixed Flyway with MySQL and MariaDB issue

## Version 0.0.10
* Upgraded SpringBoot to 2.6.7 and library versions
* Updated Spring Cloud AWS setup to use new https://awspring.io/ based configuration
* Removed `springfox-boot-starter` and used `springdoc-openapi-ui`
* Added google-java-format support
* Upgraded plugins versions
* Removed Checkstyle, PMD plugins

## Version 0.0.8
* Configured Checkstyle, PMD, SonarQube, google-java-format plugins
* Added Localstack autoconfiguration support

## Version 0.0.7
* Removed support for generation of `config-server` and `service-registry`
* Updated SpringBoot and other libraries version

## Version 0.0.6
* Updated to use testcontainers-spring-boot https://github.com/testcontainers/testcontainers-spring-boot
* Generate Zipkin docker-compose file when Distributed Tracing is selected
* Fixed Flyway/Liquibase db migration script generation issue
* Added tests for sanity check

## Version 0.0.5
* Added support for generating docker-compose yml files for application, ELK, Prometheus, Grafana
