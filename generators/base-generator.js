'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    generateBuildToolConfig(configOptions) {
        if(configOptions.buildTool === 'maven') {
            this._generateMavenConfig(configOptions);
        } else {
            this._generateGradleConfig(configOptions);
        }
    }

    generateDockerConfig(configOptions) {
        this.fs.copyTpl(
            this.templatePath('app/Dockerfile'),
            this.destinationPath(configOptions.appName+'/'+'Dockerfile'),
            configOptions
        );
    }

    generateJenkinsfile(configOptions) {
        this.fs.copyTpl(
            this.templatePath('app/Jenkinsfile'),
            this.destinationPath(configOptions.appName+'/'+'Jenkinsfile'),
            configOptions
        );
    }

    generateTravisCIfile(configOptions) {
        this.fs.copyTpl(
            this.templatePath('app/.travis.yml'),
            this.destinationPath(configOptions.appName+'/'+'.travis.yml'),
            configOptions
        );
    }

    generateDbMigrationConfig(configOptions) {
        if(configOptions.dbMigrationTool === 'flywaydb') {
            this.fs.copyTpl(
                this.templatePath('app/src/main/resources/db/migration/flyway/V1__01_init.sql'),
                this.destinationPath(configOptions.appName+'/src/main/resources/db/migration/h2/V1__01_init.sql'),
                configOptions
            );
            this.fs.copyTpl(
                this.templatePath('app/src/main/resources/db/migration/flyway/V1__01_init.sql'),
                this.destinationPath(configOptions.appName+'/src/main/resources/db/migration/'+configOptions.databaseType+'/V1__01_init.sql'),
                configOptions
            );
        }

        if(configOptions.dbMigrationTool === 'liquibase') {
            this.fs.copyTpl(
                this.templatePath('app/src/main/resources/db/migration/liquibase/liquibase-changelog.xml'),
                this.destinationPath(configOptions.appName+'/src/main/resources/db/migration/liquibase-changelog.xml'),
                configOptions
            );
            this.fs.copyTpl(
                this.templatePath('app/src/main/resources/db/migration/liquibase/changelog/01-init.xml'),
                this.destinationPath(configOptions.appName+'/src/main/resources/db/migration/changelog/01-init.xml'),
                configOptions
            );
        }
    }

    _generateMavenConfig(configOptions) {
        this.copyMavenWrapper(configOptions);
        this.generateMavenPOMXml(configOptions);
    }

    _generateGradleConfig(configOptions) {
        this.copyGradleWrapper(configOptions);
        this.generateGradleBuildScript(configOptions);
    }

    copyMavenWrapper(configOptions) {
        const commonMavenConfigDir = '../../common/files/maven/';

        ['mvnw','mvnw.cmd'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(commonMavenConfigDir + tmpl),
                this.destinationPath(configOptions.appName+'/'+tmpl)
            );
        });

        this.fs.copyTpl(
            this.templatePath(commonMavenConfigDir + 'gitignore'),
            this.destinationPath(configOptions.appName+'/.gitignore')
        );

        this.fs.copy(
            this.templatePath(commonMavenConfigDir+'.mvn'),
            this.destinationPath(configOptions.appName+'/'+'.mvn')
        );

    }

    generateMavenPOMXml(configOptions) {
        const mavenConfigDir = 'maven/';
        this.fs.copyTpl(
            this.templatePath(mavenConfigDir + 'pom.xml'),
            this.destinationPath(configOptions.appName+'/'+'pom.xml'),
            configOptions
        );
    }

    copyGradleWrapper(configOptions) {
        const commonGradleConfigDir = '../../common/files/gradle/';

        ['gradlew','gradlew.bat'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(commonGradleConfigDir + tmpl),
                this.destinationPath(configOptions.appName+'/'+tmpl)
            );
        });

        this.fs.copyTpl(
            this.templatePath(commonGradleConfigDir + 'gitignore'),
            this.destinationPath(configOptions.appName+'/.gitignore')
        );

        this.fs.copy(
            this.templatePath(commonGradleConfigDir+'gradle'),
            this.destinationPath(configOptions.appName+'/'+'gradle')
        );
    }

    generateGradleBuildScript(configOptions) {
        const gradleConfigDir = 'gradle/';

        ['build.gradle','settings.gradle'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(gradleConfigDir + tmpl),
                this.destinationPath(configOptions.appName+'/'+tmpl),
                configOptions
            );
        });
    }

    generateMainJavaCode(configOptions, templates) {
        const mainJavaRootDir = 'src/main/java/';
        templates.forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath('app/' + mainJavaRootDir + tmpl),
                this.destinationPath(configOptions.appName+'/'+mainJavaRootDir + configOptions.packageFolder + '/'+tmpl),
                configOptions
            );
        });
    }

    generateMainResCode(configOptions, templates) {
        const mainResRootDir = 'src/main/resources/';
        templates.forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath('app/'+mainResRootDir + tmpl),
                this.destinationPath(configOptions.appName+'/'+mainResRootDir + tmpl),
                configOptions
            );
        });
    }

    generateTestJavaCode(configOptions, templates) {
        const testJavaRootDir = 'src/test/java/';
        templates.forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath('app/' + testJavaRootDir + tmpl),
                this.destinationPath(configOptions.appName+'/'+testJavaRootDir + configOptions.packageFolder + '/'+tmpl),
                configOptions
            );
        });
    }
};
