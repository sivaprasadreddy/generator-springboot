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
                    "features": []
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
                    "features": []
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
                    "features": []
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
                    "features": ["distTracing", "eurekaClient", "configClient"]
                })
                .on('end', done);
        });

        it('creates expected default files for complete microservice with maven', () => {
            assert.file('pom.xml');
            assert.file('docker/docker-compose.yml');
            assert.file('docker/docker-compose-elk.yml');
            assert.file('docker/docker-compose-monitoring.yml');
            assert.file('docker/docker-compose-tracing.yml');
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
                    "features": []
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
                    "features": []
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
                    "features": []
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
                    "features": ["distTracing", "eurekaClient", "configClient"]
                })
                .on('end', done);
        });

        it('creates expected default files for complete microservice with Gradle', () => {
            assert.file('build.gradle');
            assert.file('docker/docker-compose.yml');
            assert.file('docker/docker-compose-elk.yml');
            assert.file('docker/docker-compose-monitoring.yml');
            assert.file('docker/docker-compose-tracing.yml');
        });
    });
});