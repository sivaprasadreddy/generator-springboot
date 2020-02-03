'use strict';

const BaseGenerator = require('../base-generator');
const prompts = require('./prompts');

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

    default() {
        this.composeWith(require.resolve('../'+this.configOptions.appType), {
            configOptions: this.configOptions
        });
    }

};
