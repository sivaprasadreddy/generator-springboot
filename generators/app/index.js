'use strict';

const BaseGenerator = require('../base-generator');
const serverPrompts = require('../server/prompts');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);
        this.configOptions = this.options.configOptions || {};
    }

    initializing() {
        this.logSuccess('Initializing SpringBoot Generator');
    }

    // Use the same prompting logic as the server generator
    async prompting() {
        await serverPrompts.prompting.call(this);
    }

    // Pass the collected answers to the server generator with skipPrompts flag
    configuring() {
        // Merge any existing config with our answers
        Object.assign(this.configOptions, this.config.getAll());
        
        // Compose with server but skip its prompts since we've already done them
        this.composeWith(require.resolve('../server'), {
            configOptions: this.configOptions,
            skipPrompts: true
        });
    }

    // These methods are intentionally empty as the server generator will handle them
    writing() {}
    
    install() {}
    
    end() {}
};
