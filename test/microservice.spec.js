const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('SpringBoot Generator', () => {

    // Maven based generation
    describe('Generate minimal microservice using Maven', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/microservice'))
                .withPrompts({
                    "appType": "microservice",
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "sql": false,
                    "buildTool": "maven",
                    "distTracing": false,
                    "eurekaClient": false,
                    "configClient": false
                })
                .on('end', done);
        });

        it('creates expected default files for minimal microservice with maven', () => {
            assert.file('pom.xml');
        });
    });

    describe('Generate basic microservice using Maven with Flyway', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/microservice'))
                .withPrompts({
                    "appType": "microservice",
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "sql": true,
                    "databaseType": "postgresql",
                    "dbMigrationTool": "flywaydb",
                    "buildTool": "maven",
                    "distTracing": false,
                    "eurekaClient": false,
                    "configClient": false
                })
                .on('end', done);
        });

        it('creates expected default files for basic microservice with maven', () => {
            assert.file('pom.xml');
        });
    });

    describe('Generate basic microservice using Maven with Liquibase', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/microservice'))
                .withPrompts({
                    "appType": "microservice",
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "sql": true,
                    "databaseType": "postgresql",
                    "dbMigrationTool": "liquibase",
                    "buildTool": "maven",
                    "distTracing": false,
                    "eurekaClient": false,
                    "configClient": false
                })
                .on('end', done);
        });

        it('creates expected default files for basic microservice with maven', () => {
            assert.file('pom.xml');
        });
    });

    describe('Generate complete microservice using Maven', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/microservice'))
                .withPrompts({
                    "appType": "microservice",
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "sql": true,
                    "databaseType": "postgresql",
                    "dbMigrationTool": "flywaydb",
                    "buildTool": "maven",
                    "distTracing": true,
                    "eurekaClient": true,
                    "configClient": true
                })
                .on('end', done);
        });

        it('creates expected default files for complete microservice with maven', () => {
            assert.file('pom.xml');
        });
    });

    // Gradle based generation
    describe('Generate minimal microservice using Gradle', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/microservice'))
                .withPrompts({
                    "appType": "microservice",
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "sql": false,
                    "buildTool": "gradle",
                    "distTracing": false,
                    "eurekaClient": false,
                    "configClient": false
                })
                .on('end', done);
        });

        it('creates expected default files for minimal microservice with Gradle', () => {
            assert.file('build.gradle');
        });
    });

    describe('Generate basic microservice using Gradle with Flyway', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/microservice'))
                .withPrompts({
                    "appType": "microservice",
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "sql": true,
                    "databaseType": "postgresql",
                    "dbMigrationTool": "flywaydb",
                    "buildTool": "gradle",
                    "distTracing": false,
                    "eurekaClient": false,
                    "configClient": false
                })
                .on('end', done);
        });

        it('creates expected default files for basic microservice with Gradle', () => {
            assert.file('build.gradle');
        });
    });

    describe('Generate basic microservice using Gradle with Liquibase', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/microservice'))
                .withPrompts({
                    "appType": "microservice",
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "sql": true,
                    "databaseType": "postgresql",
                    "dbMigrationTool": "liquibase",
                    "buildTool": "gradle",
                    "distTracing": false,
                    "eurekaClient": false,
                    "configClient": false
                })
                .on('end', done);
        });

        it('creates expected default files for basic microservice with maven', () => {
            assert.file('build.gradle');
        });
    });

    describe('Generate complete microservice using Gradle', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/microservice'))
                .withPrompts({
                    "appType": "microservice",
                    "appName": "myservice",
                    "packageName": "com.mycompany.myservice",
                    "packageFolder": "com/mycompany/myservice",
                    "sql": true,
                    "databaseType": "postgresql",
                    "dbMigrationTool": "flywaydb",
                    "buildTool": "gradle",
                    "distTracing": true,
                    "eurekaClient": true,
                    "configClient": true
                })
                .on('end', done);
        });

        it('creates expected default files for complete microservice with Gradle', () => {
            assert.file('build.gradle');
        });
    });
});