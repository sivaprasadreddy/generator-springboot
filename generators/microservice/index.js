'use strict';
const BaseGenerator = require('../base-generator');

module.exports = class extends BaseGenerator {

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
                type: 'boolean',
                name: 'useJpa',
                message: 'Do you want to use Spring Data Jpa?',
                default: true
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
            Object.assign(this.configOptions, answers);
        });
    }

    writing() {
        this.configOptions.packageFolder = this.configOptions.packageName.replace(/\./g, '/');
        this.generateBuildToolConfig(this.configOptions);
        this._generateAppCode();
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
