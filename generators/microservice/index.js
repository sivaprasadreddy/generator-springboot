'use strict';
const BaseGenerator = require('../base-generator');
const prompts = require('./prompts');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);
        this.configOptions = this.options.configOptions || {};
    }

    initializing() {
        console.log('Generating MicroService')
    }

    get prompting() {
        return prompts.prompting;
    }

    writing() {
        this.configOptions.packageFolder = this.configOptions.packageName.replace(/\./g, '/');
        // console.log(this.configOptions);
        this.generateBuildToolConfig(this.configOptions);
        this.generateDockerConfig(this.configOptions);
        this.generateJenkinsfile(this.configOptions);
        this.generateTravisCIfile(this.configOptions);
        this.generateDbMigrationConfig(this.configOptions);
        this._generateAppCode();
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
            'ApplicationTests.java',
            'AbstractIntegrationTest.java'
        ];
        this.generateTestJavaCode(this.configOptions, testJavaTemplates);

    }

};
