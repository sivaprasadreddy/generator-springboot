'use strict';
const BaseGenerator = require('../base-generator');
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
        this.config.set(this.configOptions);
    }

    writing() {
        this.generateBuildToolConfig(this.configOptions);
        this.generateDockerConfig(this.configOptions);
        this.generateJenkinsfile(this.configOptions);
        this.generateTravisCIfile(this.configOptions);
        this._generateDbMigrationConfig(this.configOptions);
        this._generateDockerComposeFiles(this.configOptions);
        this._generateELKConfig(this.configOptions);
        this._generateMonitoringConfig(this.configOptions);
        this._generateAppCode();
    }

    end() {
        this.printGenerationSummary(this.configOptions);
    }

    _generateAppCode() {

        const mainJavaTemplates = [
            'Application.java',
            'config/WebMvcConfig.java',
            'config/SwaggerConfig.java'
        ];
        this.generateMainJavaCode(this.configOptions, mainJavaTemplates);

        const mainResTemplates = [
            'application.properties',
            'application-docker.properties',
            'application-prod.properties',
            'application-heroku.properties'
        ];
        this.generateMainResCode(this.configOptions, mainResTemplates);

        const testJavaTemplates = [
            'common/ExceptionHandling.java',
            'common/AbstractIntegrationTest.java',
            'ApplicationTests.java'
        ];
        this.generateTestJavaCode(this.configOptions, testJavaTemplates);

    }

    _generateDbMigrationConfig(configOptions) {
        if(configOptions.dbMigrationTool === 'flywaydb') {
            const resTemplates = [
                {src: 'db/migration/flyway/V1__01_init.sql', dest: 'db/migration/h2/V1__01_init.sql'},
                {src: 'db/migration/flyway/V1__01_init.sql', dest: 'db/migration/'+configOptions.databaseType+'/V1__01_init.sql'},

            ];
            this.generateFiles(configOptions, resTemplates, 'app/','src/main/resources/');
        }

        if(configOptions.dbMigrationTool === 'liquibase') {
            const resTemplates = [
                {src: 'db/migration/liquibase/liquibase-changelog.xml', dest: 'db/migration/liquibase-changelog.xml'},
                {src: 'db/migration/liquibase/changelog/01-init.xml', dest: 'db/migration/changelog/01-init.xml'},

            ];
            this.generateFiles(configOptions, resTemplates, 'app/','src/main/resources/');
        }
    }

    _generateDockerComposeFiles(configOptions) {
        const resTemplates = [
            'docker-compose.yml',
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
