'use strict';
const BaseGenerator = require('../base-generator');
const constants = require('../constants');
const prompts = require('./prompts');
const path = require('path');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);
        this.configOptions = this.options.configOptions || {};
    }

    initializing() {
        this.logSuccess('Generating MicroService')
    }

    get prompting() {
        return prompts.prompting;
    }

    configuring() {
        this.destinationRoot(path.join(this.destinationRoot(), '/'+this.configOptions.appName));
        Object.assign(this.configOptions, constants);
        this.config.set(this.configOptions);
    }

    writing() {
        this.generateBuildToolConfig(this.configOptions);
        this.generateDockerConfig(this.configOptions);
        this.generateJenkinsfile(this.configOptions);
        this.generateTravisCIfile(this.configOptions);
        this.generateGithubCIfile(this.configOptions);
        this._generateDbMigrationConfig(this.configOptions);
        this._generateDockerComposeFiles(this.configOptions);
        this._generateAppCode(this.configOptions);
    }

    end() {
        this.printGenerationSummary(this.configOptions);
    }

    _generateAppCode(configOptions) {

        const mainJavaTemplates = [
            'Application.java',
            'config/WebMvcConfig.java',
            'config/SwaggerConfig.java',
            'utils/Constants.java'
        ];
        this.generateMainJavaCode(configOptions, mainJavaTemplates);

        const mainResTemplates = [
            'application.properties',
            'application-docker.properties',
            'application-prod.properties',
            'application-heroku.properties'
        ];
        this.generateMainResCode(configOptions, mainResTemplates);

        const testJavaTemplates = [
            'common/ExceptionHandling.java',
            'common/AbstractIntegrationTest.java',
            'ApplicationTests.java'
        ];
        this.generateTestJavaCode(configOptions, testJavaTemplates);

        const testResTemplates = [
            'bootstrap.properties',
            'bootstrap-integration-test.properties'
        ];
        this.generateTestResCode(configOptions, testResTemplates);
    }

    _generateDbMigrationConfig(configOptions) {
        if(configOptions.dbMigrationTool === 'flywaydb') {
            let vendor = configOptions.databaseType;
            if(vendor === "mariadb") {
                vendor = "mysql";
            }
            const resTemplates = [
                {src: 'db/migration/flyway/V1__01_init.sql', dest: 'db/migration/h2/V1__01_init.sql'},
                {src: 'db/migration/flyway/V1__01_init.sql', dest: 'db/migration/'+ vendor +'/V1__01_init.sql'},

            ];
            this.generateFiles(configOptions, resTemplates, 'app/','src/main/resources/');
            const flywayMigrantCounter = {
                [constants.KEY_FLYWAY_MIGRATION_COUNTER]: 1
            };
            Object.assign(configOptions, flywayMigrantCounter);
            this.config.set(configOptions);
        }

        if(configOptions.dbMigrationTool === 'liquibase') {
            const resTemplates = [
                {src: 'db/migration/liquibase/liquibase-changelog.xml', dest: 'db/migration/liquibase-changelog.xml'},
                {src: 'db/migration/liquibase/changelog/01-init.xml', dest: 'db/migration/changelog/01-init.xml'},

            ];
            this.generateFiles(configOptions, resTemplates, 'app/','src/main/resources/');
            const liquibaseMigrantCounter = {
                [constants.KEY_LIQUIBASE_MIGRATION_COUNTER]: 1
            };
            Object.assign(configOptions, liquibaseMigrantCounter);
            this.config.set(configOptions);
        }
    }

    _generateDockerComposeFiles(configOptions) {
        this._generateAppDockerComposeFile(configOptions);
        this._generateELKConfig(configOptions);
        this._generateMonitoringConfig(configOptions);
        if(configOptions.distTracing === true) {
            this._generateDistTracingDockerComposeFile(configOptions);
        }
    }

    _generateAppDockerComposeFile(configOptions) {
        const resTemplates = [
            'docker-compose.yml',
        ];
        this.generateFiles(configOptions, resTemplates, 'app/','docker/');
    }

    _generateDistTracingDockerComposeFile(configOptions) {
        const resTemplates = [
            'docker-compose-tracing.yml',
        ];
        this.generateFiles(configOptions, resTemplates, 'app/','docker/');
    }

    _generateELKConfig(configOptions) {
        const resTemplates = [
            'docker/docker-compose-elk.yml',
            'config/elk/logstash.conf',
        ];
        this.generateFiles(configOptions, resTemplates, 'app/','./');
    }

    _generateMonitoringConfig(configOptions) {
        const resTemplates = [
            'docker/docker-compose-monitoring.yml',
            'config/prometheus/prometheus.yml',
        ];
        this.generateFiles(configOptions, resTemplates, 'app/','./');

        this.fs.copy(
            this.templatePath('app/config/grafana'),
            this.destinationPath('config/grafana')
        );
    }

};
