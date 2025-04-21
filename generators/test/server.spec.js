"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const assert = __importStar(require("yeoman-assert"));
const yeoman_test_1 = require("yeoman-test");
describe('SpringBoot Generator', () => {
    // Helper function to test server generator with different configurations
    const testServerGenerator = async (testName, options, expectedFiles, fileContentsToVerify = {}) => {
        it(testName, async () => {
            const helpers = (0, yeoman_test_1.createHelpers)({});
            await helpers
                .create(path.join(__dirname, '../generators/server'))
                .withPrompts(options)
                .run();
            // Check expected files exist
            expectedFiles.forEach(file => assert.file(file));
            // Verify file contents if specified
            Object.entries(fileContentsToVerify).forEach(([file, contentChecks]) => {
                contentChecks.forEach(({ contains, doesNotContain }) => {
                    if (contains) {
                        assert.fileContent(file, contains);
                    }
                    if (doesNotContain) {
                        assert.noFileContent(file, doesNotContain);
                    }
                });
            });
        });
    };
    // Maven based generation
    describe('Maven build tool tests', () => {
        testServerGenerator('creates minimal microservice with maven', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "buildTool": "maven",
            "features": []
        }, ['myservice/pom.xml'], {
            'myservice/pom.xml': [
                { contains: '<artifactId>myservice</artifactId>' },
                { contains: '<groupId>com.mycompany.myservice</groupId>' },
                { doesNotContain: '<artifactId>liquibase-core</artifactId>' }
            ]
        });
        testServerGenerator('creates basic microservice with maven and Flyway', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "databaseType": "postgresql",
            "dbMigrationTool": "flywaydb",
            "buildTool": "maven",
            "features": []
        }, ['myservice/pom.xml'], {
            'myservice/pom.xml': [
                { contains: '<artifactId>myservice</artifactId>' },
                { contains: '<artifactId>postgresql</artifactId>' },
                { contains: '<artifactId>flyway-core</artifactId>' },
                { doesNotContain: '<artifactId>liquibase-core</artifactId>' }
            ]
        });
        testServerGenerator('creates basic microservice with maven and Liquibase', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "databaseType": "postgresql",
            "dbMigrationTool": "liquibase",
            "buildTool": "maven",
            "features": []
        }, ['myservice/pom.xml'], {
            'myservice/pom.xml': [
                { contains: '<artifactId>myservice</artifactId>' },
                { contains: '<artifactId>postgresql</artifactId>' },
                { contains: '<artifactId>liquibase-core</artifactId>' },
                { doesNotContain: '<artifactId>flyway-core</artifactId>' }
            ]
        });
        testServerGenerator('creates complete microservice with maven, ELK and monitoring', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "databaseType": "postgresql",
            "dbMigrationTool": "flywaydb",
            "buildTool": "maven",
            "features": ["elk", "monitoring"]
        }, [
            'myservice/pom.xml',
            'myservice/docker/docker-compose.yml',
            'myservice/docker/docker-compose-elk.yml',
            'myservice/docker/docker-compose-monitoring.yml'
        ], {
            'myservice/pom.xml': [
                { contains: '<artifactId>micrometer-registry-prometheus</artifactId>' }
            ],
            'myservice/docker/docker-compose-elk.yml': [
                { contains: 'elasticsearch' },
                { contains: 'logstash' },
                { contains: 'kibana' }
            ],
            'myservice/docker/docker-compose-monitoring.yml': [
                { contains: 'prometheus' },
                { contains: 'grafana' }
            ]
        });
    });
    // Gradle based generation
    describe('Gradle build tool tests', () => {
        testServerGenerator('creates minimal microservice with Gradle', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "buildTool": "gradle",
            "features": []
        }, ['myservice/build.gradle'], {
            'myservice/build.gradle': [
                { contains: 'group = "com.mycompany.myservice"' }
            ]
        });
        testServerGenerator('creates basic microservice with Gradle and Flyway', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "databaseType": "postgresql",
            "dbMigrationTool": "flywaydb",
            "buildTool": "gradle",
            "features": []
        }, ['myservice/build.gradle'], {
            'myservice/build.gradle': [
                { contains: "org.flywaydb:flyway-core" },
                { contains: "org.postgresql:postgresql" },
                { doesNotContain: "org.liquibase:liquibase-core" }
            ]
        });
        testServerGenerator('creates basic microservice with Gradle and Liquibase', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "databaseType": "postgresql",
            "dbMigrationTool": "liquibase",
            "buildTool": "gradle",
            "features": []
        }, ['myservice/build.gradle'], {
            'myservice/build.gradle': [
                { contains: "org.liquibase:liquibase-core" },
                { contains: "org.postgresql:postgresql" },
                { doesNotContain: "org.flywaydb:flyway-core" }
            ]
        });
        testServerGenerator('creates complete microservice with Gradle, ELK and monitoring', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "databaseType": "postgresql",
            "dbMigrationTool": "flywaydb",
            "buildTool": "gradle",
            "features": ["elk", "monitoring"]
        }, [
            'myservice/build.gradle',
            'myservice/docker/docker-compose.yml',
            'myservice/docker/docker-compose-elk.yml',
            'myservice/docker/docker-compose-monitoring.yml'
        ], {
            'myservice/build.gradle': [
                { contains: 'micrometer-registry-prometheus' }
            ]
        });
    });
    // Additional test scenarios
    describe('Advanced server configuration tests', () => {
        testServerGenerator('creates microservice with MySQL database', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "databaseType": "mysql",
            "dbMigrationTool": "flywaydb",
            "buildTool": "maven",
            "features": []
        }, ['myservice/pom.xml'], {
            'myservice/pom.xml': [
                { contains: '<artifactId>mysql-connector-j</artifactId>' },
                { doesNotContain: '<artifactId>postgresql</artifactId>' }
            ]
        });
        testServerGenerator('creates microservice with MariaDB database', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "databaseType": "mariadb",
            "dbMigrationTool": "flywaydb",
            "buildTool": "maven",
            "features": []
        }, ['myservice/pom.xml'], {
            'myservice/pom.xml': [
                { contains: '<artifactId>mariadb-java-client</artifactId>' },
                { doesNotContain: '<artifactId>postgresql</artifactId>' },
                { doesNotContain: '<artifactId>mysql-connector-j</artifactId>' }
            ]
        });
        testServerGenerator('creates microservice with localstack feature', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "databaseType": "postgresql",
            "dbMigrationTool": "flywaydb",
            "buildTool": "maven",
            "features": ["localstack"]
        }, [
            'myservice/pom.xml',
            'myservice/src/test/java/com/mycompany/myservice/SqsListenerIntegrationTest.java'
        ], {
            'myservice/pom.xml': [
                { contains: '<artifactId>localstack</artifactId>' },
                { contains: 'spring-cloud-aws-dependencies' }
            ],
            'myservice/src/test/java/com/mycompany/myservice/SqsListenerIntegrationTest.java': [
                { contains: 'SqsListenerIntegrationTest' }
            ]
        });
        testServerGenerator('creates Java sources with correct package structure', {
            "appName": "customapp",
            "packageName": "org.example.customapp",
            "packageFolder": "org/example/customapp",
            "buildTool": "maven",
            "features": []
        }, [
            'customapp/src/main/java/org/example/customapp/Application.java',
            'customapp/src/test/java/org/example/customapp/ApplicationIntegrationTest.java'
        ], {
            'customapp/src/main/java/org/example/customapp/Application.java': [
                { contains: 'package org.example.customapp;' },
                { contains: 'public class Application' }
            ],
            'customapp/src/test/java/org/example/customapp/ApplicationIntegrationTest.java': [
                { contains: 'package org.example.customapp;' },
                { contains: 'class ApplicationIntegrationTest' }
            ]
        });
        testServerGenerator('creates microservice with correct application name in properties file', {
            "appName": "inventory-service",
            "packageName": "com.mycompany.inventory",
            "packageFolder": "com/mycompany/inventory",
            "databaseType": "postgresql",
            "dbMigrationTool": "flywaydb",
            "buildTool": "maven",
            "features": ["elk", "monitoring"]
        }, [
            'inventory-service/docker/docker-compose.yml',
            'inventory-service/src/main/resources/application.properties'
        ], {
            'inventory-service/docker/docker-compose.yml': [
                { contains: 'postgresqldb' }
            ],
            'inventory-service/src/main/resources/application.properties': [
                { contains: 'spring.application.name=inventory-service' }
            ]
        });
        // Test for test resources generation
        testServerGenerator('creates test resources and configuration', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "databaseType": "postgresql",
            "dbMigrationTool": "flywaydb",
            "buildTool": "maven",
            "features": []
        }, [
            'myservice/src/test/resources/application-test.properties',
            'myservice/src/test/resources/logback-test.xml',
            'myservice/src/test/java/com/mycompany/myservice/SchemaValidationTest.java'
        ], {
            'myservice/src/test/resources/logback-test.xml': [
                { contains: '<logger name="org.testcontainers"' }
            ],
            'myservice/src/test/java/com/mycompany/myservice/SchemaValidationTest.java': [
                { contains: '@DataJpaTest' }
            ]
        });
    });
    // Testing validation and edge cases
    describe('Validation and edge cases', () => {
        testServerGenerator('handles project names with hyphens correctly', {
            "appName": "user-service",
            "packageName": "com.mycompany.userservice",
            "packageFolder": "com/mycompany/userservice",
            "buildTool": "maven",
            "features": []
        }, [
            'user-service/pom.xml',
            'user-service/README.md'
        ], {
            'user-service/pom.xml': [
                { contains: '<artifactId>user-service</artifactId>' }
            ],
            'user-service/README.md': [
                { contains: '# user-service' }
            ]
        });
        testServerGenerator('handles package names with multiple levels', {
            "appName": "api-gateway",
            "packageName": "com.mycompany.cloud.gateway",
            "packageFolder": "com/mycompany/cloud/gateway",
            "buildTool": "gradle",
            "features": []
        }, ['api-gateway/src/main/java/com/mycompany/cloud/gateway/Application.java'], {
            'api-gateway/src/main/java/com/mycompany/cloud/gateway/Application.java': [
                { contains: 'package com.mycompany.cloud.gateway;' }
            ]
        });
        // Test Docker file generation
        testServerGenerator('creates Docker configuration files', {
            "appName": "myservice",
            "packageName": "com.mycompany.myservice",
            "packageFolder": "com/mycompany/myservice",
            "buildTool": "maven",
            "features": []
        }, [
            'myservice/Dockerfile',
            'myservice/docker/docker-compose.yml'
        ], {
            'myservice/Dockerfile': [
                { contains: 'FROM eclipse-temurin:' }
            ],
            'myservice/docker/docker-compose.yml': [
                { contains: 'services:' }
            ]
        });
    });
});
