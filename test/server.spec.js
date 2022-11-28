const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('SpringBoot Generator', () => {

    // Maven based generation
    describe('Generate minimal microservice using Maven', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/server'))
                .withPrompts({
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "buildTool": "maven",
                    "features": []
                })
                .on('end', done);
        });

        it('creates expected default files for minimal microservice with maven', () => {
            assert.file('myservice/pom.xml');
        });
    });

    describe('Generate basic microservice using Maven with Flyway', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/server'))
                .withPrompts({
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "databaseType": "postgresql",
                    "dbMigrationTool": "flywaydb",
                    "buildTool": "maven",
                    "features": []
                })
                .on('end', done);
        });

        it('creates expected default files for basic microservice with maven', () => {
            assert.file('myservice/pom.xml');
        });
    });

    describe('Generate basic microservice using Maven with Liquibase', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/server'))
                .withPrompts({
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "databaseType": "postgresql",
                    "dbMigrationTool": "liquibase",
                    "buildTool": "maven",
                    "features": []
                })
                .on('end', done);
        });

        it('creates expected default files for basic microservice with maven', () => {
            assert.file('myservice/pom.xml');
        });
    });

    describe('Generate complete microservice using Maven', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/server'))
                .withPrompts({
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "databaseType": "postgresql",
                    "dbMigrationTool": "flywaydb",
                    "buildTool": "maven",
                    "features": ["elk", "monitoring"]
                })
                .on('end', done);
        });

        it('creates expected default files for complete microservice with maven', () => {
            assert.file('myservice/pom.xml');
            assert.file('myservice/docker/docker-compose.yml');
            assert.file('myservice/docker/docker-compose-elk.yml');
            assert.file('myservice/docker/docker-compose-monitoring.yml');
        });
    });

    // Gradle based generation
    describe('Generate minimal microservice using Gradle', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/server'))
                .withPrompts({
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "buildTool": "gradle",
                    "features": []
                })
                .on('end', done);
        });

        it('creates expected default files for minimal microservice with Gradle', () => {
            assert.file('myservice/build.gradle');
        });
    });

    describe('Generate basic microservice using Gradle with Flyway', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/server'))
                .withPrompts({
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "databaseType": "postgresql",
                    "dbMigrationTool": "flywaydb",
                    "buildTool": "gradle",
                    "features": []
                })
                .on('end', done);
        });

        it('creates expected default files for basic microservice with Gradle', () => {
            assert.file('myservice/build.gradle');
        });
    });

    describe('Generate basic microservice using Gradle with Liquibase', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/server'))
                .withPrompts({
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "databaseType": "postgresql",
                    "dbMigrationTool": "liquibase",
                    "buildTool": "gradle",
                    "features": []
                })
                .on('end', done);
        });

        it('creates expected default files for basic microservice with maven', () => {
            assert.file('myservice/build.gradle');
        });
    });

    describe('Generate complete microservice using Gradle', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/server'))
                .withPrompts({
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "databaseType": "postgresql",
                    "dbMigrationTool": "flywaydb",
                    "buildTool": "gradle",
                    "features": ["elk", "monitoring"]
                })
                .on('end', done);
        });

        it('creates expected default files for complete microservice with Gradle', () => {
            assert.file('myservice/build.gradle');
            assert.file('myservice/docker/docker-compose.yml');
            assert.file('myservice/docker/docker-compose-elk.yml');
            assert.file('myservice/docker/docker-compose-monitoring.yml');
        });
    });
});