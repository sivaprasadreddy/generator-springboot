const path = require('path');
const assert = require('yeoman-assert');
const { createHelpers } = require('yeoman-test');

describe('SpringBoot Generator', () => {
    // Helper function to test server generator with different configurations
    const testServerGenerator = async (testName, prompts, expectedFiles, additionalChecks) => {
        it(testName, async () => {
            const helpers = createHelpers();
            await helpers
                .create(path.join(__dirname, '../generators/server'))
                .withPrompts(prompts)
                .run();

            // Check expected files exist
            expectedFiles.forEach(file => assert.file(file));

            // Run additional checks if provided
            if (additionalChecks) {
                additionalChecks();
            }
        });
    };

    // Maven based generation
    describe('Generate minimal microservice using Maven', () => {
        testServerGenerator(
            'creates expected default files for minimal microservice with maven',
            {
                "appName": "myservice",
                "packageName": "com.mycompany.myservice",
                "packageFolder": "com/mycompany/myservice",
                "buildTool": "maven",
                "features": []
            },
            ['myservice/pom.xml']
        );
    });

    describe('Generate basic microservice using Maven with Flyway', () => {
        testServerGenerator(
            'creates expected default files for basic microservice with maven',
            {
                "appName": "myservice",
                "packageName": "com.mycompany.myservice",
                "packageFolder": "com/mycompany/myservice",
                "databaseType": "postgresql",
                "dbMigrationTool": "flywaydb",
                "buildTool": "maven",
                "features": []
            },
            ['myservice/pom.xml']
        );
    });

    describe('Generate basic microservice using Maven with Liquibase', () => {
        testServerGenerator(
            'creates expected default files for basic microservice with maven',
            {
                "appName": "myservice",
                "packageName": "com.mycompany.myservice",
                "packageFolder": "com/mycompany/myservice",
                "databaseType": "postgresql",
                "dbMigrationTool": "liquibase",
                "buildTool": "maven",
                "features": []
            },
            ['myservice/pom.xml']
        );
    });

    describe('Generate complete microservice using Maven', () => {
        testServerGenerator(
            'creates expected default files for complete microservice with maven',
            {
                "appName": "myservice",
                "packageName": "com.mycompany.myservice",
                "packageFolder": "com/mycompany/myservice",
                "databaseType": "postgresql",
                "dbMigrationTool": "flywaydb",
                "buildTool": "maven",
                "features": ["elk", "monitoring"]
            },
            [
                'myservice/pom.xml',
                'myservice/docker/docker-compose.yml',
                'myservice/docker/docker-compose-elk.yml',
                'myservice/docker/docker-compose-monitoring.yml'
            ]
        );
    });

    // Gradle based generation
    describe('Generate minimal microservice using Gradle', () => {
        testServerGenerator(
            'creates expected default files for minimal microservice with Gradle',
            {
                "appName": "myservice",
                "packageName": "com.mycompany.myservice",
                "packageFolder": "com/mycompany/myservice",
                "buildTool": "gradle",
                "features": []
            },
            ['myservice/build.gradle']
        );
    });

    describe('Generate basic microservice using Gradle with Flyway', () => {
        testServerGenerator(
            'creates expected default files for basic microservice with Gradle',
            {
                "appName": "myservice",
                "packageName": "com.mycompany.myservice",
                "packageFolder": "com/mycompany/myservice",
                "databaseType": "postgresql",
                "dbMigrationTool": "flywaydb",
                "buildTool": "gradle",
                "features": []
            },
            ['myservice/build.gradle']
        );
    });

    describe('Generate basic microservice using Gradle with Liquibase', () => {
        testServerGenerator(
            'creates expected default files for basic microservice with maven',
            {
                "appName": "myservice",
                "packageName": "com.mycompany.myservice",
                "packageFolder": "com/mycompany/myservice",
                "databaseType": "postgresql",
                "dbMigrationTool": "liquibase",
                "buildTool": "gradle",
                "features": []
            },
            ['myservice/build.gradle']
        );
    });

    describe('Generate complete microservice using Gradle', () => {
        testServerGenerator(
            'creates expected default files for complete microservice with Gradle',
            {
                "appName": "myservice",
                "packageName": "com.mycompany.myservice",
                "packageFolder": "com/mycompany/myservice",
                "databaseType": "postgresql",
                "dbMigrationTool": "flywaydb",
                "buildTool": "gradle",
                "features": ["elk", "monitoring"]
            },
            [
                'myservice/build.gradle',
                'myservice/docker/docker-compose.yml',
                'myservice/docker/docker-compose-elk.yml',
                'myservice/docker/docker-compose-monitoring.yml'
            ]
        );
    });
});
