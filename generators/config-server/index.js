'use strict';
const BaseGenerator = require('../base-generator');
const prompts = require('./prompts');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);

        this.configOptions = this.options.configOptions || {};
    }

    initializing() {
        console.log('Generating Config Server');
    }

    get prompting() {
        return prompts.prompting;
    }

    writing() {
        this.configOptions.packageFolder = this.configOptions.packageName.replace(/\./g, '/');
        this.generateBuildToolConfig(this.configOptions);
        this.generateDockerConfig(this.configOptions);
        this.generateJenkinsfile(this.configOptions);
        this.generateTravisCIfile(this.configOptions);
        this._generateAppCode();
    }

    _generateAppCode() {
        const mainJavaTemplates = ['ConfigServerApplication.java'];
        this.generateMainJavaCode(this.configOptions, mainJavaTemplates);

        const mainResTemplates = ['application.properties'];
        this.generateMainResCode(this.configOptions, mainResTemplates);

        const testJavaTemplates = ['ConfigServerApplicationTests.java'];
        this.generateTestJavaCode(this.configOptions, testJavaTemplates);
    }

};
