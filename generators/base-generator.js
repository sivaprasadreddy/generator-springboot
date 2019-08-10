'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

const DEFAULT_BUILD_TOOL = 'maven';

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

    _generateMavenConfig(configOptions) {
        this.copyMavenWrapper();
        this.generateMavenPOMXml(configOptions);
    }

    _generateGradleConfig(configOptions) {
        this.copyGradleWapper();
        this.generateGradleBuildScript(configOptions);
    }

    copyMavenWrapper() {
        const commonMavenConfigDir = '../../common/files/maven/';

        ['.gitignore','mvnw','mvnw.cmd'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(commonMavenConfigDir + tmpl),
                this.destinationPath(tmpl)
            );
        });

        this.fs.copy(
            this.templatePath(commonMavenConfigDir+'.mvn'),
            this.destinationPath('.mvn')
        );

    }

    generateMavenPOMXml(configOptions) {
        const mavenConfigDir = 'maven/';
        this.fs.copyTpl(
            this.templatePath(mavenConfigDir + 'pom.xml'),
            this.destinationPath('pom.xml'),
            configOptions
        );
    }

    copyGradleWapper() {
        const commonGradleConfigDir = '../../common/files/gradle/';

        ['.gitignore','gradlew','gradlew.bat'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(commonGradleConfigDir + tmpl),
                this.destinationPath(tmpl)
            );
        });

        this.fs.copy(
            this.templatePath(commonGradleConfigDir+'gradle'),
            this.destinationPath('gradle')
        );
    }

    generateGradleBuildScript(configOptions) {
        const gradleConfigDir = 'gradle/';

        ['build.gradle','settings.gradle'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(gradleConfigDir + tmpl),
                this.destinationPath(tmpl),
                configOptions
            );
        });
    }
};
