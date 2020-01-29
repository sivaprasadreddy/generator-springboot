'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const log = console.log;

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }
    
    logSuccess(msg) {
        log(chalk.bold.green(msg));
    }

    logWarn(msg) {
        log(chalk.keyword('orange')(msg));
    }

    logError(msg) {
        log(chalk.bold.red(msg));
    }

    printGenerationSummary(configOptions) {
        this.logError("==========================================");
        this.logSuccess("Your application is generated successfully");
        this.logSuccess(`  cd ${configOptions.appName}`);
        if(configOptions.buildTool === 'maven') {
            this.logSuccess("  > ./mvnw spring-boot:run")
        } else {
            this.logSuccess("  > ./gradlew bootRun")
        }
        this.logError("==========================================");
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
            this.destinationPath('Dockerfile'),
            configOptions
        );
    }

    generateJenkinsfile(configOptions) {
        this.fs.copyTpl(
            this.templatePath('app/Jenkinsfile'),
            this.destinationPath('Jenkinsfile'),
            configOptions
        );
    }

    generateTravisCIfile(configOptions) {
        this.fs.copyTpl(
            this.templatePath('app/.travis.yml'),
            this.destinationPath('.travis.yml'),
            configOptions
        );
    }

    generateGithubCIfile(configOptions) {
        const ciFile = '.github/workflows/'+configOptions.buildTool+'.yml';
        this.fs.copyTpl(
            this.templatePath('app/'+ciFile),
            this.destinationPath(ciFile),
            configOptions
        );
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
                this.destinationPath(tmpl)
            );
        });

        this.fs.copyTpl(
            this.templatePath(commonMavenConfigDir + 'gitignore'),
            this.destinationPath('.gitignore')
        );

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

    copyGradleWrapper(configOptions) {
        const commonGradleConfigDir = '../../common/files/gradle/';

        ['gradlew','gradlew.bat'].forEach(tmpl => {
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

    generateMainJavaCode(configOptions, templates) {
        const mainJavaRootDir = 'src/main/java/';
        this._generateCode(configOptions, templates, 'app/', mainJavaRootDir, configOptions.packageFolder);
    }
    
    generateMainResCode(configOptions, templates) {
        const mainResRootDir = 'src/main/resources/';
        this._generateCode(configOptions, templates, 'app/', mainResRootDir,'');
    }

    generateTestJavaCode(configOptions, templates) {
        const testJavaRootDir = 'src/test/java/';
        this._generateCode(configOptions, templates, 'app/', testJavaRootDir, configOptions.packageFolder);
    }

    generateTestResCode(configOptions, templates) {
        const testResRootDir = 'src/test/resources/';
        this._generateCode(configOptions, templates, 'app/', testResRootDir,'');
    }

    generateFiles(configOptions, templates, srcRoot, baseFolder) {
        this._generateCode(configOptions, templates, srcRoot, baseFolder, '');
    }

    _generateCode(configOptions, templates, srcRoot, baseFolder, packageFolder) {
        templates.forEach(tmpl => {
            if (_.isString(tmpl)) {
                this.fs.copyTpl(
                    this.templatePath(srcRoot + baseFolder + tmpl),
                    this.destinationPath(baseFolder + packageFolder + '/' + tmpl),
                    configOptions
                );
            } else {
                this.fs.copyTpl(
                    this.templatePath(srcRoot + baseFolder + tmpl.src),
                    this.destinationPath(baseFolder + packageFolder + '/' + tmpl.dest),
                    configOptions
                );
            }
        });
    }
};
