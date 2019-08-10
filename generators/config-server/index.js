'use strict';
const BaseGenerator = require('../base-generator');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);

        this.configOptions = this.options.configOptions || {};
    }

    initializing() {
        console.log('Generating Config Server');
    }

    prompting() {

        const prompts = [
            {
                type: 'string',
                name: 'appName',
                message: 'What is the application name?',
                default: 'config-server'
            },
            {
                type: 'string',
                name: 'packageName',
                message: 'What is the default package name?',
                default: 'com.mycompany.configserver'
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
        this._generateDockerConfig();
        this._generateAppCode();
    }

    _generateDockerConfig() {
        this.fs.copyTpl(
            this.templatePath('app/Dockerfile'),
            this.destinationPath('Dockerfile'),
            this.configOptions
        );
    }

    _generateAppCode() {
        const mainJavaRootDir = 'src/main/java/';
        const testJavaRootDir = 'src/test/java/';
        const mainResRootDir = 'src/main/resources/';

        this.fs.copyTpl(
            this.templatePath('app/'+mainJavaRootDir + 'ConfigServerApplication.java'),
            this.destinationPath(mainJavaRootDir + this.configOptions.packageFolder + '/ConfigServerApplication.java'),
            this.configOptions
        );

        this.fs.copyTpl(
            this.templatePath('app/'+mainResRootDir + 'application.properties'),
            this.destinationPath(mainResRootDir + 'application.properties'),
            this.configOptions
        );

        this.fs.copyTpl(
            this.templatePath('app/'+testJavaRootDir + 'ConfigServerApplicationTests.java'),
            this.destinationPath(testJavaRootDir+ this.configOptions.packageFolder + '/ConfigServerApplicationTests.java'),
            this.configOptions
        );
    }

};
