import BaseGenerator, { ConfigOptions } from '../common/base-generator';
import { Constants } from '../common/constants';
import * as prompts from './prompts';
import path from 'path';
import fs from 'fs';

export default class ServerGenerator extends BaseGenerator {
    configOptions: ConfigOptions;
    serverTemplatePath: string;

    constructor(args: string | string[], opts: object) {
        super(args, opts);
        this.configOptions = (opts as any).configOptions || {};
        
        // Find the correct templates directory regardless of how the generator is invoked
        // This ensures templates work whether called from app generator or directly
        this.serverTemplatePath = path.resolve(__dirname, '../../generators/server/templates');
        
        if (!fs.existsSync(this.serverTemplatePath)) {
            // Fallback for when running from compiled code in generators folder
            this.serverTemplatePath = path.resolve(__dirname, '../templates');
        }
    }

    // Override the templatePath method to use our custom templates directory
    templatePath(...paths: string[]): string {
        return path.join(this.serverTemplatePath, ...paths);
    }

    initializing(): void {
        this.logSuccess('Generating SpringBoot Application');
    }

    get prompting() {
        return prompts.prompting;
    }

    configuring(): void {
        this.destinationRoot(path.join(this.destinationRoot(), '/' + this.configOptions.appName));
        this.config.set(this.configOptions);
        Object.assign(this.configOptions, Constants);
        this.configOptions.formatCode = (this.options as any).formatCode !== false;
    }

    writing(): void {
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

    end(): void {
        if (this.configOptions.formatCode !== false) {
            this._formatCode(this.configOptions, this.configOptions.appName || null);
        }
        this._printGenerationSummary(this.configOptions);
    }

    _printGenerationSummary(configOptions: ConfigOptions): void {
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

    _generateBuildToolConfig(configOptions: ConfigOptions): void {
        if (configOptions.buildTool === 'maven') {
            this._generateMavenConfig(configOptions);
        } else {
            this._generateGradleConfig(configOptions);
        }
    }

    _generateDockerConfig(configOptions: ConfigOptions): void {
        this.fs.copyTpl(
            this.templatePath('app/Dockerfile'),
            this.destinationPath('Dockerfile'),
            configOptions
        );
    }

    _generateJenkinsFile(configOptions: ConfigOptions): void {
        this.fs.copyTpl(
            this.templatePath('app/Jenkinsfile'),
            this.destinationPath('Jenkinsfile'),
            configOptions
        );
    }

    _generateMiscFiles(configOptions: ConfigOptions): void {
        this.fs.copyTpl(this.templatePath('app/lombok.config'), this.destinationPath('lombok.config'), configOptions);
        this.fs.copyTpl(this.templatePath('app/sonar-project.properties'), this.destinationPath('sonar-project.properties'), configOptions);
        this.fs.copyTpl(this.templatePath('app/README.md'), this.destinationPath('README.md'), configOptions);
    }

    _generateGithubActionsFiles(configOptions: ConfigOptions): void {
        const ciFile = '.github/workflows/' + configOptions.buildTool + '.yml';

        this.fs.copyTpl(
            this.templatePath('app/' + ciFile),
            this.destinationPath(ciFile),
            configOptions
        );
    }

    _generateMavenConfig(configOptions: ConfigOptions): void {
        this._copyMavenWrapper(configOptions);
        this._generateMavenPOMXml(configOptions);
    }

    _generateGradleConfig(configOptions: ConfigOptions): void {
        this._copyGradleWrapper(configOptions);
        this._generateGradleBuildScript(configOptions);
    }

    _copyMavenWrapper(configOptions: ConfigOptions): void {
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

    _generateMavenPOMXml(configOptions: ConfigOptions): void {
        const mavenConfigDir = 'maven/';
        this.fs.copyTpl(
            this.templatePath(mavenConfigDir + 'pom.xml'),
            this.destinationPath('pom.xml'),
            configOptions
        );
    }

    _copyGradleWrapper(configOptions: ConfigOptions): void {
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

    _generateGradleBuildScript(configOptions: ConfigOptions): void {
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

    _generateAppCode(configOptions: ConfigOptions): void {
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
        if (configOptions.features?.includes("localstack")) {
            testJavaTemplates.push('SqsListenerIntegrationTest.java');
        }
        this.generateTestJavaCode(configOptions, testJavaTemplates);

        const testResTemplates = [
            'application-test.properties',
            'logback-test.xml'
        ];
        this.generateTestResCode(configOptions, testResTemplates);
    }

    _generateDbMigrationConfig(configOptions: ConfigOptions): void {
        if (configOptions.dbMigrationTool === 'flywaydb') {
            let vendor = configOptions.databaseType;
            const resTemplates = [
                { src: 'db/migration/flyway/V1__01_init.sql', dest: 'db/migration/' + vendor + '/V1__01_init.sql' },
            ];
            this.generateFiles(configOptions, resTemplates, 'app/', 'src/main/resources/');
            const flywayMigrantCounter = {
                [Constants.KEY_FLYWAY_MIGRATION_COUNTER]: 1
            };
            Object.assign(configOptions, flywayMigrantCounter);
            this.config.set(flywayMigrantCounter);
        }

        if (configOptions.dbMigrationTool === 'liquibase') {
            const dbFmt = configOptions.dbMigrationFormat || 'xml';
            const resTemplates = [
                { src: 'db/migration/liquibase/changelog/db.changelog-master.yaml', dest: 'db/changelog/db.changelog-master.yaml' },
                { src: `db/migration/liquibase/changelog/01-init.${dbFmt}`, dest: `db/changelog/migration/01-init.${dbFmt}` },
            ];
            this.generateFiles(configOptions, resTemplates, 'app/', 'src/main/resources/');
            const liquibaseMigrantCounter = {
                [Constants.KEY_LIQUIBASE_MIGRATION_COUNTER]: 1
            };
            Object.assign(configOptions, liquibaseMigrantCounter);
            this.config.set(liquibaseMigrantCounter);
        }
    }

    _generateLocalstackConfig(configOptions: ConfigOptions): void {
        if (configOptions.features?.includes('localstack')) {
            this.fs.copy(
                this.templatePath('app/.localstack'),
                this.destinationPath('./.localstack')
            );
        }
    }

    _generateDockerComposeFiles(configOptions: ConfigOptions): void {
        this._generateAppDockerComposeFile(configOptions);
        if (configOptions.features?.includes('monitoring')) {
            this._generateMonitoringConfig(configOptions);
        }
        if (configOptions.features?.includes('elk')) {
            this._generateELKConfig(configOptions);
        }
    }

    _generateAppDockerComposeFile(configOptions: ConfigOptions): void {
        const resTemplates = [
            'docker-compose.yml',
            'docker-compose-app.yml',
        ];
        this.generateFiles(configOptions, resTemplates, 'app/', 'docker/');
    }

    _generateELKConfig(configOptions: ConfigOptions): void {
        const resTemplates = [
            'docker/docker-compose-elk.yml',
            'config/elk/logstash.conf',
        ];
        this.generateFiles(configOptions, resTemplates, 'app/', './');
    }

    _generateMonitoringConfig(configOptions: ConfigOptions): void {
        const resTemplates = [
            'docker/docker-compose-monitoring.yml',
            'config/prometheus/prometheus.yml',
        ];
        this.generateFiles(configOptions, resTemplates, 'app/', './');

        this.fs.copy(
            this.templatePath('app/config/grafana'),
            this.destinationPath('config/grafana')
        );
    }
}