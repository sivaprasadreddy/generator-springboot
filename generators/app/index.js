'use strict';

const BaseGenerator = require('../base-generator');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);
        this.configOptions = this.options.configOptions || {};
    }

    default() {
        this.composeWith(require.resolve('../server'), {
            configOptions: this.configOptions
        });
    }

};
