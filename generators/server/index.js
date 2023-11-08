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
        this.logSuccess('Generating SpringBoot Application')
    }

    get prompting() {
        return prompts.prompting;
    }

    configuring() {
        this.destinationRoot(path.join(this.destinationRoot(), '/'+this.configOptions.appName));
        this.config.set(this.configOptions);
        Object.assign(this.configOptions, constants);
        this.configOptions.formatCode = this.options.formatCode !== false
    }

    writing() {
        this._generateBuildToolConfig(this.configOptions);
        this._generateDockerConfig(this.configOptions);
        this._generateJenkinsFile(this.configOptions);
        this._generateMiscFiles(this.configOptions);
        this._generateGithubActionsFiles(this.configOptions);
        this._generateDbMigrationConfig(this.configOptions);
        this._generateDockerComposeFiles(this.configOptions);
        this._generateLocalstackConfig(this.configOptions);
        this._generateAppCode(this.configOptions);
    }

    end() {
        if(this.configOptions.formatCode !== false) {
            this._formatCode(this.configOptions, this.configOptions.appName);
        }
        this._printGenerationSummary(this.configOptions);
    }

    _printGenerationSummary(configOptions) {
        this.logError("==========================================");
        this.logSuccess("Your application is generated successfully");
        this.logSuccess(`  cd ${configOptions.appName}`);
        if (configOptions.buildTool === 'maven') {
            this.logSuccess("  > ./mvnw spring-boot:run");
        } else {
            this.logSuccess("  > ./gradlew bootRun");
        }
        this.logError("==========================================");
    }

    _generateBuildToolConfig(configOptions) {
        if (configOptions.buildTool === 'maven') {
            this._generateMavenConfig(configOptions);
        } else {
            this._generateGradleConfig(configOptions);
        }
    }

    _generateDockerConfig(configOptions) {
        this.fs.copyTpl(
            this.templatePath('app/Dockerfile'),
            this.destinationPath('Dockerfile'),
            configOptions
        );
    }

    _generateJenkinsFile(configOptions) {
        this.fs.copyTpl(
            this.templatePath('app/Jenkinsfile'),
            this.destinationPath('Jenkinsfile'),
            configOptions
        );
    }

    _generateMiscFiles(configOptions) {
        this.fs.copyTpl(this.templatePath('app/lombok.config'), this.destinationPath('lombok.config'), configOptions);
        this.fs.copyTpl(this.templatePath('app/sonar-project.properties'), this.destinationPath('sonar-project.properties'), configOptions);
        this.fs.copyTpl(this.templatePath('app/README.md'), this.destinationPath('README.md'), configOptions);
    }

    _generateGithubActionsFiles(configOptions) {
        const ciFile = '.github/workflows/' + configOptions.buildTool + '.yml';

        this.fs.copyTpl(
            this.templatePath('app/' + ciFile),
            this.destinationPath(ciFile),
            configOptions
        );
    }

    _generateMavenConfig(configOptions) {
        this._copyMavenWrapper(configOptions);
        this._generateMavenPOMXml(configOptions);
    }

    _generateGradleConfig(configOptions) {
        this._copyGradleWrapper(configOptions);
        this._generateGradleBuildScript(configOptions);
    }

    _copyMavenWrapper(configOptions) {
        const commonMavenConfigDir = '../../common/files/maven/';

        ['mvnw', 'mvnw.cmd'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(commonMavenConfigDir + tmpl),
                this.destinationPath(tmpl)
            );
        });

        this.fs.copyTpl(
            this.templatePath(commonMavenConfigDir + 'gitignore'),
            this.destinationPath('.gitignore')
        );

        this.fs.copy(
            this.templatePath(commonMavenConfigDir + '.mvn'),
            this.destinationPath('.mvn')
        );

    }

    _generateMavenPOMXml(configOptions) {
        const mavenConfigDir = 'maven/';
        this.fs.copyTpl(
            this.templatePath(mavenConfigDir + 'pom.xml'),
            this.destinationPath('pom.xml'),
            configOptions
        );
    }

    _copyGradleWrapper(configOptions) {
        const commonGradleConfigDir = '../../common/files/gradle/';

        ['gradlew', 'gradlew.bat'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(commonGradleConfigDir + tmpl),
                this.destinationPath(tmpl)
            );
        });

        this.fs.copyTpl(
            this.templatePath(commonGradleConfigDir + 'gitignore'),
            this.destinationPath('.gitignore')
        );

        this.fs.copy(
            this.templatePath(commonGradleConfigDir + 'gradle'),
            this.destinationPath('gradle')
        );
    }

    _generateGradleBuildScript(configOptions) {
        const gradleConfigDir = 'gradle/';

        ['build.gradle', 'settings.gradle', 'gradle.properties'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(gradleConfigDir + tmpl),
                this.destinationPath(tmpl),
                configOptions
            );
        });
        ['code-quality.gradle', 'owasp.gradle'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(gradleConfigDir + tmpl),
                this.destinationPath('gradle/' + tmpl),
                configOptions
            );
        });
    }

    _generateAppCode(configOptions) {

        const mainJavaTemplates = [
            'Application.java',
            'config/WebMvcConfig.java',
            'config/SwaggerConfig.java',
            'config/ApplicationProperties.java',
            'config/Initializer.java',
            'config/GlobalExceptionHandler.java',
            'config/logging/Loggable.java',
            'config/logging/LoggingAspect.java',
            'exception/ResourceNotFoundException.java',
            'model/response/PagedResult.java',
            'utils/AppConstants.java'
        ];
        this.generateMainJavaCode(configOptions, mainJavaTemplates);

        const mainResTemplates = [
            'application.properties',
            'application-local.properties',
            'logback-spring.xml'
        ];
        this.generateMainResCode(configOptions, mainResTemplates);

        const testJavaTemplates = [
            'ApplicationIntegrationTest.java',
            'SchemaValidationTest.java',
            'common/ContainersConfig.java',
            'common/AbstractIntegrationTest.java',
            'TestApplication.java'
        ];
        if(configOptions.features.includes("localstack")) {
            testJavaTemplates.push('SqsListenerIntegrationTest.java');
        }
        this.generateTestJavaCode(configOptions, testJavaTemplates);

        const testResTemplates = [
            'application-test.properties',
            'logback-test.xml'
        ];
        this.generateTestResCode(configOptions, testResTemplates);
    }

    _generateDbMigrationConfig(configOptions) {
        if(configOptions.dbMigrationTool === 'flywaydb') {
            let vendor = configOptions.databaseType;
            const resTemplates = [
                {src: 'db/migration/flyway/V1__01_init.sql', dest: 'db/migration/'+ vendor +'/V1__01_init.sql'},

            ];
            this.generateFiles(configOptions, resTemplates, 'app/','src/main/resources/');
            const flywayMigrantCounter = {
                [constants.KEY_FLYWAY_MIGRATION_COUNTER]: 1
            };
            Object.assign(configOptions, flywayMigrantCounter);
            this.config.set(flywayMigrantCounter);
        }

        if(configOptions.dbMigrationTool === 'liquibase') {
            const dbFmt = configOptions.dbMigrationFormat || 'xml';
            const resTemplates = [
                {src: 'db/migration/liquibase/changelog/db.changelog-master.yaml', dest: 'db/changelog/db.changelog-master.yaml'},
                {src: `db/migration/liquibase/changelog/01-init.${dbFmt}`, dest: `db/changelog/migration/01-init.${dbFmt}`},

            ];
            this.generateFiles(configOptions, resTemplates, 'app/','src/main/resources/');
            const liquibaseMigrantCounter = {
                [constants.KEY_LIQUIBASE_MIGRATION_COUNTER]: 1
            };
            Object.assign(configOptions, liquibaseMigrantCounter);
            this.config.set(liquibaseMigrantCounter);
        }
    }

    _generateLocalstackConfig(configOptions) {
        if(configOptions.features.includes('localstack')) {
            this.fs.copy(
                this.templatePath('app/.localstack'),
                this.destinationPath('./.localstack')
            );
        }
    }

    _generateDockerComposeFiles(configOptions) {
        this._generateAppDockerComposeFile(configOptions);
        if(configOptions.features.includes('monitoring')) {
            this._generateMonitoringConfig(configOptions);
        }
        if(configOptions.features.includes('elk')) {
            this._generateELKConfig(configOptions);
        }
    }

    _generateAppDockerComposeFile(configOptions) {
        const resTemplates = [
            'docker-compose.yml',
            'docker-compose-app.yml',
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
