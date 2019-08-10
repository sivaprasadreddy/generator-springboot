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

    generateDockerConfig(configOptions) {
        this.fs.copyTpl(
            this.templatePath('app/Dockerfile'),
            this.destinationPath(configOptions.appName+'/'+'Dockerfile'),
            configOptions
        );
    }

    _generateMavenConfig(configOptions) {
        this.copyMavenWrapper(configOptions);
        this.generateMavenPOMXml(configOptions);
    }

    _generateGradleConfig(configOptions) {
        this.copyGradleWapper(configOptions);
        this.generateGradleBuildScript(configOptions);
    }

    copyMavenWrapper(configOptions) {
        const commonMavenConfigDir = '../../common/files/maven/';

        ['.gitignore','mvnw','mvnw.cmd'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(commonMavenConfigDir + tmpl),
                this.destinationPath(configOptions.appName+'/'+tmpl)
            );
        });

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

    copyGradleWapper(configOptions) {
        const commonGradleConfigDir = '../../common/files/gradle/';

        ['.gitignore','gradlew','gradlew.bat'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(commonGradleConfigDir + tmpl),
                this.destinationPath(configOptions.appName+'/'+tmpl)
            );
        });

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
