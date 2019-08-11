# generator-springboot
A Yeoman generator for generating Microservice with SpringBoot

## Why another generator when you have JHipster?
JHipster is an amazing SpringBoot application generator with lots and lots of cool features.
However, there are certain JHipster features that does not fit for my preferences such as:

1. I like *jar* packaging
2. I like to use spring-boot-starter-* than configuring individual libraries
3. I like to have an option to generate application without spring-security
4. I prefer Flyway over Liquibase
5. I like to have only minimum and required configuration ie no AsyncConfiguration, LocaleConfiguration, CacheConfiguration, Logstash Logging etc.
6. I like .properties over .yml

## How to use?

```
> npm install -g yo
> npm install -g generator-springboot
> yo springboot
```

## Local Development Setup

```
> git clone https://github.com/sivaprasadreddy/generator-springboot.git
> cd generator-springboot
> npm install 
> npm link
> yo springboot
```

## Features

1. Microservice

    * SpringBoot REST API with jar type packaging
    * CORS configuration
    * Swagger UI Integration
    * Spring Data JPA integration with option to select databases like MySQL, Postgresql, MariaDB etc
    * Flyway or Liquibase data migration support
    * SpringBoot Actuator configuration
    * Integration with Config Server, Service Registry, Sleuth, Zipkin
    * TestContainers integration
    * JUnit 5 
    * Docker configuration
    * Jenkinsfile

2. Spring Cloud Config Server

    * Config Server with Git and native backend configuration

3. Service Registry

    * Service Registry based on Netflix Eureka
