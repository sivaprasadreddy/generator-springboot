'use strict';
const BaseGenerator = require('../base-generator');
const constants = require('../constants');
const prompts = require('./prompts');
const path = require('path');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);

        this.configOptions = this.options.configOptions || {};
    }

    initializing() {
        this.logSuccess('Generating Config Server');
    }

    get prompting() {
        return prompts.prompting;
    }

    configuring() {
        this.destinationRoot(path.join(this.destinationRoot(), '/'+this.configOptions.appName));
        Object.assign(this.configOptions, constants);
        this.config.set(this.configOptions);
    }

    writing() {
        this.generateBuildToolConfig(this.configOptions);
        this.generateDockerConfig(this.configOptions);
        this.generateJenkinsfile(this.configOptions);
        this.generateTravisCIfile(this.configOptions);
        this._generateAppCode(this.configOptions);
    }

    end() {
        this.printGenerationSummary(this.configOptions);
    }

    _generateAppCode(configOptions) {
        const mainJavaTemplates = ['ConfigServerApplication.java'];
        this.generateMainJavaCode(configOptions, mainJavaTemplates);

        const mainResTemplates = ['application.properties'];
        this.generateMainResCode(configOptions, mainResTemplates);

        const testJavaTemplates = ['ConfigServerApplicationTests.java'];
        this.generateTestJavaCode(configOptions, testJavaTemplates);
    }

};
