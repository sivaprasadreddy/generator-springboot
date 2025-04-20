# generator-springboot
A [Yeoman](https://yeoman.io) generator for generating SpringBoot microservices.

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

## Development

This project is built with TypeScript, with JavaScript files generated for the actual generator implementation.

If you want to contribute to this project, please see the [MIGRATION.md](MIGRATION.md) file for information about the project's TypeScript implementation.

### Development Workflow

1. Make changes to TypeScript files in the `src/` directory
2. Build the TypeScript code: `npm run build`
3. Test your changes: `npm test`
4. Manually test with Yeoman: `npm link && yo springboot`

## Prerequisites

* Node.js >= 18.x
* npm >= 9.x
* Java JDK >= 17

## Installation

First, install [Yeoman](http://yeoman.io) and generator-springboot using [npm](https://www.npmjs.com/).

```bash
npm install -g yo
npm install -g generator-springboot
```

Then generate your new project:

```bash
yo springboot
```

### Generate a SpringBoot Microservice

```bash
yo springboot
```

Demo:

![SpringBoot Generator Demo](docs/server-generation-1.png)

### Generate REST API with CRUD operations

```bash
yo springboot:controller
```

Demo:

![Controller Generator Demo](docs/crud-generation.png)

## Local Development Setup

```shell
$ git clone https://github.com/sivaprasadreddy/generator-springboot.git
$ cd generator-springboot
$ npm install -g yo
$ npm install 
$ npm link
$ yo springboot
```

## Releasing a new version
Before publishing a new release, make sure to update the version number in `package.json` updated.

```shell
$ npm login
$ npm publish
```

## License
The **generator-springboot** is an Open Source software released under the [MIT Licence](https://opensource.org/license/mit/)
