'use strict';
// Require dependencies
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.configOptions = this.options.configOptions || {};
    }

    initializing() {
        console.log('Generating MicroService')
    }

    prompting() {

        const prompts = [
            {
                type: 'string',
                name: 'appName',
                message: 'What is the application name?',
                default: 'myservice'
            },
            {
                type: 'string',
                name: 'packageName',
                message: 'What is the default package name?',
                default: 'com.mycompany.myservice'
            },
            {
                type: 'list',
                name: 'buildTool',
                message: 'Which build tool do you want to use?',
                choices: [
                    {
                        value: 'maven',
                        name: 'Maven'
                    },
                    {
                        value: 'gradle',
                        name: 'Gradle'
                    }
                ],
                default: 'maven'
            }
        ];

        return this.prompt(prompts).then(answers => {
            this.configOptions.packageName = answers.packageName;
            this.configOptions.appName = answers.appName;
            this.configOptions.buildTool = answers.buildTool;
        });
    }

    writing() {
        this.configOptions.packageFolder = this.configOptions.packageName.replace(/\./g, '/');
        if(this.configOptions.buildTool === 'maven') {
            this._generateMavenConfig();
        } else {
            this._generateGradleConfig();
        }
        this._generateAppCode();
    }

    _generateMavenConfig() {
        const mavenConfigDir = 'maven/';

        ['.gitignore','mvnw','mvnw.cmd','pom.xml'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(mavenConfigDir + tmpl),
                this.destinationPath(tmpl),
                this.configOptions
            );
        });

        this.fs.copy(
            this.templatePath(mavenConfigDir+'.mvn'),
            this.destinationPath('.mvn')
        );

    }

    _generateGradleConfig() {
        const gradleConfigDir = 'gradle/';

        ['.gitignore','gradlew','gradlew.bat','build.gradle','settings.gradle'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(gradleConfigDir + tmpl),
                this.destinationPath(tmpl),
                this.configOptions
            );
        });

        this.fs.copy(
            this.templatePath(gradleConfigDir+'gradle'),
            this.destinationPath('gradle')
        );
    }

    _generateAppCode() {
        const mainJavaRootDir = 'src/main/java/';
        const testJavaRootDir = 'src/test/java/';
        const mainResRootDir = 'src/main/resources/';

        this.fs.copyTpl(
            this.templatePath('app/'+mainJavaRootDir + 'Application.java'),
            this.destinationPath(mainJavaRootDir + this.configOptions.packageFolder + '/Application.java'),
            this.configOptions
        );

        this.fs.copyTpl(
            this.templatePath('app/'+mainResRootDir + 'application.properties'),
            this.destinationPath(mainResRootDir + 'application.properties'),
            this.configOptions
        );

        this.fs.copyTpl(
            this.templatePath('app/'+testJavaRootDir + 'ApplicationTests.java'),
            this.destinationPath(testJavaRootDir+ this.configOptions.packageFolder + '/ApplicationTests.java'),
            this.configOptions
        );

        this.fs.copyTpl(
            this.templatePath('app/'+testJavaRootDir + 'AbstractIntegrationTest.java'),
            this.destinationPath(testJavaRootDir+ this.configOptions.packageFolder + '/AbstractIntegrationTest.java'),
            this.configOptions
        );
    }

};
